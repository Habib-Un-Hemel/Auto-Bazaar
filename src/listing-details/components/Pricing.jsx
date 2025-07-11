import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import PropTypes from 'prop-types';

function Pricing({ carDetail }) {
  return (
    <div className="p-10 rounded-xl border shadow-md">
      <h2>Our Price</h2>
      <h2 className="font-bold text-4xl">${carDetail?.sellingPrice}</h2>
      <Button className="w-full mt-7" size="lg">
        {" "}
        <MdOutlineLocalOffer className="mr-2" /> Make an Offer
      </Button>
    </div>
  );
}
// Pricing.propTypes = {
//   carDetail: PropTypes.shape({
//     sellingPrice: PropTypes.number.isRequired
//   }).isRequired
// };

export default Pricing;
 