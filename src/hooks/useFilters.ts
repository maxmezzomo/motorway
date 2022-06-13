import { useState } from "react";

type CSSFilterProperty =
  | "blur"
  | "brightness"
  | "contrast"
  | "grayscale"
  | "hue-rotate"
  | "invert"
  | "opacity"
  | "saturate"
  | "sepia";

const initialFilters: readonly {
  property: CSSFilterProperty;
  label: string;
  value: number;
  unit: string;
  bounds: [number, number];
}[] = [
  { property: "blur", label: "blur", value: 0, unit: "px", bounds: [0, 20] },
  {
    property: "brightness",
    label: "brightness",
    value: 100,
    unit: "%",
    bounds: [0, 100],
  },
  {
    property: "contrast",
    label: "contrast",
    value: 100,
    unit: "%",
    bounds: [0, 100],
  },
  {
    property: "grayscale",
    label: "grayscale",
    value: 0,
    unit: "%",
    bounds: [0, 100],
  },
  {
    property: "hue-rotate",
    label: "hue",
    value: 0,
    unit: "deg",
    bounds: [0, 360],
  },
  {
    property: "invert",
    label: "invert",
    value: 0,
    unit: "%",
    bounds: [0, 100],
  },
  {
    property: "opacity",
    label: "opacity",
    value: 100,
    unit: "%",
    bounds: [0, 100],
  },
  {
    property: "saturate",
    label: "saturate",
    value: 100,
    unit: "%",
    bounds: [0, 100],
  },
  {
    property: "sepia",
    label: "sepia",
    value: 0,
    unit: "%",
    bounds: [0, 100],
  },
];

const useFilter = () => {
  const [filters, setFilters] = useState(initialFilters);

  const update = (property: CSSFilterProperty, value: number) =>
    setFilters((f) => {
      const idx = f.findIndex((f) => f.property === property);
      const filters = [
        ...f.slice(0, idx),
        { ...f[idx], value },
        ...f.slice(idx + 1),
      ];
      return filters;
    });

  const css = filters
    .map(({ property, value, unit }) => `${property}(${value}${unit})`)
    .join("");

  const reset = () => setFilters(initialFilters);

  return { update, values: filters, css, reset } as const;
};

export default useFilter;
