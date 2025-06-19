import React from 'react';
import { Box, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import {
  EditMode,
  EditorAction,
  useEditorDispatch,
  useEditorState,
} from '../editor/provider';

const EditorPanel = () => {
  const { editMode } = useEditorState();
  const dispatch = useEditorDispatch();

  const onModeSwitch = (mode: EditMode | null) => {
    dispatch({
      type: EditorAction.mode,
      payload: mode,
    });
  };

  return (
    <Box width="48" bgColor="white" flexShrink={0} shadow="md" zIndex="docked">
      <FormControl
        display="flex"
        m={2}
        alignItems="center"
        id="switch-mode-control"
      >
        <FormLabel htmlFor="switch-mode" mb="0">
          Wall edit mode:
        </FormLabel>
        <Switch
          isChecked={editMode === EditMode.wall}
          onChange={() =>
            onModeSwitch(editMode === EditMode.wall ? null : EditMode.wall)
          }
          id="switch-mode"
        />
      </FormControl>
    </Box>
  );
};

export default EditorPanel;
