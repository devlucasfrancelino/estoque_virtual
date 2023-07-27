import connectMongo from "@/utils/connectMongo";
import Users from "@/models/User";
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "POST") {
      const existingUser = await Users.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "Email já esta cadastrado" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const user = await Users.create({
          email: req.body.email,
          username : req.body.username,
          password: hashPassword,
        });
        res.json({ user });
      }
    } else if (req.method === "GET") {
      const user = await Users.findOne({
        email: req.query.email,
      });
      if (user) {
        const passwordMatch = bcrypt.compare(hashPassword, user.password);
        if (user.password === hashPassword) {
          res.json({ user });
          res.status(200);
        } else {
          res.status(400).json({ message: "Senha incorreta" });
        }
      } else res.status(400).json({ message: "A conta não existe" });
    } else if (req.method === "DELETE") {
      const user = await Users.deleteOne(req.body);
      res.json({ user });
    } else if (req.method === "PUT") {
      const { _id, ...updateData } = req.body;
      const user = await Users.findOneAndUpdate({ _id }, updateData, {
        new: true,
      });
      res.json({ user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}
