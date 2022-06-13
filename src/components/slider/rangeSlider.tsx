import { useSlider } from "@react-aria/slider";
import { SliderStateOptions, useSliderState } from "@react-stately/slider";
import { useNumberFormatter } from "@react-aria/i18n";
import { useRef } from "react";
import Thumb from "./thumb";
import { NumberFormatOptions } from "@internationalized/number";

type Props = {
  label: string;
  format: NumberFormatOptions;
} & Partial<SliderStateOptions>;

const RangeSlider = (props: Props) => {
  let trackRef = useRef(null);

  let numberFormatter = useNumberFormatter(props.format);
  let state = useSliderState({ ...props, numberFormatter });
  let { groupProps, trackProps, outputProps } = useSlider(
    props,
    state,
    trackRef
  );

  return (
    <div
      {...groupProps}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 300,
        touchAction: "none",
      }}
    >
      <div style={{ display: "flex", alignSelf: "stretch" }}>
        <output {...outputProps} style={{ flex: "1 0 auto", textAlign: "end" }}>
          {`${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`}
        </output>
      </div>
      <div
        {...trackProps}
        ref={trackRef}
        style={{
          position: "relative",
          height: 30,
          width: " 100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "grey",
            height: 3,
            top: 13,
            width: "100%",
          }}
        />
        <Thumb index={0} sliderState={state} trackRef={trackRef} />
        <Thumb index={1} sliderState={state} trackRef={trackRef} />
      </div>
    </div>
  );
};

export default RangeSlider;
