import type { ResponseData } from "@/types/response";
import { Page } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";
import { pageService } from "services/dashboard.service";

async function pagesRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Array<Page>>>
) {
  try {
    const pages = await pageService.all();

    res.status(StatusCodes.OK).json({ data: pages, status: true });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error: { message: (error as Error).message } });
  }
}

export default pagesRoute;
