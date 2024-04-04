import Decree from "../models/Decree.js";
import { getDecs as getDecsService, formatDecree } from "../services/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getDecs = asyncHandler(async (req, res) => {
  const allDecs = await getDecsService(req.query);
  return res.status(200).send({ status: "OK", data: allDecs });
});

export const saveDec = asyncHandler(async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ status: "FAILED", message: "No data received." });
  }

  //formats incoming Decree using formatDec()
  const formattedDecree = formatDecree(req.body);
  const savedDec = await formattedDecree.save();
  return res.status(201).send({ status: "OK", dec: savedDec });
});

export const findDec = asyncHandler(async (req, res) => {
  const decId = req.params.id;
  const dec = await Decree.findById(decId);
  return res.status(200).json({ status: "OK", dec: dec });
});

export const deleteDec = asyncHandler(async (req, res) => {
  const decId = req.params.id;
  const dec = await Decree.findByIdAndDelete(decId);
  return res.status(200).json({ status: "OK", dec: dec });
});

export const updateDec = asyncHandler(async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ status: "FAILED", message: "No data received." });
  }

  const id = req.params.id;
  const updatedDoc = await Decree.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return res.status(200).send({ status: "OK", dec: updatedDoc });
});
