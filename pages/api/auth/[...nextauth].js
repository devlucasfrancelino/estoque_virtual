import Users from "../../../models/User";
import connectMongo from "../../../utils/connectMongo";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch(error => {error: "Connection failed"});

        const result = await Users.findOne({ email: credentials.email }, { id: 1, email: 1, password: 1, username: 1 });

        if (!result) {
          throw new Error("Nenhuma conta com este email foi encontrada");
        }

        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Email ou senha incorretos");
        }

        return { image: result._id.toString(), email: result.email, name: result.username }
      },
    }),
  ],
});

