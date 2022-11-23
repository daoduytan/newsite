import { settingService } from "@/services/dashboard.service";
import type { ResponseData } from "@/types/response";
import { Setting } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

async function settingRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Setting>>
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const setting = await settingService.get();

        res.status(StatusCodes.OK).json({ data: setting, status: true });
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: false,
          error: { message: (error as Error).message },
        });
      }
      break;

    case "POST":
      try {
        const setting = await settingService.update(req.body);
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: false,
          error: { message: (error as Error).message },
        });
      }
      break;
  }
}

export default settingRoute;
