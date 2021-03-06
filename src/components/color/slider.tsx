import { FC, useRef } from "react";

import { useColorSlider } from "@react-aria/color";
import {
  useColorSliderState,
  ColorSliderStateOptions,
} from "@react-stately/color";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useFocusRing } from "@react-aria/focus";
import { useLocale } from "@react-aria/i18n";

const TRACK_THICKNESS = 28;
const THUMB_SIZE = 20;

type Props = ColorSliderStateOptions;

const Slider: FC<Props> = (props) => {
  let { locale } = useLocale();
  let state = useColorSliderState({
    ...props,
    locale,
  });
  let trackRef = useRef<null | HTMLDivElement>(null);
  let inputRef = useRef<null | HTMLInputElement>(null);
  let label = props.label || state.value.getChannelName(props.channel, locale);

  let { outputProps, labelProps, trackProps, thumbProps, inputProps } =
    useColorSlider(
      {
        ...props,
        trackRef,
        inputRef,
      },
      state
    );

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 300,
      }}
    >
      <div style={{ display: "flex", alignSelf: "stretch" }}>
        <label {...labelProps}>{label}</label>
        <output {...outputProps} style={{ flex: "1 0 auto", textAlign: "end" }}>
          {state.value.formatChannelValue(props.channel, locale)}
        </output>
      </div>
      <div
        {...trackProps}
        ref={trackRef}
        style={{
          ...trackProps.style,
          height: TRACK_THICKNESS,
          width: "100%",
          borderRadius: 4,
        }}
      >
        <div
          {...thumbProps}
          style={{
            ...thumbProps.style,
            top: TRACK_THICKNESS / 2,
            border: "2px solid white",
            boxShadow: "0 0 0 1px black, inset 0 0 0 1px black",
            width: isFocusVisible ? TRACK_THICKNESS + 4 : THUMB_SIZE,
            height: isFocusVisible ? TRACK_THICKNESS + 4 : THUMB_SIZE,
            borderRadius: "50%",
            boxSizing: "border-box",
            background: state.getDisplayColor().toString("css"),
          }}
        >
          <VisuallyHidden>
            <input ref={inputRef} {...inputProps} {...focusProps} />
          </VisuallyHidden>
        </div>
      </div>
    </div>
  );
};

export default Slider;
