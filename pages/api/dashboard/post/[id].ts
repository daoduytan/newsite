import { postService } from "@/services/dashboard.service";
import type { ResponseData } from "@/types/response";
import type { Post } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

async function postRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Post | null>>
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const post = await postService.get(query.id as string);

        res.status(StatusCodes.OK).json({
          data: post,
          status: true,
        });
      } catch (error) {
        // console.log({ error });
        res.status(StatusCodes.BAD_REQUEST).json({
          error: {
            message: (error as Error).message,
          },
          status: false,
        });
      }

      break;

    case "PUT":
      console.log("dadadad");
      try {
        const post = await postService.update(query.id as string, req.body);

        res.status(StatusCodes.OK).json({
          data: post,
          status: true,
        });
      } catch (error) {
        console.log({ error });
        res.status(StatusCodes.BAD_REQUEST).json({
          error: {
            message: (error as Error).message,
          },
          status: false,
        });
      }
      break;
  }
}

export default postRoute;
