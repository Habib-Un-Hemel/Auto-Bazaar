import React, { useEffect, useState } from "react";
import CarItem from "./CarItem";
import { FormatResult } from "@/Shared/Service";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarListing, CarImages } from "./../../configs/schema";
import { eq, desc } from "drizzle-orm";
import { db } from "./../../configs";

function MostSearchedCar() {
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetPopularCarList();
  }, []);

  const GetPopularCarList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .orderBy(desc(CarListing.id))
        .limit(10);

      const formattedResults = FormatResult(result);
      // console.log("Most Searched Cars:", formattedResults);
      setCarList(formattedResults);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    // <div className="mx-24 mt-60">
    <div className="mx-24 ">
      <h2 className="font-bold text-3xl text-center mt-16 mb-7">
        Most Searched Cars
      </h2>
      {carList.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {carList.map((car, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <CarItem car={car} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="text-center text-gray-500">No cars found</div>
      )}
    </div>
  );
}

export default MostSearchedCar;
