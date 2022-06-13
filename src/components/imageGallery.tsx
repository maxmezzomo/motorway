import { ImageResponse } from "../types/image";
import Image from "./imageThumb";

type Props = {
  readonly images: readonly ImageResponse[];
  readonly rowHeight: number;
  readonly onToggleDetail: (id: string) => void;
};

const Display = ({ images, onToggleDetail, rowHeight }: Props) => {
  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        justifyContent: "space-evenly",
      }}
    >
      {images.map((imageData) => (
        <li
          onClick={() => onToggleDetail(imageData.id)}
          key={imageData.id}
          style={{
            cursor: "pointer",
            display: "flex",
            margin: "1.5vw 10px",
          }}
        >
          <Image image={imageData} maxHeight={rowHeight} />
        </li>
      ))}
    </ul>
  );
};

export default Display;
