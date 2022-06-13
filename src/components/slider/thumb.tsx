import { useSliderThumb } from "@react-aria/slider";
import { SliderState } from "@react-stately/slider";
import { useFocusRing } from "@react-aria/focus";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { mergeProps } from "@react-aria/utils";
import { RefObject, useRef } from "react";

type Props = {
  trackRef: RefObject<HTMLDivElement>;
  index: number;
  sliderState: SliderState;
  thumbSize?: number;
};

const Thumb = ({ thumbSize = 20, ...props }: Props) => {
  const { sliderState, trackRef, index } = props;
  const inputRef = useRef(null);
  const { thumbProps, inputProps } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    sliderState
  );

  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <div
      style={{
        position: "absolute",
        top: 4,
        transform: "translateX(-50%)",
        left: `${sliderState.getThumbPercent(index) * 100}%`,
      }}
    >
      <div
        {...thumbProps}
        style={{
          width: thumbSize,
          height: thumbSize,
          borderRadius: "50%",
          backgroundColor: isFocusVisible
            ? "orange"
            : sliderState.isThumbDragging(index)
            ? "#aaa"
            : "#ccc",
        }}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
        </VisuallyHidden>
      </div>
    </div>
  );
};

export default Thumb;
