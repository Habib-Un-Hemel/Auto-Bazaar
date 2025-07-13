import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import * as Service from "@/Shared/Service"; // Changed from default import to namespace import
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
// import React, { useNavigate } from "react";

function OwnersDetail({ carDetail }) {
  const { user } = useUser();
  const navigation = useNavigate();
  const OnMessageOwnerButtonClick = async () => {
    const userId = user.primaryEmailAddress.emailAddress.split("@")[0];
    const ownerUserId = carDetail?.createdBy.split("@")[0];

    //create current user in SendBird
    try {
      await Service.CreateSendBirdUser(
        userId,
        user?.fullName,
        user?.imageUrl
      ).then((resp) => {
        console.log(resp);
      });
    } catch (e) {
      console.error("Error creating SendBird user:", e);
    }
    // Ownder  UserId
    try {
      // console.log("Owner UserId:", ownerUserId);
      await Service.CreateSendBirdUser(
        ownerUserId,
        carDetail?.userName,
        carDetail?.userImageUrl
      ).then((resp) => {
        console.log(resp);
      });
    } catch (e) {}

    // Create Channel
    try {
      await Service.CreateSendBirdChannel(
        [userId, ownerUserId],
        carDetail?.listingTitle // Assuming this is part of the carDetail object based on the second image.
      ).then((resp) => {
        console.log(resp);
        console.log("Channel Created");
        navigation("/profile");
      });
    } catch (e) {
      // console.error("Error creating SendBird channel:", e); // Optional: add error logging
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl mb-3">Owner</h2>
      <img
        src={carDetail?.userImageUrl}
        alt="Owner"
        className="w-[70px] h-[70px] rounded-full object-cover"
      />
      <h2 className="mt-2 font-bold text-xl">{carDetail?.userName}</h2>
      <h2 className="mt-2 text-gray-500">{carDetail?.createdBy}</h2>

      <Button className="w-full mt-6" onClick={OnMessageOwnerButtonClick}>
        Message Owner
      </Button>
    </div>
  );
}

// OwnersDetail.propTypes = {
//   carDetail: PropTypes.shape({
//     UserImageUrl: PropTypes.string,
//     userName: PropTypes.string,
//     createdBy: PropTypes.string,
//     listingTitle: PropTypes.string,
//   }),
// };

export default OwnersDetail;
