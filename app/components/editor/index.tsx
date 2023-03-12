import React from 'react';
import { EditorAction, useEditorDispatch, useEditorState } from './provider';
import Scene from '../scene';
import Walls from '../walls';
import RoomContainer from '../room-container';
import { Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import ZoomControl from '../zoom-control';
import RotateControl from '../rotate-control';

const Editor = () => {
  const { zoom, walls, rotateX, rotateZ } = useEditorState();
  const dispatch = useEditorDispatch();

  const onSwitch = () => {
    dispatch({
      type: EditorAction.rotate,
      payload: {
        rotateX: rotateX === 45 ? 0 : 45,
        rotateZ: rotateX === 45 ? 0 : 45,
      },
    });
  };

  return (
    <RoomContainer>
      <Scene zoom={zoom} rotateX={rotateX} rotateZ={rotateZ}>
        <Walls walls={walls} />
      </Scene>
      <Flex
        direction="column"
        gap="4"
        position="fixed"
        bottom="4"
        right="4"
        width="32"
      >
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="switch-3d" mb="0">
            45˚ view
          </FormLabel>
          <Switch
            isChecked={rotateX === 45}
            onChange={onSwitch}
            colorScheme="green"
            id="switch-3d"
          />
        </FormControl>
        <ZoomControl />
        <RotateControl />
      </Flex>
    </RoomContainer>
  );
};

export default Editor;
