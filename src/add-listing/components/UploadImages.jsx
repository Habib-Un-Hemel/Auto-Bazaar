import { storage } from "configs/firebaseConfig";
import { ref } from "firebase/storage";
import React from "react";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { storage } from "configs/firebaseConfig";

function UploadImages() {
  const [selectedFileList, setSelectedFileList] = useState([]);

  const onFileSelected = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setSelectedFileList((prev) => [...prev, file]);
    }
  };

  const onImageRemove = (image, index) => {
    const result = selectedFileList.filter((item) => item != image);
    setSelectedFileList(result);
  };

  const UploadImages = () => {
    selectedFileList.forEach((file) => {
        const fileName = Date.now()+'jpeg'
        const storageRef = ref(storage,)

       })
  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 ">
        {selectedFileList.map((image, index) => (
          <div
            key={index}
            // className="border rounded-xl border-dotted border-primary bg-blue-100 p-4 hover:shadow-md"
          >
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white"
              onClick={() => onImageRemove(image, index)}
            ></IoMdCloseCircle>
            <img
              src={URL.createObjectURL(image)}
              // alt={`Selected file ${index + 1}`}
              className="w-full h-[130px] object-cover rounded-xl"
            />
          </div>
        ))}
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-4 hover:shadow-md">
            <h2 className="text-lg text-center text-primary"> + </h2>
          </div>
        </label>
        <input
          type="file"
          multiple={true}
          id="upload-images"
          onChange={onFileSelected}
          className="opacity-0"
        />
      </div>
    </div>
  );
}

export default UploadImages;
