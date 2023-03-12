import React from 'react';
import {
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import {
  EditorAction,
  useEditorDispatch,
  useEditorState,
} from '../editor/provider';

const ZoomControl = () => {
  const { zoom } = useEditorState();
  const dispatch = useEditorDispatch();

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="zoom-slider" flexShrink="0" mb="0">
        Zoom
      </FormLabel>
      <Slider
        id="zoom-slider"
        aria-label="zoom-slider"
        defaultValue={zoom}
        colorScheme="green"
        onChange={zoom =>
          dispatch({ type: EditorAction.zoom, payload: { zoom } })
        }
        min={0.5}
        step={0.125}
        max={8}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize="4" />
      </Slider>
    </FormControl>
  );
};

export default ZoomControl;
