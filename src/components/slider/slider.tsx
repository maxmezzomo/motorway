import { useSlider } from "@react-aria/slider";
import { SliderStateOptions, useSliderState } from "@react-stately/slider";
import { useNumberFormatter } from "@react-aria/i18n";
import { useRef } from "react";
import Thumb from "./thumb";

type Props = {
  label: string;
  width?: number;
  thumbSize?: number;
} & Partial<SliderStateOptions>;

const Slider = ({ label, thumbSize, width = 250, ...sliderOptions }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const numberFormatter = useNumberFormatter({});
  const state = useSliderState({ numberFormatter, ...sliderOptions });
  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    { ...sliderOptions, label },
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
        width: width,
        touchAction: "none",
        color: "#ccc",
      }}
    >
      <div style={{ display: "flex", alignSelf: "stretch" }}>
        {label && <label {...labelProps}>{label}</label>}

        <output {...outputProps} style={{ flex: "1 0 auto", textAlign: "end" }}>
          {state.getThumbValueLabel(0)}
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
            backgroundColor: "#ccc",
            height: 3,
            top: 13,
            width: "100%",
          }}
        />
        <Thumb
          index={0}
          sliderState={state}
          trackRef={trackRef}
          thumbSize={thumbSize}
        />
      </div>
    </div>
  );
};

export default Slider;
