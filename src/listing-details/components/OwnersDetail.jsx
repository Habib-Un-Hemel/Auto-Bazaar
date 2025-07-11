import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

function OwnersDetail({ carDetail }) {
    console.log("lalaa"+ carDetail?.UserImageUrl);
  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl mb-3">Owner</h2>
      <img src={carDetail?.UserImageUrl } alt="Owner" className="w-[70px] h-[70px]" />
      <h2 className="mt-2 font-bold text-xl">{carDetail?.userName}</h2>
      <h2 className="mt-2 text-gray-500">{carDetail?.createdBy}</h2>

      <Button className="w-full mt-6">Message Owner</Button>
    </div>
  );
}

OwnersDetail.propTypes = {
  carDetail: PropTypes.shape({
    UserImageUrl: PropTypes.string,
    userName: PropTypes.string,
    createdBy: PropTypes.string,
  }),
};

export default OwnersDetail;
