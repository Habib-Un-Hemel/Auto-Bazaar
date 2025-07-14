import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import PropTypes from "prop-types";

function Pricing({ bikeDetail }) {
  // Format price with commas
  const formattedPrice = bikeDetail?.sellingPrice
    ? Number(bikeDetail.sellingPrice).toLocaleString()
    : "Contact for pricing";

  return (
    <div className="p-10 rounded-xl border shadow-md">
      <h2>Our Price</h2>
      <h2 className="font-bold text-4xl">
        {bikeDetail?.sellingPrice ? `$${formattedPrice}` : formattedPrice}
      </h2>
      <Button className="w-full mt-7" size="lg">
        <MdOutlineLocalOffer className="mr-2" /> Make an Offer
      </Button>
    </div>
  );
}

Pricing.propTypes = {
  bikeDetail: PropTypes.shape({
    sellingPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default Pricing;
