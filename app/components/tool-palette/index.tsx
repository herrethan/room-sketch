import React from 'react';
import { ButtonGroup, Flex, IconButton } from '@chakra-ui/react';
import {
  MdOutlineEdit,
  MdOutlineHighlightAlt,
  MdOutlinePanTool,
} from 'react-icons/md';
import { useScenePan } from '../scene/pan-provider';
import { useIsWallDraw } from '../walls-editor/provider';

const ToolPalette = () => {
  // const { zoom, walls, rotateX, rotateZ, editMode } = useEditorState();
  // const dispatch = useEditorDispatch();
  const [panMode, setPanMode] = useScenePan();
  const [isWallDraw, setIsWallDraw] = useIsWallDraw();

  const togglePanMode = () => setPanMode(panMode === 'on' ? 'off' : 'on');
  const toggleWallDraw = () => setIsWallDraw(!isWallDraw);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') setPanMode('on');
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') setPanMode('off');
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [setPanMode]);

  // const onSwitch = () => {
  //   dispatch({
  //     type: EditorAction.rotate,
  //     payload: {
  //       rotateX: rotateX === 45 ? 0 : 45,
  //       rotateZ: rotateX === 45 ? 0 : 45,
  //     },
  //   });
  // };

  // const onCommitEdit = (newWalls: Wall[]) => {
  //   dispatch({
  //     type: EditorAction.recreate,
  //     payload: newWalls,
  //   });
  // };

  return (
    <Flex
      position="absolute"
      zIndex="docked"
      top="4"
      left="4"
      right="4"
      justifyContent="center"
    >
      <ButtonGroup variant="outline" colorScheme="teal" spacing="0">
        <IconButton
          variant={panMode === 'on' ? 'solid' : 'outline'}
          onClick={togglePanMode}
          icon={<MdOutlinePanTool />}
          size="sm"
          fontSize="lg"
          aria-label="pan"
        ></IconButton>
        <IconButton
          icon={<MdOutlineHighlightAlt />}
          size="sm"
          fontSize="lg"
          aria-label="select"
        ></IconButton>
        <IconButton
          variant={panMode === 'off' && isWallDraw ? 'solid' : 'outline'}
          onClick={toggleWallDraw}
          icon={<MdOutlineEdit />}
          size="sm"
          fontSize="lg"
          aria-label="draw"
        ></IconButton>
      </ButtonGroup>
    </Flex>
  );
};

export default ToolPalette;
