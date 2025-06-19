import React from 'react';
import { Flex, Text, IconButton } from '@chakra-ui/react';
import {
  EditorAction,
  useEditorDispatch,
  useEditorState,
} from '../editor/provider';
import { MdRotateLeft, MdRotateRight } from 'react-icons/md';

const RotateControl = () => {
  const { rotateX, rotateZ } = useEditorState();
  const dispatch = useEditorDispatch();

  const onRotate = (dir: 'left' | 'right') => {
    if (typeof rotateZ === 'number') {
      const increment = rotateX === 45 ? 90 : 45;
      const rotation =
        dir === 'left' ? rotateZ - increment : rotateZ + increment;
      dispatch({
        type: EditorAction.rotate,
        payload: {
          rotateZ: rotation,
        },
      });
    }
  };

  return (
    <Flex alignItems="center" gap={2}>
      <Text as="label" flexShrink="0" mb="0">
        Rotate
      </Text>

      <IconButton
        onClick={() => onRotate('left')}
        colorScheme="teal"
        variant="outline"
        fontSize="lg"
        size="sm"
        aria-label="rotate left"
        icon={<MdRotateRight />}
      ></IconButton>
      <IconButton
        onClick={() => onRotate('right')}
        colorScheme="teal"
        variant="outline"
        fontSize="lg"
        size="sm"
        aria-label="rotate right"
        icon={<MdRotateLeft />}
      ></IconButton>
    </Flex>
  );
};

export default RotateControl;
