import React, { useState } from "react";
import "./App.css";
import "./output.css";
import {
  IconUpload,
  IconCamera,
  IconIdCard,
  IconLicence,
  IconCertificate,
  IconVisa,
  IconDownload,
  IconFolder,
  IconDelete,
  IconSuccess,
} from "./assets";
import Modal from "./Modal";
import Scanner from "./Scanner";
import { saveAs } from "file-saver";

function App() {
  const [data, setData] = useState([]);
  const [img, setImg] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState([]);
  const [page, setPage] = useState(1);
  const list = [
    { title: "ID Card", icon: <IconIdCard /> },
    { title: "Driving Licence", icon: <IconLicence /> },
    { title: "Vaccine Certificate", icon: <IconCertificate /> },
    { title: "Visa", icon: <IconVisa /> },
  ];
  const downloadAll = () => {
    for (let i = 0; i < data.length; i++) {
      saveAs(data[i].photo, "scan-photo.png");
    }
  };
  const downloadImage = (title) => {
    const i = data.findIndex((e) => e.title === title);
    saveAs(data[i].photo, "scan-photo.png");
  };
  const deleteImage = (title) => {
    const newData = [];
    data.forEach((e) => {
      if (e.title !== title) {
        newData.push(e);
      }
    });
    setData(newData);
  };
  return (
    <>
      <Modal shown={img} close={() => setImg(undefined)}>
        <Scanner
          data={data}
          setData={setData}
          img={img}
          setImg={setImg}
          id={id}
          done={done}
          setDone={setDone}
        />
      </Modal>

      {page === 1 && (
        <div className="bg-gray-200 min-h-screen ">
          {/* Mobile Phone Container */}
          <div className="min-h-screen md:rounded-3xl bg-white w-full max-w-sm mx-auto flex flex-col justify-between">
            {/* Content */}
            <div>
              {/* Header */}
              <div className="md:rounded-t-3xl bg-emerald-50 pt-8">
                <div className="flex justify-center">
                  <IconUpload />
                </div>
                <div className="my-4 text-xl px-4 font-medium">
                  Scan and upload your document then download when you need
                </div>
                <div className="px-4 text-sm">
                  Instead of saving your files onto your PC, or backing up to an
                  external hard drive, you save them online
                </div>
                {/* Button On Header */}
                <label>
                  <input
                    className="inputFile"
                    type="file"
                    name="file"
                    onChange={(e) => console.log(e.target.files[0])}
                    accept="image/png, image/gif, image/jpeg"
                    capture="environment"
                  />
                  <div className="flex justify-center cursor-pointer">
                    <label className="cursor-pointer">
                      <input
                        className="inputFile"
                        type="file"
                        name="file"
                        onChange={(e) => {
                          setImg(e.target.files[0]);
                          setId("Other File");
                        }}
                        accept="image/png, image/gif, image/jpeg"
                        capture="environment"
                      />
                      <div className="flex my-4 bg-sky-400 py-2 px-4 rounded-xl">
                        <IconCamera />
                        <span>Add Other File</span>
                      </div>
                    </label>
                  </div>
                </label>
              </div>
              {/* List of document that can be upload */}
              <div className="p-4">
                {list.map((e, i) => {
                  return (
                    <div key={i} className="my-4 flex justify-between">
                      <div className="flex ">
                        {e.icon}
                        {e.title}
                      </div>
                      <div>
                        {done.includes(i) ? (
                          <IconSuccess />
                        ) : (
                          <label className="cursor-pointer">
                            <input
                              className="inputFile"
                              type="file"
                              name="file"
                              onChange={(e) => {
                                setImg(e.target.files[0]);
                                setId(i);
                              }}
                              accept="image/png, image/gif, image/jpeg"
                              capture="environment"
                            />
                            <IconCamera />
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Fixed Button On The Bottom */}
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setPage(2)}
                disabled={
                  !done.includes(0) ||
                  !done.includes(1) ||
                  !done.includes(2) ||
                  !done.includes(3)
                }
                className={
                  !done.includes(0) ||
                  !done.includes(1) ||
                  !done.includes(2) ||
                  !done.includes(3)
                    ? "flex my-4 bg-gray-200 text-gray-400 py-2 px-14 rounded-xl"
                    : "flex my-4 bg-sky-400 py-2 px-14 rounded-xl"
                }
              >
                <IconDownload />
                <span>See & Download The Results</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {page === 2 && (
        <div className="bg-gray-200 min-h-screen ">
          {/* Mobile Phone Container */}
          <div className="min-h-screen md:rounded-3xl bg-white w-full max-w-sm mx-auto flex flex-col justify-between">
            {/* Content */}
            <div>
              {/* Header */}
              <div className="md:rounded-t-3xl bg-emerald-50 pt-8">
                <div className="flex justify-center">
                  <IconFolder />
                </div>
                <div className="mt-4 text-center text-xl font-medium">
                  List Of Result
                </div>
                <div className="pb-4 text-center text-sm">let's Download</div>
              </div>
              {/* List of document that can be upload */}
              <div className="p-4">
                {data.map((e, i) => {
                  return (
                    <div key={i} className="mb-8">
                      <div className="flex justify-center">
                        <img className="w-full" src={e.photo} alt="blob" />
                      </div>
                      <div className="flex items-center justify-between my-2 text-xl font-medium">
                        {e.title}
                        <div className="flex">
                          <span
                            className="mr-2"
                            onClick={() => deleteImage(e.title)}
                          >
                            <IconDelete />
                          </span>
                          <span
                            className="ml-2"
                            onClick={() => downloadImage(e.title)}
                          >
                            <IconDownload />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Fixed Button On The Bottom */}
            <div className="flex justify-center mb-4">
              <button
                onClick={downloadAll}
                className="flex my-4 bg-sky-400 py-2 px-14 rounded-xl"
              >
                <IconDownload />
                <span>Download All</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
