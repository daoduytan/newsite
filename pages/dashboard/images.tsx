import { useEffect } from "react";

const CLOUDINARY_CLOUD_NAME = "db3l6twiw";
const CLOUDINARY_API_KEY = "889371118911721";
const CLOUDINARY_API_SECRET = "LrnhstX4VOewnnJ5C01hdHQM7m4";

export default function ImagesPage() {
  useEffect(() => {
    async function load() {
      const url = `https://${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image`;
      // const results = await fetch(
      //   `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image`,
      //   {
      //     headers: {
      //       Authorization: `Basic ${Buffer.from(
      //         CLOUDINARY_API_KEY + ":" + CLOUDINARY_API_SECRET
      //       ).toString("base64")}`,
      //     },
      //   }
      // )
      const results = await fetch(url).then((r) => r.json());

      console.log({ results });
    }

    // load();
  }, []);
  return <div>Images</div>;
}
