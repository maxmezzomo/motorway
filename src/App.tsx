import { OverlayProvider } from "@react-aria/overlays";
import React, { useEffect, useState } from "react";
import "./App.css";
import ImagesView from "./components/imageGallery";
import Slider from "./components/slider/slider";
import { ImageResponse } from "./types/image";
import { useOverlayTriggerState } from "@react-stately/overlays";
import ImageDetail from "./components/imageDetail";
import Overlay from "./components/overlay";
import Form from "./components/form/form";
import IconContact from "./components/svg/contact";

const App = () => {
  const [images, setImages] = useState<ImageResponse[]>();
  const [imageCount, setImageCount] = useState(1);

  useEffect(() => {
    fetch(`images?limit=${imageCount}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setImages(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [imageCount]);

  const [imageSize, setImageSize] = useState(60);

  const FOOTER_HEIGHT = 60;

  const detailOverlayState = useOverlayTriggerState({});
  const formOverlayState = useOverlayTriggerState({});

  const [activeImages, setActiveImages] = useState<readonly string[]>([]);

  useEffect(() => {
    if (activeImages[0]) {
      detailOverlayState.open();
    }
  }, [activeImages, detailOverlayState]);

  const closeImageOverlay = () => {
    detailOverlayState.close();
    setActiveImages([]);
  };

  const imageOverlay = detailOverlayState.isOpen && (
    <Overlay isOpen={true} isDismissible={true} onClose={closeImageOverlay}>
      <ImageDetail
        onClose={closeImageOverlay}
        image={images?.find((image) => image.id === activeImages[0])}
      />
    </Overlay>
  );

  const formOverlay = formOverlayState.isOpen && (
    <Overlay
      isOpen={true}
      isDismissible={true}
      onClose={formOverlayState.close}
    >
      <Form onClose={formOverlayState.close} />
    </Overlay>
  );

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <OverlayProvider>
        {imageOverlay}
        {formOverlay}

        <header style={{ display: "flex", justifyContent: "center" }}>
          <h1>Cars</h1>
        </header>
        <div style={{ marginBottom: FOOTER_HEIGHT }}>
          {images && (
            <ImagesView
              images={images}
              rowHeight={imageSize * 4}
              onToggleDetail={(id) => setActiveImages([id])}
            />
          )}
        </div>
        <footer
          style={{
            position: "fixed",
            height: FOOTER_HEIGHT,
            bottom: 0,
            left: 0,
            right: 0,
            background: "#333",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2em",
          }}
        >
          <div style={{ display: "flex" }}>
            <Slider
              label="Image size"
              minValue={45}
              maxValue={100}
              value={[imageSize]}
              onChange={(v) => setImageSize(v[0])}
            />
            <div style={{ width: "2em" }} />
            <Slider
              label="Image Count"
              minValue={5}
              maxValue={60}
              value={[imageCount]}
              onChange={(v) => setImageCount(v[0])}
            />
          </div>
          <button
            onClick={() => formOverlayState.open()}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 1.5em",
              fontSize: 16,
            }}
          >
            <IconContact /> Contact
          </button>
        </footer>
      </OverlayProvider>
    </div>
  );
};

export default App;
