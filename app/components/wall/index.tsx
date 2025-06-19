import React from 'react';
import { Box } from '@chakra-ui/react';
import { computeWall } from './styles';
import type { WallPosition } from '~/data/walls';
import { useEditorState } from '../editor/provider';

// .bk -> .bottom
// .ft -> .top
// .rt -> .left
// .lt -> .right
// .bm -> .front
// .tp -> .back

export interface WallProps {
  position: WallPosition;
}

const Wall = ({ position }: WallProps) => {
  const state = useEditorState();
  const styles = computeWall(position, state.rotateZ);

  return (
    <Box sx={styles}>
      <Box className="face top"></Box>
      <Box className="face bottom"></Box>
      <Box className="face left"></Box>
      <Box className="face right"></Box>
      <Box className="face front"></Box>
      <Box className="face back"></Box>
    </Box>
  );
};

export default Wall;
