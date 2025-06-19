import type { EditorActions, EditorState } from './provider';
import { EditorAction } from './provider';

export const reducer = (state: EditorState, action: EditorActions) => {
  switch (action.type) {
    case EditorAction.zoom:
    case EditorAction.rotate:
      return { ...state, ...action.payload };
    case EditorAction.recreate:
      return { ...state, walls: action.payload };
    case EditorAction.mode:
      return { ...state, editMode: action.payload };
    case EditorAction.delete:
      return {
        ...state,
        walls: state.walls.filter(
          w => `${w.position}` !== `${action.payload.position}`
        ),
      };
    default:
      return state;
  }
};
