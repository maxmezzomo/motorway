import { parseColor } from "@react-stately/color";
import { useLocale } from "@react-aria/i18n";

import ColorWheel from "./wheel";
import ColorSlider from "./slider";

const RADIUS = 80;
const TRACK_THICKNESS = 28;

type Props = {
  value: string;
  onChange: (v: string) => void;
};

const ColorPicker = (props: Props) => {
  let { locale } = useLocale();
  const color = parseColor(props.value);

  return (
    <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
      <div>
        <ColorWheel
          value={color}
          onChange={(c) => props.onChange(c.toString("css"))}
          outerRadius={RADIUS}
          innerRadius={RADIUS - TRACK_THICKNESS}
        />
      </div>
      <div
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          margin: "10px 30px",
        }}
      >
        <ColorSlider
          value={color}
          onChange={(c) => props.onChange(c.toString("css"))}
          locale={locale}
          channel="saturation"
          label="saturation"
        />
        <ColorSlider
          value={color}
          onChange={(c) => props.onChange(c.toString("css"))}
          locale={locale}
          channel="lightness"
          label="lightness"
        />
        <ColorSlider
          value={color}
          onChange={(c) => props.onChange(c.toString("css"))}
          locale={locale}
          channel="alpha"
          label="alpha"
        />
      </div>
      <div
        style={{
          width: "5em",
          height: "5em",
          background: color.toString("css"),
        }}
      />
    </div>
  );
};

export default ColorPicker;
