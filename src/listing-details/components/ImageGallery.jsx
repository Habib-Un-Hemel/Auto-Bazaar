import React from "react";

function ImageGallery({ bikeDetail }) {
  return (
    <div>
      <img
        src={bikeDetail?.images[0].imageUrl}
        className="w-full h-[500px] object-cover rounded-xl"
      ></img>
    </div>
  );
}

export default ImageGallery;
