import Header from "@/components/Header";
import { useEffect, useState } from "react";
import DetailHeader from "../components/DetailHeader";
import { useParams } from "react-router";
import { db } from "./../../../configs";
import { CarImages, CarListing } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import { FormatResult } from "@/Shared/Service";
import ImageGallery from "../components/ImageGallery";
import Description from "../components/Description";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Specification from "../components/Specification";
import OwnersDetail from "../components/OwnersDetail";

function ListingDetail() {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState();

  useEffect(() => {
    GetCarDetail();
  }, []);

  const GetCarDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, id));

    const resp = FormatResult(result);
    setCarDetail(resp[0]);
  };

  return (
    <div>
      <Header></Header>

      {/* header Detail Component */}
      <div className="p-10 md:px-20">
        <DetailHeader carDetail={carDetail} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {/* left */}
          <div className="md:col-span-2">
            {/* immage galler */}
            <ImageGallery carDetail={carDetail} />
            {/* discritpiom */}
            <Description carDetail={carDetail}> </Description>
            {/* feature list */}
            <Features features={carDetail?.features}></Features>
          </div>

          {/* right */}
          <div>
            {/* priceig */}
            <Pricing carDetail={carDetail}></Pricing>

            {/* car speficiation */}
            <Specification carDetail={carDetail}></Specification>

            {/* owmder details */}
            <OwnersDetail carDetail={carDetail}></OwnersDetail>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetail;
