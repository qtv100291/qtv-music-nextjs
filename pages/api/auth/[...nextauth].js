import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import fs from "fs";
import path from "path";
import hashPassword, { comparePassword } from "../../../utils/hashPassword";

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 24 * 60,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const filePath = path.join(process.cwd(), "data", "users.json");
        const fileData = fs.readFileSync(filePath);
        const data = JSON.parse(fileData);
        const hashedPassword = await hashPassword(credentials.password);
        for (let i = 0; i < data.users.length; i++) {
          if (data.users[i].email === credentials.email) {
            const isValid = await comparePassword(
              data.users[i].password,
              hashedPassword
            );
            if (isValid) {
              const userDetail = { ...data.users[i] };
              delete userDetail.password;
              return { email: credentials.email };
            } else throw new Error("Password incorrect");
          }
        }
        throw new Error("User not found");
      },
    }),
  ],
});
