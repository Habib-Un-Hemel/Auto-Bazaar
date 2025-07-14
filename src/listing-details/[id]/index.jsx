import Header from "@/components/Header";
import { useEffect, useState } from "react";
import DetailHeader from "../components/DetailHeader";
import { useParams } from "react-router";
import { db } from "./../../../configs";
import { BikeImages, BikeListing } from "./../../../configs/schema"; // Changed to bike schema
import { eq } from "drizzle-orm";
import { FormatResult } from "@/Shared/Service";
import ImageGallery from "../components/ImageGallery";
import Description from "../components/Description";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Specification from "../components/Specification";
import OwnersDetail from "../components/OwnersDetail";
import Footer from "@/components/Footer";
import Calculator from "../components/Calculator";
import MostSearchedBike from "@/components/MostSearchedBike"; // Changed to MostSearchedBike

function ListingDetail() {
  const { id } = useParams();
  const [bikeDetail, setBikeDetail] = useState(); // Changed carDetail to bikeDetail

  useEffect(() => {
    GetBikeDetail(); // Changed function name
  }, []);

  const GetBikeDetail = async () => {
    // Changed function name
    const result = await db
      .select()
      .from(BikeListing) // Changed to BikeListing
      .innerJoin(BikeImages, eq(BikeListing.id, BikeImages.bikeListingId)) // Changed to bike schema
      .where(eq(BikeListing.id, id)); // Changed to BikeListing

    const resp = FormatResult(result);
    setBikeDetail(resp[0]); // Changed to setBikeDetail
  };

  return (
    <div>
      <Header></Header>

      {/* header Detail Component */}
      <div className="p-10 md:px-20">
        <DetailHeader bikeDetail={bikeDetail} /> {/* Changed prop name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {/* left */}
          <div className="md:col-span-2">
            {/* image gallery */}
            <ImageGallery bikeDetail={bikeDetail} /> {/* Changed prop name */}
            {/* description */}
            <Description bikeDetail={bikeDetail}> </Description>{" "}
            {/* Changed prop name */}
            {/* feature list */}
            <Features features={bikeDetail?.features}></Features>
            {/* calculator */}
            <Calculator bikeDetail={bikeDetail}></Calculator>{" "}
            {/* Changed prop name */}
          </div>

          {/* right */}
          <div>
            {/* pricing */}
            <Pricing bikeDetail={bikeDetail}></Pricing>{" "}
            {/* Changed prop name */}
            {/* bike specification */}
            <Specification bikeDetail={bikeDetail}></Specification>{" "}
            {/* Changed prop name */}
            {/* owner details */}
            <OwnersDetail bikeDetail={bikeDetail}></OwnersDetail>{" "}
            {/* Changed prop name */}
          </div>
        </div>
        <MostSearchedBike></MostSearchedBike> {/* Changed component name */}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ListingDetail;
