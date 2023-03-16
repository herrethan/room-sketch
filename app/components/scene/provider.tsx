import React from 'react';
import { useCallbackRef } from '~/hooks/use-callback-ref';

type SceneRef = React.MutableRefObject<HTMLDivElement | null>;

interface SceneRefProviderProps {
  children: React.ReactNode;
  sceneRef: SceneRef;
}

const SceneRefContext = React.createContext<SceneRef>(
  null as unknown as SceneRef
);

export const SceneRefProvider = ({
  children,
  sceneRef,
}: SceneRefProviderProps) => {
  return (
    <SceneRefContext.Provider value={sceneRef}>
      {children}
    </SceneRefContext.Provider>
  );
};

interface SceneEventProps {
  onMouseDown?: (e: MouseEvent) => void;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
}

// allows external consumers to attach mouse event listeners to Scene
// deps is optional if we need to force re-rendering of useCallbackRef and re-attach listeners
export const useSceneEvent = (
  events?: SceneEventProps,
  deps: React.DependencyList = []
) => {
  const ref = React.useContext(SceneRefContext);
  if (!ref) {
    throw new Error('useSceneEvent must be used within an SceneRefContext');
  }
  const element = ref.current;

  const { onMouseDown, onMouseMove, onMouseUp } = events || {};
  const onDown = useCallbackRef(onMouseDown, deps);
  const onMove = useCallbackRef(onMouseMove, deps);
  const onUp = useCallbackRef(onMouseUp, deps);

  React.useEffect(() => {
    if (element) {
      if (onDown) element.addEventListener('mousedown', onDown);
      if (onMove) element.addEventListener('mousemove', onMove);
      if (onUp) element.addEventListener('mouseup', onUp);

      return () => {
        onDown && element.removeEventListener('mousedown', onDown);
        onMove && element.removeEventListener('mousemove', onMove);
        onUp && element.removeEventListener('mouseup', onUp);
      };
    }
  }, [element, onDown, onMove, onUp]);

  return ref;
};
