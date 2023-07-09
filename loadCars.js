const fsSync = require("fs");
const csv = require("csvtojson");

const loadCars = async () => {
  //Load the csv
  let newData = await csv().fromFile("data.csv");

  newData = newData.map((item, index) => ({
    make: item.Make,
    model: item.Model,
    release_date: parseInt(item.Year),
    transmission_type: item["Transmission Type"],
    size: item["Vehicle Size"],
    style: item["Vehicle Style"],
    price: parseInt(item.MSRP),
    isDeleted: false,
  }));

  //Write data to json
  let data = JSON.parse(fsSync.readFileSync("cars.json"));
  data.cars = newData;
  fsSync.writeFileSync("cars.json", JSON.stringify(data));
};

loadCars();
