import connectMongo from "@/utils/connectMongo";
import Motos from "@/models/Motos";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "POST") {
      if (req.body.usuario) {
        const getContent = await Motos.find({ usuario: req.body.usuario });
        if (getContent.length > 0) {
          res.json({ motos: getContent });
        } else {
          res.json({ message: "Nenhuma moto cadastrada" });
        }
      } else if(req.body._id) {
        const getContent = await Motos.findOne({ _id: req.body._id });
        res.json(getContent);
      } else {
        const getContent = await Motos.find({ placa: { $regex: `^${req.body.placa}`, $options: "i" } });
        res.json({ motos: getContent });
      }
    }
    if (req.method === "PUT") {
      const editContent = await Motos.findOneAndUpdate({_id : req.body._id} , {
        modelo: req.body.modelo,
        placa: req.body.placa,
        renavam: req.body.renavam,
        dono: req.body.dono,
        valor: req.body.valor,
        exp: req.body.exp,
        cor: req.body.cor,
        anoModelo: req.body.anoModelo,
        data: req.body.data,
        comment: req.body.comment,
      });
      res.json(editContent)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}
