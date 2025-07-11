import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable("carLisiting", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle"),
  tagline: varchar("tagline"),
  originalPrice: varchar("originalPrice"),
  sellingPrice: varchar("sellingPrice").notNull(),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  // type: varchar("type").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: varchar("year").notNull(),
  driveType: varchar("driveType"),
  transmission: varchar("transmission"),
  fuelType: varchar("fuelType").notNull(),
  mileage: varchar("mileage").notNull(),
  engineSize: varchar("engineSize"),
  cylinder: varchar("cylinder"),
  color: varchar("color").notNull(),
  door: varchar("door"),
  offerType: varchar("offerType"),
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

export const CarImages = pgTable("carImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  carListingId: integer("carListingId")
    .notNull()
    .references(() => CarListing.id),
});
