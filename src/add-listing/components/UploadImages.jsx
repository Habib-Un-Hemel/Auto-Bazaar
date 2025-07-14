import { db } from "../../../configs";
import { BikeImages } from "../../../configs/schema";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../configs/firebaseConfig";
import { eq } from "drizzle-orm";
import { BiLoaderAlt } from "react-icons/bi";
import { XCircle } from "lucide-react";
import { toast } from "sonner";

function UploadImages({ triggerUploadImages, bikeInfo, mode, setLoader }) {
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Fetch existing images when component loads in edit mode
  useEffect(() => {
    if (mode === "edit" && bikeInfo?.bikeImages) {
      const imageUrls = bikeInfo.bikeImages.map((img) => img.imageUrl);
      setExistingImages(imageUrls);
    }
  }, [mode, bikeInfo]);

  useEffect(() => {
    if (triggerUploadImages) {
      uploadImagesToStorage();
    }
  }, [triggerUploadImages]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Preview selected images
    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((results) => {
      setImages((prevImages) => [...prevImages, ...results]);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
    // Note: This only removes from UI. You'd need additional logic to delete from storage/database
    toast.info("Image marked for removal. Save to confirm changes.");
  };

  const uploadImagesToStorage = async () => {
    setUploading(true);
    try {
      if (images.length === 0 && existingImages.length === 0) {
        toast.error("Please select at least one image");
        setUploading(false);
        return;
      }

      // If in edit mode, handle existing images first
      if (mode === "edit") {
        // Delete removed images from database (those not in existingImages)
        const currentImages = bikeInfo.bikeImages.filter(
          (img) => !existingImages.includes(img.imageUrl)
        );

        for (const img of currentImages) {
          await db.delete(BikeImages).where(eq(BikeImages.id, img.id));
        }
      }

      // Upload new images
      for (let i = 0; i < images.length; i++) {
        const base64Data = images[i];
        const imageRef = ref(storage, `bike-images/${Date.now()}_${i}`);

        // Convert base64 to blob
        const response = await fetch(base64Data);
        const blob = await response.blob();

        // Upload to Firebase Storage
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);

        // Insert URL into database
        await db.insert(BikeImages).values({
          bikeListingId: triggerUploadImages,
          imageUrl: downloadURL,
        });
      }

      toast.success("All images uploaded successfully!");
      setLoader(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Error uploading images");
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-6">Upload Images</h2>
      <div className="border-2 border-dashed border-gray-300 p-5 rounded-lg">
        <input
          type="file"
          className="w-full"
          multiple
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>

      {/* Display existing images in edit mode */}
      {existingImages.length > 0 && (
        <div className="mt-5">
          <h3 className="font-medium text-lg mb-3">Existing Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {existingImages.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Existing ${index}`}
                  className="w-full h-40 object-cover rounded-md"
                />
                <button
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  type="button"
                >
                  <XCircle className="h-5 w-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display newly selected images */}
      {images.length > 0 && (
        <div className="mt-5">
          <h3 className="font-medium text-lg mb-3">New Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-full h-40 object-cover rounded-md"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  type="button"
                >
                  <XCircle className="h-5 w-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploading && (
        <div className="mt-4 flex justify-center">
          <BiLoaderAlt className="animate-spin text-2xl" />
        </div>
      )}
    </div>
  );
}

export default UploadImages;
