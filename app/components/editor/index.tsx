import React from 'react';
import {
  EditMode,
  EditorAction,
  useEditorDispatch,
  useEditorState,
} from './provider';
import Scene from '../scene';
import Walls from '../walls';
import { Box, Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import ZoomControl from '../zoom-control';
import RotateControl from '../rotate-control';
import WallsEditor from '../walls-editor';
import type { Wall } from '~/data/walls';
import ToolPalette from '../tool-palette';
import { ScenePanProvider } from '../scene/pan-provider';
import { WallDrawProvider } from '../walls-editor/provider';

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

  const onCommitEdit = (newWalls: Wall[]) => {
    dispatch({
      type: EditorAction.recreate,
      payload: newWalls,
    });
  };

  return (
    <Box flexGrow={1} height="100vh" position="relative">
      <ScenePanProvider>
        <WallDrawProvider>
          <Scene zoom={zoom} rotateX={rotateX} rotateZ={rotateZ}>
            {editMode === null && <Walls walls={walls} />}
            {editMode === EditMode.wall && (
              <WallsEditor walls={walls} onCommit={onCommitEdit} />
            )}
          </Scene>
          <ToolPalette />
        </WallDrawProvider>
      </ScenePanProvider>
      <Flex
        direction="column"
        gap="4"
        position="absolute"
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
    </Box>
  );
};

export default Editor;
