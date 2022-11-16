import prisma from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2";

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      res.status(StatusCodes.CONFLICT).json({ message: "User is exist" });
      return;
    }

    const passwordHash = await argon2.hash(password);

    await prisma.user.create({
      data: {
        username,
        password: passwordHash,
      },
    });

    res.status(StatusCodes.OK).json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false, message: (error as Error).message });
  }
}

export default registerRoute;
