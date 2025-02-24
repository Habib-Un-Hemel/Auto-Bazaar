import { faker } from "@faker-js/faker";
function createRandomCarList() {
  return {
    name: faker.vehicle.vehicle(),
    fuelType: faker.vehicle.fuel(),
    model: faker.vehicle.model(),
    type: faker.vehicle.type(),
    image:
      "https://www.usnews.com/object/image/0000018f-cfa8-d140-afdf-dfea657d0001/24-bmw-530i-ext1.jpg?update-time=1717175974506&size=responsiveGallery",

    miles: 1000,
    gearType: "automatic",
    price: faker.finance.amount({ min: 1000, max: 10000 }),
  };
}

const carList = faker.helpers.multiple(createRandomCarList, { count: 7 });

export default {carList};   