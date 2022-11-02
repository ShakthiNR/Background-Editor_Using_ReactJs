import React, { useRef, useState } from "react";
import EditImage from "./EditImage";

import * as htmlToImage from "html-to-image";

const UploadImage = () => {
  const [preview, setPreview] = useState();
  const [error, setError] = useState(null);
  const [color, setColor] = useState("");
  const [uIColor, setUIColor] = useState(null);
  const [downloadName, setDownloadName] = useState("");
  const domElement = useRef(null);

  //Get the Image using createObjectURL and Restrict to png and jpeg
  const handleChange = (e) => {
    if (e.target.files.length !== 0) {
      let fileType = e.target.files[0].name
        .split(".")
        .pop()
        .trim()
        .toLowerCase();
      let fileName = e.target.files[0].name;
      let splitName = fileName.split(".");
      splitName.splice(splitName.length - 1);
      var extractedFileName = splitName.join(" ");
      setDownloadName(extractedFileName);
      if (fileType === "png" || fileType === "jpeg") {
        setPreview(URL.createObjectURL(e.target.files[0]));
        setError(null);
        setColor(null);
      } else {
        setError("Invalid File Format!!! - Only JPEG and PNG are supported");
      }
    }
  };

  //Download the image
  const downloadImage = async () => {
    const dataUrl = await htmlToImage.toPng(domElement.current);
    const link = document.createElement("a");
    link.download = downloadName.concat(".png");
    link.href = dataUrl;
    link.click();
  };
  //Get the color from image - using EyeDropper()
  const handleColorPicker = () => {
    if (!window.EyeDropper) {
      alert("Your browser does not support the EyeDropper API");
      return;
    }
    const eyeDropper = new window.EyeDropper();
    eyeDropper
      .open()
      .then((res) => setColor(res.sRGBHex))
      .catch((err) => setColor(err));
  };

  //callback fn - to set the background of image
  const getColor = (uIColor) => {
    setUIColor(uIColor);
  };

  return (
    <>
      <div className="center-uploadContent mt-3">
        <div className="input-image">
          <input type="file" accept=".jpeg, .png" onChange={handleChange} />
          {!preview && (
            <p class="mt-1 text-sm text-gray-500" id="file_input_help">
              Only JPEG or PNG File Format{" "}
            </p>
          )}
          <span>
            {!error && preview && (
              <>
                <button onClick={handleColorPicker} className="btn-colorpick">
                  Color Picker
                </button>
                {color && (
                  <span>
                    Picked Color -{" "}
                    <span className="px-2" style={{ background: color }}>
                      {color}
                    </span>{" "}
                  </span>
                )}
              </>
            )}
          </span>
        </div>

        {error && <div className="error-msg">{error}</div>}
      </div>

      <center>
        {!error && preview && (
          <>
            {!error && preview && <EditImage getColor={getColor} />}
            <button className="btn-download" onClick={downloadImage}>
              Download Image
            </button>
          </>
        )}
      </center>
      <center>
        <div id="domElement" ref={domElement}>
          {!error && preview && (
            <>
              <div
                style={{
                  backgroundColor: `${uIColor}`,
                  opacity: "0.7",
                  width: "400px",
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={preview} alt="No..Image" />
              </div>
            </>
          )}
        </div>
      </center>
      <div></div>
    </>
  );
};

export default UploadImage;
