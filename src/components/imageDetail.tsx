import useFilter from "../hooks/useFilters";
import { ImageResponse } from "../types/image";
import Slider from "./slider/slider";
import IconClose from "./svg/close";

type Props = {
  readonly image: ImageResponse | undefined;
  readonly onClose: () => void;
};

const capitalize = (s: string) => s && s[0].toLocaleUpperCase() + s.slice(1);

const ImageDetail = ({ image, onClose }: Props) => {
  const { values, css, update, reset } = useFilter();
  if (!image) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        width: "1200px",
        height: "800px",
        background:
          "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(112,112,112,.5) 52%, rgba(38,38,38,1) 100%)",
        position: "relative",
      }}
    >
      <div style={{ cursor: "pointer" }} onClick={() => onClose()}>
        <IconClose fill="#ccc" />
      </div>

      <div
        style={{
          display: "flex",
          width: "1000px",
          height: "800px",
          background: `${image.color}BB`,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* <img
          src={`${image.url}.webp`}
          alt={image.alt_description}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "fill",
            filter: "blur(5px) opacity(80%) brightness(50%)",
          }}
        /> */}
        <img
          src={`${image.url}.webp`}
          alt={image.alt_description}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            filter: css,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          color: "#ccc",
          padding: 10,
        }}
      >
        {/* if there was title attr would look good here */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 style={{ margin: 6, fontSize: 22 }}>
            {capitalize(image.alt_description)}
          </h1>
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
        </div>

        <h2 style={{ fontSize: 12, fontWeight: "lighter" }}>
          {image.description}
        </h2>
        <div
          style={{
            padding: 10,
            background: "#11111180",
          }}
        >
          <h2 style={{ fontSize: 18 }}>Filters</h2>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: 0,
              padding: 0,
              listStyle: "none",
              overflowY: "auto",
              overflowX: "hidden",
              fontSize: 12,
            }}
          >
            {values.map(
              ({ label, property, value, bounds: [minValue, maxValue] }) => (
                <li>
                  <Slider
                    {...{
                      label,
                      value: [value],
                      minValue,
                      maxValue,
                      onChange: (value) => {
                        console.log(value);
                        update(property, value[0]);
                      },
                    }}
                  />
                </li>
              )
            )}
          </ul>
          <button onClick={() => reset()}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
