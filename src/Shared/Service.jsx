import axios from "axios";

const sendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID;
const sendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;

export const CreateSendBirdUser = async (userId, nickName, profileUrl) => {
  // Fix the URL by removing the extra curly brace
  return axios.post(
    "https://api-" +
      sendBirdApplicationId.toLowerCase() +
      ".sendbird.com/v3/users",
    {
      user_id: userId,
      nickname: nickName,
      profile_url: profileUrl,
      issue_access_token: false,
    },
    {
      headers: {
        // Put headers inside a headers object
        "Content-Type": "application/json",
        "Api-Token": sendBirdApiToken,
      },
    }
  );
};

export const CreateSendBirdChannel = (users, title) => {
  return axios.post(
    "https://api-" +
      sendBirdApplicationId.toLowerCase() +
      ".sendbird.com/v3/group_channels",
    {
      user_ids: users,
      is_distinct: true,
      name: title,
    },
    {
      headers: {
        "Api-Token": sendBirdApiToken,
        "Content-Type": "application/json",
      },
    }
  );
};


export const FormatResult = (resp) => {
  console.log("Raw result:", resp);
  console.log("Raw result length:", resp?.length || 0);

  // Debug the structure of the first item if it exists
  if (resp && resp.length > 0) {
    console.log("First item keys:", Object.keys(resp[0]));
    console.log("First item structure:", JSON.stringify(resp[0], null, 2));
  }

  if (!resp || resp.length === 0) return [];

  const groupedListings = resp.reduce((acc, item) => {
    // Add more debugging
    console.log("Processing item:", item);

    // Check property names - this is likely the issue
    const bikeListingProperty =
      item.BikeListing || item.bikeListing || item.bikelisting;
    const bikeImagesProperty =
      item.BikeImages || item.bikeImages || item.bikeimages;

    console.log("Found BikeListing?", !!bikeListingProperty);
    console.log("Found BikeImages?", !!bikeImagesProperty);

    // Try to find the ID regardless of property casing
    const listingId = bikeListingProperty?.id;

    if (!listingId) {
      console.log("No listing ID found for item:", item);
      return acc;
    }

    if (!acc[listingId]) {
      acc[listingId] = {
        ...bikeListingProperty,
        images: [],
      };
    }

    if (bikeImagesProperty) {
      acc[listingId].images.push(bikeImagesProperty);
    }

    return acc;
  }, {});

  const formattedResult = Object.values(groupedListings);
  console.log("Formatted result:", formattedResult);

  return formattedResult;
};

export default {
  CreateSendBirdUser,
};
