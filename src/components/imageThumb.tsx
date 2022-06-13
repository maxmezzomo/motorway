import { useHover } from "@react-aria/interactions";
import { ImageResponse } from "../types/image";
import { useSpring, animated, useTransition } from "@react-spring/web";

type Props = {
  readonly image: ImageResponse;
  readonly maxHeight: number;
};

const truncate = (input: string | null, maxLength: number) =>
  input
    ? input.length > maxLength
      ? `${input.substring(0, maxLength)} ...`
      : input
    : null;

//simple approx to get a visible color
const getTextColor = (backgroundColor: `#${string}`): string => {
  const hexValue = backgroundColor.slice(1);
  const rgb = [0, 2, 4].map((i) => {
    return parseInt(hexValue.substring(i, i + 2), 16);
  });
  const invertedRgb = rgb.map((v) => 255 - v);
  const average = rgb.reduce((pre, curr) => pre + curr, 0) / 3;
  const lightnessAv = average > 255 / 2 ? 0 : 255;
  //we just want a bit of tint
  const [r, g, b] = invertedRgb.map((v) => v * 0.33 + lightnessAv * 0.67);
  return `rgb(${r},${g},${b})` as const;
};

const Image = ({ image, maxHeight, ...props }: Props) => {
  const { hoverProps, isHovered } = useHover({});

  const animatedStyles = useSpring({
    scale: isHovered ? 1.025 : 1,
  });

  const detailTransition = useTransition(isHovered, {
    from: { opacity: 0, y: 5 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 5 },
  });
  return (
    <animated.div
      style={{ display: "flex", position: "relative", ...animatedStyles }}
      {...props}
      {...hoverProps}
    >
      <img
        src={`${image.url}.webp`}
        alt={image.alt_description}
        style={{ maxHeight, objectFit: "scale-down" }}
      />
      {detailTransition(
        (styles, item) =>
          item && (
            <animated.div
              style={{
                display: "flex",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: 5,
                maxHeight: "30%",
                background: `${image.color}80`,
                justifyContent: "space-between",
                flexDirection: "row-reverse",
                color: getTextColor(image.color),
                fontSize: 12,
                ...styles,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  fontSize: 10,
                }}
              >
                <img
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  src={`${image.user.profile_image}.webp`}
                  alt={`${image.user.name} profile `}
                />
                {image.user.name}
              </div>
              <div style={{ textOverflow: "clip" }}>
                {truncate(image.description, maxHeight)}
              </div>
            </animated.div>
          )
      )}
    </animated.div>
  );
};

export default Image;
