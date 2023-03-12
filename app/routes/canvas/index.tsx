import Editor from '~/components/editor';
import { EditorProvider } from '~/components/editor/provider';
import type { Wall } from '~/data/walls';

const someWalls: Wall[] = [
  {
    position: [
      [-5, -3],
      [-5, 3],
    ],
  },
  {
    position: [
      [-5, 3],
      [5, 3],
    ],
  },
  {
    position: [
      [5, 3],
      [5, -3],
    ],
  },
  {
    position: [
      [5, -3],
      [-5, -3],
    ],
  },
];

export default function Canvas() {
  return (
    <EditorProvider defaultWalls={someWalls}>
      <Editor />
    </EditorProvider>
  );
}
