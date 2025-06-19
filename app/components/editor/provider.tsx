import React from 'react';
import type { Wall, XY } from '~/data/walls';
import { PX_PER_EM } from '~/theme/styles';
import { SCENE_SIZE } from '../scene';
import { toNearestEM } from '../walls-editor/utils';
import { reducer } from './reducer';

// prettier-ignore
const DEFAULT_WALLS: Wall[] = [
  { position: [[-5, -5], [-5, 5]] },
  { position: [[-5, 5], [5, 5]] },
  { position: [[5, 5], [5, -5]] },
  { position: [[5, -5], [-5, -5]] },
];

export enum EditMode {
  wall,
  fixture,
  furniture,
}

export interface EditorState {
  walls: Wall[];
  editMode: EditMode | null;
  zoom?: number;
  rotateX?: number;
  rotateZ?: number;
}

export enum EditorAction {
  zoom,
  rotate,
  recreate,
  mode,
  select,
  delete,
  add,
}

interface ModifyView {
  type: EditorAction.zoom | EditorAction.rotate;
  payload: Pick<EditorState, 'zoom' | 'rotateX' | 'rotateZ'>;
}

interface RecreateWalls {
  type: EditorAction.recreate;
  payload: Wall[];
}

interface EnterMode {
  type: EditorAction.mode;
  payload: EditMode | null;
}

interface DeleteWall {
  type: EditorAction.delete;
  payload: Wall;
}

export type EditorActions = ModifyView | RecreateWalls | EnterMode | DeleteWall;

type EditorProviderContext = {
  state: EditorState;
  dispatch: React.Dispatch<EditorActions>;
};

interface EditorProviderProps {
  children: React.ReactNode;
  defaultWalls?: Wall[];
}

const EditorContext = React.createContext<EditorProviderContext>(
  null as unknown as EditorProviderContext
);

export const EditorProvider = ({
  children,
  defaultWalls = DEFAULT_WALLS,
}: EditorProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, {
    walls: defaultWalls,
    editMode: EditMode.wall,
    zoom: 1,
    rotateX: 0,
    rotateZ: 0,
  });

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorState = () => {
  const { state } = React.useContext(EditorContext);
  if (!state) {
    throw new Error('useEditorState must be used within an EditorContext');
  }
  return state;
};

export const useEditorDispatch = () => {
  const { dispatch } = React.useContext(EditorContext);
  if (!dispatch) {
    throw new Error('useEditorDispatch must be used within an EditorContext');
  }
  return dispatch;
};

export const useEditorComputeCoordinates = () => {
  const { zoom } = useEditorState();
  if (!zoom) {
    throw new Error(
      'useEditorComputeCoordinates must be used within an EditorContext'
    );
  }
  // derives scene coordinates (ems) from mouse event offsetX offsetY (pixels)
  const mouseCoordsToSceneCoords = React.useCallback(
    (x: number, y: number): XY => {
      const offset = SCENE_SIZE % 2 === 0 ? PX_PER_EM / 2 : 0;
      return [
        toNearestEM(x / zoom - (SCENE_SIZE * PX_PER_EM) / 2 + offset),
        toNearestEM(y / zoom - (SCENE_SIZE * PX_PER_EM) / 2 + offset) * -1,
      ];
    },
    [zoom]
  );

  return mouseCoordsToSceneCoords;
};
