import isEqual from 'lodash/isEqual';
import React from 'react';
import type { Wall } from '~/data/walls';
import { useEditorComputeCoordinates } from '../editor/provider';
import { useSceneEvent } from '../scene/provider';
import { isAllowedAngle } from './utils';

interface WallCreateProps {
  onCreated: (newPosition: Wall['position']) => void;
}

type Position = [number, number];

interface WallCreateState {
  mousePosition?: Position;
  isDrawing: boolean;
  startVertex: Position | null;
  endVertex: Position | null;
}

type OnMouseEvent = {
  type: keyof Pick<DocumentEventMap, 'mousedown' | 'mouseup' | 'mousemove'>;
  position: Position;
};

type WallCreateAction = OnMouseEvent;

const defaultState: WallCreateState = {
  isDrawing: false,
  startVertex: null,
  endVertex: null,
};

const reducer = (
  state: WallCreateState,
  action: WallCreateAction
): WallCreateState => {
  const { position, type } = action;
  switch (type) {
    case 'mousedown':
      if (!state.isDrawing) {
        return { ...state, startVertex: position };
      }
    case 'mousemove':
      if (
        state.startVertex &&
        !isEqual(state.startVertex, position) &&
        isAllowedAngle([state.startVertex, position])
        // TODO: create new toAllowedAngle function for better UX
      ) {
        return { ...state, mousePosition: position, isDrawing: true };
      }
      if (!state.startVertex) {
        return { ...state, mousePosition: position };
      }
      return state;
    case 'mouseup':
      if (state.startVertex && !isEqual(state.startVertex, position)) {
        if (
          !isAllowedAngle([state.startVertex, position]) &&
          state.mousePosition
        ) {
          return { ...state, endVertex: state.mousePosition, isDrawing: false };
        }
        return { ...state, endVertex: position, isDrawing: false };
      }
      return state;
    default:
      return state;
  }
};

const WallCreate = ({ onCreated }: WallCreateProps) => {
  const toScenePosition = useEditorComputeCoordinates();
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  useSceneEvent({
    onMouseDown: e =>
      dispatch({
        type: 'mousedown',
        position: toScenePosition(e.offsetX, e.offsetY),
      }),
    onMouseMove: e =>
      dispatch({
        type: 'mousemove',
        position: toScenePosition(e.offsetX, e.offsetY),
      }),
    onMouseUp: e =>
      dispatch({
        type: 'mouseup',
        position: toScenePosition(e.offsetX, e.offsetY),
      }),
  });

  React.useEffect(() => {
    if (state.endVertex && state.startVertex) {
      onCreated([state.startVertex, state.endVertex]);
    }
  }, [state.endVertex, state.startVertex, onCreated]);

  const lineFromTo = state.startVertex &&
    state.mousePosition && [
      state.startVertex,
      state.endVertex || state.mousePosition,
    ];

  return (
    <>
      {state.mousePosition && !state.startVertex && (
        <circle
          className="ghost"
          cx={`${state.mousePosition[0]}em`}
          cy={`${state.mousePosition[1] * -1}em`}
          r={'0.25em'}
        />
      )}
      {state.mousePosition && state.startVertex && (
        <g>
          <circle
            className="ghost-dragging"
            cx={`${state.mousePosition[0]}em`}
            cy={`${state.mousePosition[1] * -1}em`}
            r={'0.75em'}
          />
          <circle
            className="end-vertex"
            cx={`${state.mousePosition[0]}em`}
            cy={`${state.mousePosition[1] * -1}em`}
            r={2}
          />
        </g>
      )}
      {state.startVertex && (
        <circle
          className="start-vertex"
          cx={`${state.startVertex[0]}em`}
          cy={`${state.startVertex[1] * -1}em`}
          r={2}
        />
      )}
      {state.endVertex && (
        <circle
          className="end-vertex"
          cx={`${state.endVertex[0]}em`}
          cy={`${state.endVertex[1] * -1}em`}
          r={2}
        />
      )}
      {lineFromTo && (
        <line
          className="selected"
          x1={`${lineFromTo[0][0]}em`}
          y1={`${lineFromTo[0][1] * -1}em`}
          x2={`${lineFromTo[1][0]}em`}
          y2={`${lineFromTo[1][1] * -1}em`}
        />
      )}
    </>
  );
};

export default WallCreate;
