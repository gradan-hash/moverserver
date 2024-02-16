import mongoose from "mongoose";
import Items from "../../models/providers/Provideritems.js";
import createError from "../../utils/createError.js";

export const createProducts = async (req, res, next) => {
  const newItems = new Items({
    ...req.body,
  });

  try {
    const savedItems = await newItems.save();
    res.status(200).json(savedItems);
  } catch (err) {
    next(err);
  }
};

export const singleProducts = async (req, res, next) => {
  try {
    const items = await Items.findById(req.params.id);
    if (!items) return next(createError("Product not found", 404));

    res.status(200).send(Items);
  } catch (err) {
    next(err);
  }
};

export const deleteProducts = async (req, res, next) => {
  try {
    const items = await Items.findById(req.params.id);

    if (!items) return next(createError(403, "sorry"));

    await items.findByIdAndDelete(req.params.id);
    res.status(200).send("Items has been deleted");
  } catch (err) {
    next(err);
  }
};

export const updateProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const item = await Items.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!item) return next(createError(404, "item not found"));

    res.status(200).json({ message: "item has been updated", item });
  } catch (err) {
    next(err);
  }
};

export const searchProducts = async (req, res, next) => {
  try {
    console.log(req.query);
    console.log(req.params);
    const { searchTerm } = req.params;

    // Check if searchTerm is valid
    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json({ message: "Search term is required." });
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Fetch all products
    const allItems = await Items.find().sort({ createdAt: -1 });

    // Filter Items based on the case-insensitive search term, matching title, description, or category
    const filteredItems = allItems.filter((product) => {
      const lowerCaseTitle = product.title && product.title.toLowerCase();
      const lowerCaseDescription =
        product.description && product.description.toLowerCase();
      const lowerCaseCategory =
        product.category && product.category.toLowerCase();

      return (
        (lowerCaseTitle && lowerCaseTitle.includes(lowerCaseSearchTerm)) ||
        (lowerCaseDescription &&
          lowerCaseDescription.includes(lowerCaseSearchTerm)) ||
        (lowerCaseCategory && lowerCaseCategory.includes(lowerCaseSearchTerm))
      );
    });

    res.status(200).json(filteredItems);
  } catch (error) {
    console.error("Error in searchItems:", error);
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    console.log(req.params);
    const sortBy = req.params.sortby;

    // Get all products
    let items = await Items.find();

    // Check the sortBy parameter
    if (sortBy === "highestPrice") {
      items.sort((a, b) => b.price - a.price);
    } else if (sortBy === "lowestPrice") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "latest") {
      items.sort((a, b) => b.createdAt - a.createdAt);
    }

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};
