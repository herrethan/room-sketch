import React from 'react';

type ScenePanState = 'on' | 'off';

type ScenePanProviderContext = [
  state: ScenePanState,
  dispatch: React.Dispatch<ScenePanState>
];

const ScenePanContext = React.createContext<ScenePanProviderContext>(
  null as unknown as ScenePanProviderContext
);

export const ScenePanProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = React.useReducer(
    (state: ScenePanState, action: ScenePanState) => action,
    'off'
  );

  return (
    <ScenePanContext.Provider value={value}>
      {children}
    </ScenePanContext.Provider>
  );
};

export const useScenePan = () => {
  const value = React.useContext(ScenePanContext);
  if (!value) {
    throw new Error('useScenePan must be used within an ScenePanContext');
  }
  return value;
};
