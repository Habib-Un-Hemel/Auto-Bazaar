import { Link } from "react-router-dom";
import { BikeCategories } from "@/Shared/Data"; // Make sure to rename this import

function Category() {
  // Add a check to ensure BikeCategories exists
  if (!BikeCategories || !Array.isArray(BikeCategories)) {
    console.error("BikeCategories is undefined or not an array");
    return (
      <div className="text-center my-8">
        <p>Categories unavailable at the moment</p>
      </div>
    );
  }

  return (
    <div className="mx-8 md:mx-24 mb-25 pt-9 ">
      <h2 className="font-bold text-3xl text-center mt-20 mb-7">
        Browse By Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-10">
        {BikeCategories.map((item, index) => (
          <Link to={`/search/${item.category}`} key={index}>
            <div className="p-2 cursor-pointer hover:scale-105 transition-all">
              <img
                src={item.image}
                width={200}
                height={100}
                className="rounded-xl"
                alt={item.category}
              />
              <h2 className="font-medium text-center mt-2">{item.category}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
