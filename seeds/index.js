const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Conecction Error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const c = new Campground({
      // YOUR USER ID
      author: "668455524b7ac3619cc9fe1f",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sit ullam itaque amet fuga, mollitia soluta officiis impedit temporibus minus et exercitationem quia sequi nostrum, at fugit laudantium consectetur voluptas!",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dshsn7egg/image/upload/v1720043718/YelpCamp/z3so4jfqazvghmhzaitw.jpg",
          filename: "YelpCamp/z3so4jfqazvghmhzaitw",
        },
        {
          url: "https://res.cloudinary.com/dshsn7egg/image/upload/v1720043721/YelpCamp/iqephm7vquy43ikd6vek.jpg",
          filename: "YelpCamp/iqephm7vquy43ikd6vek",
        },
      ],
    });
    await c.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
