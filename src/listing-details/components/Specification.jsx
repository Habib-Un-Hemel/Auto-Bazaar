import CarSprcification from "@/Shared/CarSprcification";
import IconField from "@/add-listing/components/IconField";

function Specification({ carDetail }) {
  console.log(carDetail);
  return (
    <div className="p-10 rounded-xl border shadow-md mt-7">
      <h2 className="font-medium text-2xl">Specifications</h2>
      {CarSprcification.map((item, index) => (
        <div key={index} className="mt-5 flex items-center justify-between">
          <h2 className="flex gap-2">
            <IconField icon={item.icon} />
            {item.name}
          </h2>
          <h2>{carDetail[item.name]}</h2>
        </div>
      ))}

         
      {/* {carDetail?.length>0&&carDetail.map((carItem,index)=>(
                <div>
                    {carDetail?.length}
                    <IconField icon={CarSpecification[index]?.icon} />
                </div>
            ))} */}
    </div>
  );
}

export default Specification;
