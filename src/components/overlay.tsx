import { ReactNode, useRef } from "react";
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayProps,
  OverlayContainer,
} from "@react-aria/overlays";
import { FocusScope } from "@react-aria/focus";
import { CSSProperties } from "react";

type Props = {
  readonly children: ReactNode;
  readonly isOpen: boolean;
  readonly isDismissible: boolean;
  readonly onClose: () => void;
  readonly style?: CSSProperties;
} & OverlayProps;

const Overlay = ({ children, style = {}, ...props }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { overlayProps, underlayProps } = useOverlay(props, ref);

  usePreventScroll();
  const { modalProps } = useModal();

  return (
    <OverlayContainer>
      <div
        style={{
          fontFamily: "sans-serif",
          position: "fixed",
          zIndex: 100,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: "#00000040",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
        {...underlayProps}
      >
        <FocusScope contain restoreFocus autoFocus>
          <div
            {...overlayProps}
            {...modalProps}
            ref={ref}
            style={{
              background: "#222",
              color: "black",
              padding: 10,
            }}
          >
            {children}
          </div>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
};

export default Overlay;
