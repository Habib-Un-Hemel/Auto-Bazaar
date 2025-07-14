import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "../../configs";
import { BikeListing, BikeImages } from "../../configs/schema";
import { FormatResult } from "@/Shared/Service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import { desc, eq, or, like, ilike } from "drizzle-orm"; // Added or, like, ilike for better filtering
import { FaChartLine } from "react-icons/fa";

const features = [
  "Anti-lock Braking System (ABS)",
  "LED Headlights",
  "Digital Instrument Cluster",
  "USB Charging",
  "Bluetooth Connectivity",
  "Tubeless Tires",
  "Adjustable Suspension",
  "Riding Modes",
  "Slipper Clutch",
  "Quick Shifter",
  "Traction Control",
  "Mobile App Connectivity",
  "Navigation System",
  "Storage Compartments",
  "Passenger Seat",
  "Backrest",
  "Adjustable Windshield",
  "Heated Grips",
  "Cruise Control",
  "Side Stand Sensor",
];

function BikePricePrediction() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBike, setSelectedBike] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [originalPrice, setOriginalPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState("good");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [formattedCondition, setFormattedCondition] = useState("");
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [noBikesFound, setNoBikesFound] = useState(false);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      setLoading(true);

      // First, try to get all used bikes with various condition formats
      const result = await db
        .select()
        .from(BikeListing)
        .leftJoin(BikeImages, eq(BikeListing.id, BikeImages.bikeListingId))
        .where(
          or(
            ilike(BikeListing.condition, "%used%"),
            ilike(BikeListing.condition, "%second%hand%"),
            ilike(BikeListing.condition, "%pre-owned%"),
            ilike(BikeListing.condition, "%preowned%")
          )
        )
        .orderBy(desc(BikeListing.id));

      let formattedResults = FormatResult(result);

      // If no used bikes found, get all bikes
      if (formattedResults.length === 0) {
        console.log("No used bikes found, fetching all bikes");
        const allBikesResult = await db
          .select()
          .from(BikeListing)
          .leftJoin(BikeImages, eq(BikeListing.id, BikeImages.bikeListingId))
          .orderBy(desc(BikeListing.id));

        formattedResults = FormatResult(allBikesResult);

        if (formattedResults.length === 0) {
          setNoBikesFound(true);
        }
      }

      // Log the results for debugging
      console.log(`Found ${formattedResults.length} bikes`);
      if (formattedResults.length > 0) {
        console.log(
          "Sample bike conditions:",
          formattedResults.slice(0, 5).map((b) => b.condition)
        );
      }

      setBikes(formattedResults);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBikeSelection = (bikeId) => {
    console.log("Selected bike ID:", bikeId);
    const bike = bikes.find((b) => b.id === parseInt(bikeId));
    console.log("Found bike:", bike);
    setSelectedBike(bike);

    if (bike) {
      setOriginalPrice(bike.originalPrice || bike.sellingPrice || "");
      setYear(bike.year || new Date().getFullYear());
      setMileage(bike.mileage || "");

      // Parse features if they exist
      if (bike.features) {
        let bikeFeatures = [];
        if (typeof bike.features === "string") {
          bikeFeatures = bike.features.split(",").map((f) => f.trim());
        } else if (Array.isArray(bike.features)) {
          bikeFeatures = bike.features;
        }
        setSelectedFeatures(bikeFeatures);
      } else {
        setSelectedFeatures([]);
      }

      // Map condition to our prediction options
      const bikeCondition = (bike.condition || "").toLowerCase();

      if (
        bikeCondition.includes("excellent") ||
        bikeCondition.includes("like new")
      ) {
        setCondition("excellent");
        setFormattedCondition("Excellent");
      } else if (bikeCondition.includes("good")) {
        setCondition("good");
        setFormattedCondition("Good");
      } else if (
        bikeCondition.includes("fair") ||
        bikeCondition.includes("average")
      ) {
        setCondition("fair");
        setFormattedCondition("Fair");
      } else if (
        bikeCondition.includes("poor") ||
        bikeCondition.includes("bad")
      ) {
        setCondition("poor");
        setFormattedCondition("Poor");
      } else {
        // Default for used bikes
        setCondition("good");
        setFormattedCondition("Good");
      }
    }
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const calculateAge = (year) => {
    const currentYear = new Date().getFullYear();
    return currentYear - parseInt(year);
  };

  const predictPrice = () => {
    if (!selectedBike) {
      alert("Please select a bike first");
      return;
    }

    // Base price calculation
    let basePrice = originalPrice ? parseFloat(originalPrice) : 10000;
    const bikeAge = calculateAge(year);

    // Depreciation factors
    const ageFactor = 0.85 ** bikeAge; // 15% depreciation per year
    const mileageFactor = 1 - Math.min(parseFloat(mileage) / 100000, 0.7); // max 70% depreciation for mileage

    // Condition factor
    let conditionFactor = 1;
    switch (condition) {
      case "excellent":
        conditionFactor = 1.1;
        break;
      case "good":
        conditionFactor = 1;
        break;
      case "fair":
        conditionFactor = 0.8;
        break;
      case "poor":
        conditionFactor = 0.6;
        break;
    }

    // Features factor - more modern features increase value
    const featuresFactor = 1 + Math.min(selectedFeatures.length, 15) * 0.01; // Each feature adds 1% up to 15%

    // Market adjustment - current market conditions
    const marketAdjustment = 1.05; // 5% market adjustment for current demand

    // Calculate predicted price
    const calculatedPrice =
      basePrice *
      ageFactor *
      mileageFactor *
      conditionFactor *
      featuresFactor *
      marketAdjustment;

    console.log("Price calculation:", {
      basePrice,
      bikeAge,
      ageFactor,
      mileage,
      mileageFactor,
      condition,
      conditionFactor,
      featureCount: selectedFeatures.length,
      featuresFactor,
      marketAdjustment,
      calculatedPrice,
    });

    // Round to nearest hundred
    const roundedPrice = Math.round(calculatedPrice / 100) * 100;
    setPredictedPrice(roundedPrice);

    // Set price range (±5%)
    const minPrice = Math.round((roundedPrice * 0.95) / 100) * 100;
    const maxPrice = Math.round((roundedPrice * 1.05) / 100) * 100;
    setPriceRange({ min: minPrice, max: maxPrice });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 mt-20">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <FaChartLine className="mr-2 text-primary" /> Bike Price Prediction
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6">
              Find Your Bike's Value
            </h2>

            <div className="space-y-6">
              {/* Bike Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Your Bike
                </label>
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                    <span className="ml-2">Loading bikes...</span>
                  </div>
                ) : noBikesFound ? (
                  <div className="text-center py-4 border rounded-md bg-gray-50">
                    <p className="text-gray-600">
                      No bikes found in the database.
                    </p>
                  </div>
                ) : (
                  <Select onValueChange={handleBikeSelection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a bike" />
                    </SelectTrigger>
                    <SelectContent>
                      {bikes.map((bike) => (
                        <SelectItem key={bike.id} value={bike.id.toString()}>
                          {bike.make} {bike.model} ({bike.year}) -{" "}
                          {bike.condition || "Used"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {selectedBike && (
                <>
                  {/* Bike Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Original Price ($)
                      </label>
                      <Input
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="Original price when new"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Year
                      </label>
                      <Input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Manufacturing year"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Mileage (km)
                      </label>
                      <Input
                        type="number"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                        placeholder="Current mileage"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Condition
                      </label>
                      <Select
                        value={condition}
                        onValueChange={(val) => {
                          setCondition(val);
                          setFormattedCondition(
                            val.charAt(0).toUpperCase() + val.slice(1)
                          );
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Features - Using a simple dropdown alternative */}
                  <div className="w-full border-b">
                    <button
                      type="button"
                      className="flex justify-between items-center w-full py-4 text-left text-base font-medium"
                      onClick={() => setFeaturesOpen(!featuresOpen)}
                    >
                      <span>Features ({selectedFeatures.length} selected)</span>
                      <span>{featuresOpen ? "▲" : "▼"}</span>
                    </button>

                    {featuresOpen && (
                      <div className="pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          {features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                id={feature}
                                className="h-4 w-4 rounded border-gray-300"
                                checked={selectedFeatures.includes(feature)}
                                onChange={() => toggleFeature(feature)}
                              />
                              <label
                                htmlFor={feature}
                                className="text-sm cursor-pointer"
                              >
                                {feature}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full py-6 text-lg"
                    onClick={predictPrice}
                  >
                    Calculate Value
                  </Button>
                </>
              )}

              {loading && (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            {predictedPrice ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Price Estimate</h2>

                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Recommended Price Range
                  </p>
                  <div className="text-3xl font-bold text-primary">
                    ${priceRange.min.toLocaleString()} - $
                    {priceRange.max.toLocaleString()}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Based on:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">Make:</div>
                    <div className="font-medium">{selectedBike.make}</div>

                    <div className="text-gray-600">Model:</div>
                    <div className="font-medium">{selectedBike.model}</div>

                    <div className="text-gray-600">Year:</div>
                    <div className="font-medium">
                      {year} ({calculateAge(year)} years old)
                    </div>

                    <div className="text-gray-600">Mileage:</div>
                    <div className="font-medium">{mileage} km</div>

                    <div className="text-gray-600">Condition:</div>
                    <div className="font-medium">{formattedCondition}</div>

                    <div className="text-gray-600">Features:</div>
                    <div className="font-medium">
                      {selectedFeatures.length} selected
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-gray-500">
                    This estimate is based on market data, vehicle condition,
                    features, and current demand. Actual selling price may vary
                    depending on negotiation and other factors.
                  </p>
                </div>
              </div>
            ) : selectedBike ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">
                  Ready for Valuation
                </h3>
                <p className="text-gray-500">
                  Click "Calculate Value" to see your bike's estimated price
                  range.
                </p>
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">
                  Get Your Bike's Value
                </h3>
                <p className="text-gray-500">
                  Select a bike to get started with the valuation process.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BikePricePrediction;
