import BikeSpecification from "@/Shared/BikeSpecification";
import IconField from "@/add-listing/components/IconField";
import PropTypes from "prop-types";

function Specification({ bikeDetail }) {
  console.log("Bike detail in Specification:", bikeDetail);

  return (
    <div className="p-10 rounded-xl border shadow-md mt-7">
      <h2 className="font-medium text-2xl">Specifications</h2>

      {bikeDetail ? (
        BikeSpecification?.map((item, index) => (
          <div key={index} className="mt-5 flex items-center justify-between">
            <h2 className="flex gap-2">
              <IconField icon={item?.icon} />
              {item.name}
            </h2>
            <h2>
              {bikeDetail?.[item?.field] || bikeDetail?.[item?.name] || "N/A"}
            </h2>
          </div>
        ))
      ) : (
        <div className="w-full h-[500px] bg-stone-200 animate-pulse rounded-xl"></div>
      )}
    </div>
  );
}

Specification.propTypes = {
  bikeDetail: PropTypes.object,
};

export default Specification;
