import connectMongo from "@/utils/connectMongo";
import Motos from "@/models/Motos";
import mongoose from "mongoose";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "POST") {
      const existingMoto = await Motos.findOne({ placa: req.body.placa });
      if (!existingMoto) {
        const motos = await Motos.create({
          modelo: req.body.modelo,
          placa: req.body.placa,
          renavam: req.body.renavam,
          dono: req.body.dono,
          valor: req.body.valor,
          exp: req.body.exp,
          cor: req.body.cor,
          ano: req.body.ano,
          data: req.body.data,
          comment : req.body.comment,
          usuario: req.body.usuario,
        });
        res.json({ motos });
      } else {
        return res.status(400).json({ message: "Placa já esta cadastrada" });
      }
    } 
    if (req.method == "DELETE") {
      const deleteItem = await Motos.deleteOne({id : req.body.id})
      res.json({ message : 'moto excluida com sucesso' })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }  
  if (req.method === "GET") {
    const { id } = req.query
    const objectId = new mongoose.Types.ObjectId(id)
    const getItem = await Motos.findById(objectId)
    res.json({ message : getItem})
  } 
}

