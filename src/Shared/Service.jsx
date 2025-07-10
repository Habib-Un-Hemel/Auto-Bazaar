import { CarImages } from "./../../configs/schema";

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
