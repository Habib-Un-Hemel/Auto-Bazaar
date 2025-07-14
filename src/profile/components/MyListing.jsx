import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { db } from "../../../configs";
import { desc, eq } from "drizzle-orm";
import { BikeImages, BikeListing } from "../../../configs/schema";
import { FormatResult } from "@/Shared/Service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

function MyListing() {
  const { user } = useUser();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (user) {
      getUserBikeListings();
    }
  }, [user]);

  useEffect(() => {
    if (searchParams.get("refresh") === "true") {
      getUserBikeListings();
      searchParams.delete("refresh");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  const getUserBikeListings = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(BikeListing)
        .leftJoin(BikeImages, eq(BikeListing.id, BikeImages.bikeListingId))
        .where(
          eq(BikeListing.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(BikeListing.id));

      const formattedResults = FormatResult(result);
      console.log("My listings:", formattedResults);
      setListings(formattedResults);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (listing) => {
    // Store the current listing data in localStorage to pre-fill the form
    localStorage.setItem("editBikeData", JSON.stringify(listing));
    // Navigate to the edit page with mode=edit query param
    navigate(`/add-listing?id=${listing.id}&mode=edit`);
  };

  const handleDelete = async () => {
    if (!listingToDelete) return;

    try {
      // First delete the associated images
      await db
        .delete(BikeImages)
        .where(eq(BikeImages.bikeListingId, listingToDelete.id));

      // Then delete the listing itself
      await db
        .delete(BikeListing)
        .where(eq(BikeListing.id, listingToDelete.id));

      // Update the listings state
      setListings(
        listings.filter((listing) => listing.id !== listingToDelete.id)
      );

      toast.success("Listing deleted successfully");
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing");
    } finally {
      setDeleteDialogOpen(false);
      setListingToDelete(null);
    }
  };

  const confirmDelete = (listing) => {
    setListingToDelete(listing);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl">My Listings</h2>
        <Button onClick={() => navigate("/add-listing")}>
          + Add New Listing
        </Button>
      </div>

      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center text-gray-500 mt-8 min-h-[200px] flex flex-col items-center justify-center">
          <p className="text-xl font-medium mb-4">No listings found</p>
          <Button onClick={() => navigate("/add-listing")}>
            Create Your First Listing
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
          {listings.map((item, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div
                className="h-48 bg-center bg-cover"
                style={{
                  backgroundImage:
                    item.images && item.images.length > 0
                      ? `url(${item.images[0].imageUrl})`
                      : "url(/placeholder-bike.jpg)",
                }}
              ></div>
              <div className="p-4">
                <h3 className="font-bold text-lg truncate">{item.listingTitle}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {item.make} {item.model}, {item.year}
                </p>
                <p className="font-bold text-lg">
                  ${Number(item.sellingPrice || 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 flex bg-gray-50 justify-between items-center gap-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleEdit(item)}
                >
                  <FaRegEdit className="mr-2" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => confirmDelete(item)}
                >
                  <MdDelete />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              listing "
              {listingToDelete?.title ||
                listingToDelete?.make + " " + listingToDelete?.model}
              " and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default MyListing;
