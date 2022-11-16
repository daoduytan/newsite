import type { ResponseData } from "@/types/response";
import { Category } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";
import { categoryService } from "services/dashboard.service/category.service";

async function categoriesRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Array<Category>>>
) {
  try {
    const categories = await categoryService.all();

    res.status(StatusCodes.OK).json({ data: categories, status: true });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error: { message: (error as Error).message } });
  }
}

export default categoriesRoute;
