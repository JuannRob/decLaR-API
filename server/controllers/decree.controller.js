import Decree from "../models/Decree.js";
import { formatDec } from "../services/decree.service.js";
import { getDecs as getDecsService } from "../services/index.js";

export const getDecs = async (req, res) => {
  try {
    const allDecs = await getDecsService(req.query);
    return res.status(200).send({ status: "OK", data: allDecs });
  } catch (error) {
    return res.status(400).send({ status: "FAILED", message: e });
  }
};

export const saveDec = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ status: "FAILED", message: "No data received." });
  }

  //formats incoming Decree using formatDec()
  const formattedDecree = formatDec(req.body);
  try {
    const savedDec = await formattedDecree.save();
    return res.status(201).send({ status: "OK", dec: savedDec });
  } catch (error) {
    return res.status(500).send({ status: "FAILED", message: error.message });
  }
};

export const findDec = async (req, res) => {
  const decId = req.params.id;
  try {
    const dec = await Decree.findById(decId);
    return res.status(200).json({ status: "OK", dec: dec });
  } catch (e) {
    return res.status(400).json({ status: "FAILED", message: e });
  }
};

export const deleteDec = async (req, res) => {
  const decId = req.params.id;
  try {
    const dec = await Decree.findByIdAndDelete(decId);
    return res.status(200).json({ status: "OK", dec: dec });
  } catch (e) {
    return res.status(400).json({ status: "FAILED", message: e });
  }
};

export const updateDec = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ status: "FAILED", message: "No data received." });
  }

  const id = req.params.id;
  try {
    const updatedDoc = await Decree.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).send({ status: "OK", dec: updatedDoc });
  } catch (error) {
    return res.status(500).send({ status: "FAILED", message: error.message });
  }
};
