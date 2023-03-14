import React from 'react';
import type { Wall } from '~/data/walls';
import { isAllowedAngle, toNearestEM } from './utils';

export interface WallMutateProps {
  position: Wall['position'];
  hasSquareEdges: boolean;
  onChange: (newPosition: Wall['position'], constrained?: boolean) => void;
}

enum DragType {
  vertex0,
  vertex1,
  line,
}

type MouseCoords = {
  pageX: number;
  pageY: number;
  type: DragType;
};

enum LineType {
  diagonal,
  vertical,
  horizontal,
}

const toLineType = (position: Wall['position']) => {
  if (position[0][0] === position[1][0]) return LineType.vertical;
  if (position[0][1] === position[1][1]) return LineType.horizontal;
  return LineType.diagonal;
};

const toLineCursor = (type: LineType, dragIsEnabled: boolean) => {
  if (!dragIsEnabled) return 'auto';
  switch (type) {
    case LineType.vertical:
      return 'col-resize';
    case LineType.horizontal:
      return 'row-resize';
    default:
      return 'auto';
  }
};

const WallMutate = ({
  position,
  hasSquareEdges,
  onChange,
}: WallMutateProps) => {
  const [dragOrigin, setDragOrigin] = React.useState<MouseCoords | null>(null);
  const hasDragged = React.useRef<boolean>(false);
  const lineType = toLineType(position);
  const cursor = toLineCursor(lineType, hasSquareEdges);

  const onDragStart = (
    { pageX, pageY }: React.MouseEvent<SVGLineElement | SVGCircleElement>,
    type: DragType
  ) => {
    // don't allow constrained line dragging if some corner is not square
    if (!hasSquareEdges && type === DragType.line) return;
    setDragOrigin(dragging => (dragging ? null : { pageX, pageY, type }));
  };

  const onDragEnd = (
    e: React.MouseEvent<SVGLineElement | SVGCircleElement>
  ) => {
    if (hasDragged.current === true) {
      console.log('end');
      setDragOrigin(null);
      hasDragged.current = false;
    }
  };

  const computeNewLine = (origin: MouseCoords, current: MouseEvent) => {
    const delta = {
      x: toNearestEM((origin.pageX - current.pageX) * -1),
      y: toNearestEM(origin.pageY - current.pageY),
    };

    if (delta.x === 0 && delta.y === 0) return;

    switch (origin.type) {
      // only allow vertical or horizontal dragging of a line
      case DragType.line:
        if (lineType === LineType.vertical) {
          onChange(
            [
              [position[0][0] + delta.x, position[0][1]],
              [position[1][0] + delta.x, position[1][1]],
            ],
            true
          );
        } else if (lineType === LineType.horizontal) {
          onChange(
            [
              [position[0][0], position[0][1] + delta.y],
              [position[1][0], position[1][1] + delta.y],
            ],
            true
          );
        }
        break;
      case DragType.vertex0:
        const new0: Wall['position'] = [
          [position[0][0] + delta.x, position[0][1] + delta.y],
          position[1],
        ];
        if (isAllowedAngle(new0)) onChange(new0);
        break;
      case DragType.vertex1:
        const new1: Wall['position'] = [
          position[0],
          [position[1][0] + delta.x, position[1][1] + delta.y],
        ];
        if (isAllowedAngle(new1)) onChange(new1);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    if (dragOrigin) {
      console.log('add listener');
      const whileDragging = (e: MouseEvent) => {
        hasDragged.current = true;
        computeNewLine(dragOrigin, e);
      };
      document.addEventListener('mousemove', whileDragging);
      return () => {
        console.log('remove listener');
        document.removeEventListener('mousemove', whileDragging);
      };
    }
  }, [dragOrigin]);

  return (
    <>
      <line
        onMouseDown={e => onDragStart(e, DragType.line)}
        onMouseUp={onDragEnd}
        className="selected hit-area"
        x1={`${position[0][0]}em`}
        y1={`${position[0][1] * -1}em`}
        x2={`${position[1][0]}em`}
        y2={`${position[1][1] * -1}em`}
        style={{ cursor }}
      />
      <line
        className="selected"
        x1={`${position[0][0]}em`}
        y1={`${position[0][1] * -1}em`}
        x2={`${position[1][0]}em`}
        y2={`${position[1][1] * -1}em`}
      />
      <circle
        onMouseDown={e => onDragStart(e, DragType.vertex0)}
        onMouseUp={onDragEnd}
        cx={`${position[0][0]}em`}
        cy={`${position[0][1] * -1}em`}
        r={2}
      />
      <circle
        onMouseDown={e => onDragStart(e, DragType.vertex1)}
        onMouseUp={onDragEnd}
        cx={`${position[1][0]}em`}
        cy={`${position[1][1] * -1}em`}
        r={2}
      />
    </>
  );
};

export default WallMutate;
