import React, { useCallback, useRef, useState } from 'react'
import { Button, Spin } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import Cropper from 'react-perspective-cropper'
import { saveAs } from 'file-saver'

import './App.css'

const App = () => {
  const [cropState, setCropState] = useState()
  const [img, setImg] = useState()
  const [res, setRes] = useState()
  const cropperRef = useRef()

  const onDragStop = useCallback((s) => setCropState(s), [])
  const onChange = useCallback((s) => setCropState(s), [])

  const doSomething = async () => {
    console.log('CropState', cropState)
    try {
      const res = await cropperRef.current.done({
        preview: true,
        filterCvParams: {
          thMeanCorrection: 13,
          thMode: window.cv.ADAPTIVE_THRESH_GAUSSIAN_C
        }
      })
      setRes(res)
      console.log('Cropped and filtered image', res)
    } catch (e) {
      console.log('error', e)
    }
  }

  const onImgSelection = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // it can also be a http or base64 string for example
      setImg(e.target.files[0])
    }
  }

  const downloadImage = () => {
    saveAs(res, 'scan-photo.png')
  }

  return (
    <div className='root-container'>
      <div className='content-container'>
        {cropState && (
          <div className='buttons-container'>
            <Button onClick={doSomething} icon={<CheckOutlined />}>
              Done
            </Button>
            <Button
              onClick={() => {
                cropperRef.current.backToCrop()
              }}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                setImg(undefined)
                setCropState()
              }}
            >
              Reset
            </Button>
          </div>
        )}
        <Cropper
          openCvPath='./opencv/opencv.js'
          ref={cropperRef}
          image={img}
          onChange={onChange}
          onDragStop={onDragStop}
          maxWidth={window.innerWidth - 10}
        />
        {cropState?.loading && <Spin />}
        {!img && (
          <label className='custom-file-upload'>
            <input
              className='inputFile'
              type='file'
              name='file'
              onChange={onImgSelection}
              accept='image/png, image/gif, image/jpeg'
              capture='environment'
            />
            Take Picture
          </label>
        )}
        {res && (
          <div className='buttons-container'>
            <Button onClick={downloadImage} icon={<CheckOutlined />}>
              Download
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
