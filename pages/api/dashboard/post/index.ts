import { postService } from "@/services/dashboard.service";
import type { ResponseData } from "@/types/response";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

async function postRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<any>>
) {
  const { method } = req;

  switch (method) {
    // new post
    case "POST":
      try {
        const post = await postService.add(req.body);

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
  }
}

export default postRoute;
