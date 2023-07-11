const { sendResponse, AppError } = require("../helpers/utils.js");

const Car = require("../models/Car");

const carController = {};

carController.createCar = async (req, res, next) => {
  //in real project you will getting info from req
  const { make, model, release_date, transmission_type, size, style, price } =
    req.body;

  const info = {
    make: make,
    model: model,
    release_date: release_date,
    transmission_type: transmission_type,
    size: size,
    style: style,
    price: price,
    isDeleted: false,
  };
  try {
    //always remember to control your inputs
    if (!info) throw new AppError(402, "Bad Request", "Create Car Error");
    //mongoose query
    const created = await Car.create(info);
    sendResponse(res, 200, true, { data: created }, null, "Create Car Success");
  } catch (err) {
    next(err);
  }
};

/*
carController.getCars = async (req, res, next) => {
  //validate input
  const allowedFilter = [
    "make",
    "model",
    "release_date",
    "transmission_type",
    "size",
    "style",
    "price",
    "isDeleted",
    "page",
    "limit",
  ];

  try {
    let { page, limit, ...filterQuery } = req.query;

    const filterKeys = Object.keys(filterQuery);

    //validate the filter input
    filterKeys.forEach((key) => {
      if (!allowedFilter.includes(key)) {
        const exception = new Error(`Query ${key} is not allowed`);
        exception.statusCode = 401;
        throw exception;
      }
      if (!filterQuery[key]) delete filterQuery[key];
    });

    const filter = { isDeleted: false };

    //proceed the filter input
    if (filterKeys.length) {
      filterKeys.forEach((condition) => {
        filter[condition] = filterQuery[condition];
      });
    }

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 50;

    // Calculate the number of documents to skip based on the page and limit
    const skipCount = (page - 1) * limit;

    //mongoose query
    const totalCount = await Car.find(filter).countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const listOfFound = await Car.find(filter).skip(skipCount).limit(limit);

    sendResponse(
      res,
      200,
      true,
      { data: listOfFound, total: totalPages },
      null,
      "Found list of cars success"
    );
  } catch (err) {
    next(err);
  }
};
*/

carController.getCars = async (req, res, next) => {
  //validate input
  const allowedFilter = ["search", "isDeleted", "page", "limit"];

  try {
    let { page, limit, search, ...filterQuery } = req.query;

    search = toString(search) || "";

    // Search query
    const filter = {
      $or: [
        { make: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
      ],
      isDeleted: false,
    };

    /*
    //proceed the filter input
    if (filterKeys.length) {
      filterKeys.forEach((condition) => {
        filter[condition] = filterQuery[condition];
      });
    }
    */

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 50;

    // Calculate the number of documents to skip based on the page and limit
    const skipCount = (page - 1) * limit;

    //mongoose query
    const totalCount = await Car.find(filter).countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const listOfFound = await Car.find(filter).skip(skipCount).limit(limit);

    sendResponse(
      res,
      200,
      true,
      { data: listOfFound, total: totalPages },
      null,
      "Found list of cars success"
    );
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication
  //you will also get updateInfo from req
  // empty target and info mean update nothing
  const { id } = req.params;

  const { make, model, release_date, transmission_type, size, style, price } =
    req.body;

  const updateInfo = {
    make: make,
    model: model,
    release_date: release_date,
    transmission_type: transmission_type,
    size: size,
    style: style,
    price: price,
  };

  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };

  try {
    //mongoose query
    const updated = await Car.findByIdAndUpdate(id, updateInfo, options);

    sendResponse(res, 200, true, { data: updated }, null, "Update car success");
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

  // empty target mean delete nothing
  const { id } = req.params;

  const updateInfo = {
    isDeleted: true,
  };

  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Car.findByIdAndUpdate(id, updateInfo, options);

    sendResponse(res, 200, true, { data: updated }, null, "Delete car success");
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
