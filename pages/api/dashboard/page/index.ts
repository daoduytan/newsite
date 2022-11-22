import { pageService } from "@/services/dashboard.service";
import type { ResponseData } from "@/types/response";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

async function pageRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<any>>
) {
  const { method } = req;

  switch (method) {
    // new category
    case "POST":
      try {
        const page = await pageService.add(req.body);

        res.status(StatusCodes.OK).json({
          data: page,
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

export default pageRoute;
