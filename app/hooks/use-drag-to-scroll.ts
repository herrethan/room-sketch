import React from 'react';

interface DragState {
  isDragging: boolean;
}

export const useDragToScroll = (
  ref: React.RefObject<HTMLElement> | null
): DragState => {
  const [isDragging, setIsDragging] = React.useState(false);
  const element = ref?.current;

  React.useEffect(() => {
    if (element) {
      let coords = {
        top: element.scrollTop,
        left: element.scrollLeft,
        x: 0,
        y: 0,
      };
      const onMouseMove = (e: MouseEvent) => {
        // How far the mouse has been moved
        const dx = e.clientX - coords.x;
        const dy = e.clientY - coords.y;

        // Scroll the element
        element.scrollTop = coords.top - dy;
        element.scrollLeft = coords.left - dx;
      };
      const onMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      const onMouseDown = (e: MouseEvent) => {
        coords = { ...coords, x: e.clientX, y: e.clientY };
        setIsDragging(true);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousedown', onMouseDown);

      return () => {
        setIsDragging(false);
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [element]);

  return { isDragging };
};
