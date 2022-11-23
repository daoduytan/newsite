import { optionService } from "@/services/dashboard.service/option.service";
import type { ResponseData } from "@/types/response";
import { Option } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

async function optionsRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Array<Option>>>
) {
  try {
    const options = await optionService.all();

    res.status(StatusCodes.OK).json({ data: options, status: true });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error: { message: (error as Error).message } });
  }
}

export default optionsRoute;
