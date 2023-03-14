import { Box, Flex } from '@chakra-ui/react';
import Editor from '~/components/editor';
import EditorPanel from '~/components/editor-panel';
import { EditorProvider } from '~/components/editor/provider';
import type { Wall } from '~/data/walls';

// prettier-ignore
const someWalls: Wall[] = [
  { position: [[-5, -3], [-5, 3]] },
  { position: [[-5, 3], [5, 3]] },
  { position: [[5, 3], [5, -3]] },
  { position: [[5, -3], [-5, -3]] },
];

export default function Canvas() {
  return (
    <EditorProvider defaultWalls={someWalls}>
      <Flex>
        <EditorPanel />
        <Box overflow="auto" width="100%" height="100vh">
          <Editor />
        </Box>
      </Flex>
    </EditorProvider>
  );
}
