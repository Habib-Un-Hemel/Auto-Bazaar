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

// import axios from "axios";

// // Get the SendBird app ID from environment variables
// const SENDBIRD_APP_ID = import.meta.env.VITE_SENDBIRD_APP_ID;
// const SENDBIRD_API_TOKEN = import.meta.env.VITE_SENDBIRD_API_TOKEN;

// // Create or update a SendBird user
// export const CreateSendBirdUser = async (userIId, name, profileUrl) => {
//   if (!SENDBIRD_APP_ID) {
//     console.error("SendBird App ID is not defined in environment variables");
//     throw new Error("SendBird App ID is missing");
//   }

//   try {
//     const response = await axios.put(
//       "https://api-" + SENDBIRD_APP_ID + ".sendbird.com/v3/users",
//       {
//         user_id: userIId,
//         nickname: name,
//         profile_url: profileUrl,
//         issue_access_token: false,
//       },
//       {
//         headers: {
//           "Api-Token": SENDBIRD_API_TOKEN,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error in CreateSendBirdUser:", error);
//     throw error;
//   }
// };

// const FormatResult = (resp) => {
//   let result = {};
//   let finalResult = [];

//   resp.forEach((item) => {
//     const listingId = item.carLisiting?.id;

//     if (!result[listingId]) {
//       result[listingId] = {
//         car: item.carLisiting,
//         images: [],
//       };
//     }

//     if (item.CarImages) {
//       result[listingId].images.push(item.CarImages);
//     }
//   });

//   // Convert result object to array
//   result.forEach((item) => {
//     finalResult.push({
//       ...item.car,
//       images: item.images,
//     });
//   });
//   return finalResult;
// };

// export default { FormatResult };
export const FormatResult = (resp) => {
  if (!resp || resp.length === 0) return [];

  const groupedListings = resp.reduce((acc, item) => {
    const listingId = item.carLisiting?.id;

    if (!listingId) return acc;

    if (!acc[listingId]) {
      acc[listingId] = {
        ...item.carLisiting,
        images: [],
      };
    }

    if (item.carImages) {
      acc[listingId].images.push(item.carImages);
    }

    return acc;
  }, {});

  return Object.values(groupedListings);
};

export default {
  CreateSendBirdUser,
};
