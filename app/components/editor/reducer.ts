import type { EditorActions, EditorState } from './provider';
import { EditorAction } from './provider';

export const reducer = (state: EditorState, action: EditorActions) => {
  switch (action.type) {
    case EditorAction.zoom:
    case EditorAction.rotate:
      return { ...state, ...action.payload };
    case EditorAction.recreate:
      return { ...state, walls: action.payload };
    default:
      return state;
  }
};
