import Decree from "../models/Decree.js";
import { formatDec } from "../services/decree.service.js";
import { getDecs as getDecsService } from "../services/index.js";

export const getDecs = (req, res) => {
  getDecsService(req.query)
    .then((data) => {
      res.status(200).send({ status: "OK", data: data });
    })
    .catch((e) => {
      res.status(400).send({ status: "FAILED", message: e });
    });
};

export const saveDec = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "No se recibieron datos." });
    return;
  }

  //formats incoming Decree using formatDec()
  const formattedDecree = formatDec(req.body);
  try {
    const savedDec = await formattedDecree.save();
    res.status(201).send(savedDec);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Algo salió mal durante la creación",
    });
  }
};

export const findDecById = async (req, res) => {
  const decId = req.params.id;
  const decree = await Decree.findById(decId).exec();
  res.json(decree);
};

export const deleteDecById = async (req, res) => {
  const decId = req.params.id;
  const r = await Decree.deleteOne({ _id: decId });
  console.log("res", r);
  // res.json(res);
};
