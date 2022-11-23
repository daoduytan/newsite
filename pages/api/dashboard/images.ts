import type { ResponseData } from "@/types/response";
import { Page } from "@prisma/client";
import cloudinary from "cloudinary";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

async function imagesRoute(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Array<Page>>>
) {
  try {
    const CLOUDINARY_CLOUD_NAME = "db3l6twiw";
    const CLOUDINARY_API_KEY = "889371118911721";
    const CLOUDINARY_API_SECRET = "LrnhstX4VOewnnJ5C01hdHQM7m4";
    cloudinary.v2.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.v2.api.resources({
      type: "upload",
      prefix: "samples", // add your folder
    });

    res.status(StatusCodes.OK).json({ status: true, data: result });
  } catch (error) {
    console.log({ error });
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error: { message: (error as Error).message } });
  }
}

export default imagesRoute;
