import React, { useCallback, useRef, useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import Cropper from "react-perspective-cropper";

import "./App.css";

const Scanner = ({ data, setData, img, setImg, id, done, setDone }) => {
  const [cropState, setCropState] = useState();
  const [title, setTitle] = useState();
  const [result, setResult] = useState();
  const cropperRef = useRef();

  const onDragStop = useCallback((s) => setCropState(s), []);
  const onChange = useCallback((s) => setCropState(s), []);

  useEffect(() => {
    switch (id) {
      case 0:
        setTitle("ID Card");
        break;
      case 1:
        setTitle("Driving Licence");
        break;
      case 2:
        setTitle("Vaccine Certificate");
        break;
      case 3:
        setTitle("Visa");
        break;

      default:
        setTitle(id);
        break;
    }
  }, [id]);

  const doSomething = async () => {
    try {
      const res = await cropperRef.current.done({
        preview: true,
        filterCvParams: {
          thMeanCorrection: 13,
          thMode: window.cv.ADAPTIVE_THRESH_GAUSSIAN_C,
        },
      });
      setResult(res);
    } catch (e) {
      console.log("error", e);
    }
  };
  const Save = () => {
    setData([...data, { title: title, photo: URL.createObjectURL(result) }]);
    setDone([...done, id]);
    setImg(undefined);
  };

  return (
    <div className="content-container">
      {cropState && (
        <div className="buttons-container">
          <Button onClick={doSomething} icon={<CheckOutlined />}>
            Done
          </Button>
          <Button
            onClick={() => {
              cropperRef.current.backToCrop();
            }}
          >
            Back
          </Button>
          <Button onClick={Save} icon={<CheckOutlined />}>
            Save
          </Button>
        </div>
      )}
      <Cropper
        openCvPath="./opencv/opencv.js"
        ref={cropperRef}
        image={img}
        onChange={onChange}
        onDragStop={onDragStop}
        maxWidth={280}
      />

      {cropState?.loading && <Spin />}
    </div>
  );
};

export default Scanner;
