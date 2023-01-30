import { NextApiRequest, NextApiResponse } from "next";

import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import z from "zod";
import cookie from "cookie";

import { getJWTSecretKey } from "lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = schema.parse(req.body);

    console.log(email, password, process.env.ADMIN_EMAIL);

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      //user logged in succesfully
      console.log("success");

      //Sign JWT
      const jwt = await new SignJWT({ "urn:example:claim": true })
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(getJWTSecretKey()));

      //Set the cookie to the new token
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("admin-token", jwt, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
        })
      );

      return res.status(201).json({ error: "", data: "success" });
    } else {
      return res.status(400).send({
        message: `Invalid email or password`,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: `Bad payload! Make sure email and password are correct`,
    });
  }
};

export default loginHandler;
