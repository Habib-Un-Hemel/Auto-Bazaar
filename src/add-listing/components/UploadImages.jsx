import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoMdCloseCircle } from "react-icons/io";
import { storage } from "./../../../configs/firebaseConfig";
import { db } from "./../../../configs";
import { CarImages } from "./../../../configs/schema";
import { eq } from "drizzle-orm";

function UploadImages({ triggerUploadImages, setLoader, carInfo, mode }) {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [EditCarImageList, setEditCarImageList] = useState([]);

  // useEffect(() => {
  //   console.log("UploadImages component mounted with mode:", mode);
  //   console.log("Car Info:", carInfo);
  //   console.log("EditCarImageList before update:", EditCarImageList);
  //   if (mode == "edit") {
  //     carInfo?.images.forEach((image) => {
  //       setEditCarImageList((prev) => [...prev, image?.imageUrl]);
  //       console.log(image);
  //     });
  //   }
  // }, [mode]);

  // // Reset EditCarImageList when entering edit mode
  useEffect(() => {
    console.log("Edit mode effect running with:", { mode, carInfo });

    if (mode === "edit" && carInfo?.images) {
      setEditCarImageList([]);
      const imageUrls = carInfo.images
        .filter((image) => image?.imageUrl)
        .map((image) => image.imageUrl);
      console.log("Setting image URLs:", imageUrls);
      console.log(carInfo.images);

      setEditCarImageList(imageUrls);
    }
  }, [mode, carInfo]);

  // // Monitor state changes
  // useEffect(() => {
  //   console.log("EditCarImageList changed:", EditCarImageList);
  // }, [EditCarImageList]);

  // ============

  // useEffect(() => {
  //   if (mode === "edit" && carInfo?.images?.length > 0) {
  //     setEditCarImageList([]); // Reset the list before populating
  //     const imageUrls = carInfo.images
  //       .filter((image) => image?.imageUrl)
  //       .map((image) => image.imageUrl);
  //     setEditCarImageList(imageUrls);
  //   }
  // }, [carInfo]);

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

  const onImageRemoveFromDB = async (image, index) => {
    console.log("Removing image from DB:", image);
    console.log(carInfo?.images[index]);
    await db
      .delete(CarImages)
      .where(eq(CarImages.id, carInfo?.images[index]?.id)).returning({id: CarImages.id});

    const imageList = EditCarImageList.filter(item => item != image);
    setEditCarImageList(imageList);
  };

  //uploadImageonServer()
  const handleUpload = async () => {
    setLoader(true);
    for (const file of selectedFileList) {
      const fileName = Date.now() + ".jpeg";
      const storageRef = ref(storage, "autoBazar/" + fileName);
      const metaData = {
        contentType: "image/jpeg",
      };
      try {
        const snapShot = await uploadBytes(storageRef, file, metaData);
        console.log("Uploaded a blob or file!", snapShot);
        const downloadUrl = await getDownloadURL(storageRef);
        console.log("File available at", downloadUrl);
        await db.insert(CarImages).values({
          imageUrl: downloadUrl,
          carListingId: triggerUploadImages, // Assuming listingId is passed as a prop
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    setLoader(false);
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 ">
        {mode == "edit" &&
          EditCarImageList.map((image, index) => (
            <div key={index} className="relative">
              <IoMdCloseCircle
                className="absolute m-2 text-lg text-white cursor-pointer"
                onClick={() => onImageRemoveFromDB(image, index)}
              />
              <img
                src={image}
                alt={`Selected file ${index + 1}`}
                className="w-full h-[130px] object-cover rounded-xl"
              />
            </div>
          ))}

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
UploadImages.propTypes = {
  triggerUploadImages: PropTypes.bool.isRequired,
  setLoader: PropTypes.func.isRequired,
  carInfo: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        id: PropTypes.number,
      })
    ),
  }),
  mode: PropTypes.string.isRequired,
};

export default UploadImages;
