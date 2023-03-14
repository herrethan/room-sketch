import React from 'react';
import {
  EditMode,
  EditorAction,
  useEditorDispatch,
  useEditorState,
} from './provider';
import Scene from '../scene';
import Walls from '../walls';
import { Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import ZoomControl from '../zoom-control';
import RotateControl from '../rotate-control';
import WallsEditor from '../walls-editor';

const Editor = () => {
  const { zoom, walls, rotateX, rotateZ, editMode } = useEditorState();
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
    <>
      <Scene zoom={zoom} rotateX={rotateX} rotateZ={rotateZ}>
        {editMode === null && <Walls walls={walls} />}
        {editMode === EditMode.wall && <WallsEditor walls={walls} />}
      </Scene>
      <Flex
        direction="column"
        gap="4"
        position="fixed"
        bottom="4"
        right="4"
        width="32"
      >
        <FormControl display="flex" alignItems="center" id="switch-3d-control">
          <FormLabel htmlFor="switch-3d" mb="0">
            45˚ view
          </FormLabel>
          <Switch
            isChecked={rotateX === 45}
            onChange={onSwitch}
            colorScheme="teal"
            id="switch-3d"
          />
        </FormControl>
        <ZoomControl />
        <RotateControl />
      </Flex>
    </>
  );
};

export default Editor;
