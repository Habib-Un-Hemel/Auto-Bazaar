import Header from "@/components/Header";
import Search from "@/components/Search";
import { useParams } from "react-router-dom";
import { db } from "./../../../configs";
import { CarImages } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import { FormatResult } from "@/Shared/Service";
import { useEffect, useState } from "react";
import { CarListing } from "./../../../configs/schema";
import CarItem from "@/components/CarItem";

function SearchByCategory() {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    if (!category) {
      console.error("Category is not defined");
      return;
    }
    GetCarList();
  }, []);

  const GetCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.category, category));
    const resp = FormatResult(result);
    setCarList(resp);

    //   console.log("Result:", resp);
  };

  return (
    <div>
      <Header />
      <div className="p-10 bg-black flex justify-center">
        <Search />
      </div>
      <div>
        <h2 className="font-bold text-4xl p-10 md:px-20">{category}</h2>

        {/* list of the car
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-10 md:px-20">
          {carList.map((item, index) => (
            <div key={index}>
              <CarItem car={item}></CarItem>
            </div>
          ))}
        </div> */}

        {/* List of CarList */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
          {carList?.length > 0
            ? carList.map((item, index) => (
                <div key={index}>
                  <CarItem car={item} />
                </div>
              ))
            : [1, 2, 3,4].map((item, index) => (
                <div
                  key={index}
                  className="h-[370px] rounded-xl bg-slate-200 animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default SearchByCategory;
