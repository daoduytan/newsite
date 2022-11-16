import { checkPassword } from "@/helps/password";
import prisma from "@/lib/prisma";
import { ResponseData } from "@/types/response";
import { UserResponse } from "@/types/user";
import { StatusCodes } from "http-status-codes";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { omit } from "lodash/fp";
import { NextApiRequest, NextApiResponse } from "next";

async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<UserResponse | null>>
) {
  const { username, password } = await req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: false,
        error: {
          message: "User not found",
        },
      });
      return;
    }

    const passwordValid = await checkPassword(user.password, password);

    if (!passwordValid) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: false,
        error: {
          message: "User not found",
        },
      });
      return;
    }

    const userResponse = omit(["password"], user);

    req.session.user = userResponse;
    await req.session.save();

    res.status(StatusCodes.OK).json({ data: userResponse, status: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: { message: (error as Error).message }, status: false });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
