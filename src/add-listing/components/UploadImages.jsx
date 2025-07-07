import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { storage } from "./../../../configs/firebaseConfig";
import { Button } from "@/components/ui/button";

function UploadImages(triggerUploadImages) {
  const [selectedFileList, setSelectedFileList] = useState([]);

  useEffect(() => {
    if (triggerUploadImages) {
      handleUpload();
      setSelectedFileList([]); // Clear the file list after upload
    }
  }, [triggerUploadImages]);

  const onFileSelected = (event) => {
    const files = event.target.files;
    for (const file of files) {
      setSelectedFileList((prev) => [...prev, file]);
    }
  };

  const onImageRemove = (image) => {
    const result = selectedFileList.filter((item) => item !== image);
    setSelectedFileList(result);
  };

  const handleUpload = async () => {
    await selectedFileList.forEach(async (file) => {
      const fileName = Date.now() + ".jpeg";
      const storageRef = ref(storage, "autoBazar/" + fileName);
      const metaData = {
        contentType: "image/jpeg",
      };
      await uploadBytes(storageRef, file, metaData)
        .then((snapShot) => {
          console.log("Uploaded a blob or file!", snapShot);
        })
        .then((resp) => {
          getDownloadURL(storageRef).then(async (downloadUrl) => {
            console.log("File available at", downloadUrl);
            // Here you can save the downloadUrl to your database or state
            // For example, you can call a function to save it
            // await saveImageUrlToDatabase(downloadUrl);
          });
        });
    });
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 ">
        {selectedFileList.map((image, index) => (
          <div key={index} className="relative">
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white cursor-pointer"
              onClick={() => onImageRemove(image, index)}
            />
            <img
              src={URL.createObjectURL(image)}
              alt={`Selected file ${index + 1}`}
              className="w-full h-[130px] object-cover rounded-xl"
            />
          </div>
        ))}
        <div className="relative">
          <label htmlFor="upload-images">
            <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-4 hover:shadow-md cursor-pointer">
              <h2 className="text-lg text-center text-primary"> + </h2>
            </div>
          </label>
          <input
            type="file"
            multiple={true}
            id="upload-images"
            onChange={onFileSelected}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default UploadImages;
