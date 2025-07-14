import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import * as Service from "@/Shared/Service"; // Changed from default import to namespace import
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
// import React, { useNavigate } from "react";

function OwnersDetail({ bikeDetail }) {
  const { user } = useUser();
  const navigation = useNavigate();

  const OnMessageOwnerButtonClick = async () => {
    if (!user || !bikeDetail?.createdBy) {
      alert("You need to be logged in to message the owner");
      navigation("/sign-in");
      return;
    }

    const userId = user.primaryEmailAddress.emailAddress.split("@")[0];
    const ownerUserId = bikeDetail?.createdBy.split("@")[0];

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

    // Owner UserId
    try {
      // console.log("Owner UserId:", ownerUserId);
      await Service.CreateSendBirdUser(
        ownerUserId,
        bikeDetail?.userName || "Bike Owner",
        bikeDetail?.userImageUrl
      ).then((resp) => {
        console.log(resp);
      });
    } catch (e) {
      console.error("Error creating owner SendBird user:", e);
    }

    // Create Channel
    try {
      await Service.CreateSendBirdChannel(
        [userId, ownerUserId],
        bikeDetail?.title ||
          `Regarding ${bikeDetail?.make} ${bikeDetail?.model}`
      ).then((resp) => {
        console.log(resp);
        console.log("Channel Created");
        navigation("/profile");
      });
    } catch (e) {
      console.error("Error creating SendBird channel:", e);
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl mb-3">Owner</h2>
      {bikeDetail?.userImageUrl ? (
        <img
          src={bikeDetail?.userImageUrl}
          alt="Owner"
          className="w-[70px] h-[70px] rounded-full object-cover"
        />
      ) : (
        <div className="w-[70px] h-[70px] rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-xl">
            {bikeDetail?.createdBy?.charAt(0)?.toUpperCase() || "?"}
          </span>
        </div>
      )}
      <h2 className="mt-2 font-bold text-xl">
        {bikeDetail?.userName || "Seller"}
      </h2>
      <h2 className="mt-2 text-gray-500">
        {bikeDetail?.createdBy || "Contact for details"}
      </h2>

      <Button className="w-full mt-6" onClick={OnMessageOwnerButtonClick}>
        Message Owner
      </Button>
    </div>
  );
}

OwnersDetail.propTypes = {
  bikeDetail: PropTypes.shape({
    userImageUrl: PropTypes.string,
    userName: PropTypes.string,
    createdBy: PropTypes.string,
    title: PropTypes.string,
    make: PropTypes.string,
    model: PropTypes.string,
  }),
};

export default OwnersDetail;
