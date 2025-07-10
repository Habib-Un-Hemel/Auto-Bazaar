import Header from "@/components/Header";
import { useEffect, useState } from "react";
import carDetails from "./../Shared/carDetails.json";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import { Separator } from "@/components/ui/separator";
import features from "./../Shared/features.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
import TextAreaField from "./components/TextAreaField";
import IconField from "./components/IconField";
import UploadImages from "./components/UploadImages";
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { eq } from "drizzle-orm";
import { FormatResult } from "@/Shared/Service";

// import { fa } from "@faker-js/faker/.";

function AddListing() {
  const [formData, setFormData] = useState([]);
  const [featuresData, setFeatureData] = useState([]);
  const [triggerUploadImages, setTriggerUploadImages] = useState();

  useEffect(() => {
    console.log("triggerUploadImages changed:", triggerUploadImages);
  }, [triggerUploadImages]);
  const [searchParams] = useSearchParams();
  const [carInfo, SetCarInfo] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    if (mode == "edit") {
      GetListingDetail();
    }
  }, []);

  const GetListingDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, recordId));
    const resp = FormatResult(result);
    console.log("Listing Details:", resp);
    SetCarInfo(resp[0]);
    setFormData(resp[0]);
    setFeatureData(resp[0]?.features);
  };

  // used to save capture user input from form

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData); // This will log stale state!
  };

  // used to save selected Feature List
  const handleFeatureChange = (name, value) => {
    setFeatureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(featuresData); // This will log stale state!
  };

  const onSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    toast("please wait....");

    if (mode == "edit") {
      const result = await db
        .update(CarListing)
        .set({
          ...formData,
          features: featuresData,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          userImageUrl: user?.imageUrl,
          postedOn: moment().format("DD/MM/YYYY"),
        })
        .where(eq(CarListing.id, recordId))
        .returning({ id: CarListing.id });
      console.log("Data updated successfully:", result);
      navigate("/profile");
      setLoader(false);
    } else {
      try {
        const result = await db
          .insert(CarListing)
          .values({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: moment().format("DD/MM/YYYY"),
          })
          .returning({ id: CarListing.id });
        if (result) {
          console.log("Data inserted successfully:", result);
          setTriggerUploadImages(result[0]?.id);
          console.log("triggerUploadImages set to:", result[0]?.id);
          setLoader(false);
        }
      } catch (e) {
        console.error("Error inserting data:", e);
      }
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Your submission logic
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10" onSubmit={onSubmit}>
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm">
                    <IconField icon={item?.icon} />
                    {item?.label}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>
                  {item.fieldType === "text" || item.fieldType === "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType === "dropdown" ? (
                    <DropdownField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType === "textarea" ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                      className="w-full"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />
          {/* feature list  */}

          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                    }
                    checked={featuresData?.[item.name]}
                  />
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* car images */}
          <Separator className="my-6" />
          <UploadImages
            triggerUploadImages={triggerUploadImages}
            carInfo={carInfo}
            mode = {mode}
            setLoader={(v) => {
              setLoader(v);
              navigate("/profile");
            }}
          />

          <div className="mt-10 flex justify-end">
            <Button disabled={loader} onClick={(e) => onSubmit(e)}>
              {!loader ? (
                "submit"
              ) : (
                <BiLoaderAlt className="animate-spin text-lg"></BiLoaderAlt>
              )}
            </Button>

            {/* <Button type="button" onClick={handleSubmit}>
              Submit
            </Button> */}
          </div>
        </form>
        {/* <UploadImages /> */}
      </div>
    </div>
  );
}

export default AddListing;
