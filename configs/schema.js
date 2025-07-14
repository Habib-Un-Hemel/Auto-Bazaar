import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const BikeListing = pgTable("bikeListing", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle"),
  tagline: varchar("tagline"),
  originalPrice: varchar("originalPrice"),
  sellingPrice: varchar("sellingPrice").notNull(),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: varchar("year").notNull(),
  engineCapacity: varchar("engineCapacity"),
  transmission: varchar("transmission"),
  fuelType: varchar("fuelType").notNull(),
  mileage: varchar("mileage").notNull(),
  cylinder: varchar("cylinder"),
  color: varchar("color").notNull(),
  brakeType: varchar("brakeType"),
  wheelType: varchar("wheelType"),
  chassisType: varchar("chassisType"),
  vin: varchar("vin"),
  listingDescription: varchar("listingDescription").notNull(),
  features: json("features"),
  createdBy: varchar("createdBy").notNull().default("admin@example.com"),
  userName: varchar("userName").notNull().default("Hemel"),
  UserImageUrl: varchar("UserImageUrl").default(
    "https://firebasestorage.googleapis.com/v0/b/autobazar-e55c7.firebasestorage.app/o/autoBazar%2FScreenshot%202025-07-07%20at%2011.30.31%E2%80%AFPM.png?alt=media&token=87321369-7288-4959-95ad-bc68a75328c4"
  ),
  postedOn: varchar("postedOn"),
});

export const BikeImages = pgTable("bikeImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  bikeListingId: integer("bikeListingId")
    .notNull()
    .references(() => BikeListing.id),
});
