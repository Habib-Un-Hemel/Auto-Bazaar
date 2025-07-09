import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { CarImages, CarListing } from "./../../../configs/schema";
import { db } from "./../../../configs";
import { desc, eq } from "drizzle-orm";
import { FormatResult } from "../../../src/Shared/Service";
import CarItem from "@/components/CarItem";
import { FaTrashAlt } from "react-icons/fa";

function MyListing() {
  const { user } = useUser();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetUserCarListing();
    }
  }, [user]);

  const GetUserCarListing = async () => {
    try {
      setLoading(true);
      const result = await db
        .select({
          carLisiting: CarListing,
          carImages: CarImages,
        })
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(
          eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(CarListing.id));

      const formattedResults = FormatResult(result);
      console.log("Formatted Results:", formattedResults);
      setListings(formattedResults);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-4xl">My Listing</h2>
        <Link to="/add-listing">
          <Button>+ Add New Listing</Button>
        </Link>
      </div>

      {/* listings = carList */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-7">
        {listings.map((item, index) => (
          <div key={index}>
            <CarItem car={item} />
            <div className="p-2 flex bg-gray-50 justify-between items-center gap-3">
              <Button variant="outline" className="w-full">Edit</Button>
              <Button variant="destructive"><FaTrashAlt></FaTrashAlt></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListing;

{
  /* {loading ? (
        <div>Loading...</div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="border rounded-lg p-4">
              {listing.images?.[0] && (
                <img
                  src={listing.images[0].imageUrl}
                  alt={listing.listingTitle}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
              <h3 className="mt-2 font-semibold">{listing.listingTitle}</h3>
              <p className="text-gray-600">
                {listing.make} {listing.mileage}
              </p>
              <p>{listing.mileage}</p>
              <p className="font-medium mt-2">${listing.sellingPrice}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No listings found. Create your first listing!
        </div>
      )} */
}
