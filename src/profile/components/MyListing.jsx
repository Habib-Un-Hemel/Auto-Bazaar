import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { CarImages, CarListing } from "./../../../configs/schema";
import { db } from "./../../../configs";
import { desc, eq } from "drizzle-orm";
import Service from "@/Shared/Service";

function MyListing() {
  const { user } = useUser();

  const GetUserCarListing = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(CarListing.id));

    const resp =Service.FormatResult(result);

    console.log(resp);
  };

  useEffect(() => {
    if (user) {
      GetUserCarListing();
    }
  }, [user]);

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl ">My Listing</h2>
        <Link to={"/add-listing"}>
          <Button>+ Add New Listing</Button>
        </Link>
      </div>
    </div>
  );
}

export default MyListing;
