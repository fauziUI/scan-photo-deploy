import React from "react";

function Modal({ children, shown, close }) {
  return shown ? (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-2000 bg-black bg-opacity-50"
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        className="z-50 max-w-sm bg-white rounded-lg shadow-lg"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  ) : null;
}

export default Modal;
