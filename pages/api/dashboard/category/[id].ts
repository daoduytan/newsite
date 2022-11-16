import { categoryService } from "@/services/dashboard.service";
import type { ResponseData } from "@/types/response";
import type { Category } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

async function categoryRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Category | null>>
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const category = await categoryService.get(query.id as string);

        res.status(StatusCodes.OK).json({
          data: category,
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
      const category = await categoryService.update(
        query.id as string,
        req.body
      );

      res.status(StatusCodes.OK).json({
        data: category,
        status: true,
      });
      break;
  }
}

export default categoryRoute;
