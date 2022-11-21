import { postService } from "@/services/dashboard.service";
import type { ResponseData } from "@/types/response";
import { Post } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

async function postsRoute(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData<Array<Post>>>
) {
  try {
    const posts = await postService.all();

    res.status(StatusCodes.OK).json({ data: posts, status: true });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error: { message: (error as Error).message } });
  }
}

export default postsRoute;
