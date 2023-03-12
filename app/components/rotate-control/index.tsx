import React from 'react';
import { Flex, FormControl, FormLabel, IconButton } from '@chakra-ui/react';
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
    <FormControl display="flex" alignItems="center">
      <FormLabel flexShrink="0" mb="0">
        Rotate
      </FormLabel>
      <Flex>
        <IconButton
          onClick={() => onRotate('left')}
          colorScheme="green"
          variant="outline"
          fontSize="lg"
          size="sm"
          aria-label="asdf"
          icon={<MdRotateRight />}
        ></IconButton>
        <IconButton
          onClick={() => onRotate('right')}
          colorScheme="green"
          variant="outline"
          fontSize="lg"
          size="sm"
          aria-label="asdf"
          icon={<MdRotateLeft />}
        ></IconButton>
      </Flex>
    </FormControl>
  );
};

export default RotateControl;
