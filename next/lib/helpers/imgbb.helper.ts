import axios from "axios";
import useEnv from "../../hooks/use-env";
import { EnvKeys } from "./env.helper";

export class Imgbb {
  static async uploadImage(image): Promise<string> {
    const apiKey = useEnv(EnvKeys.imgbb);
    const data = new FormData();
    data.append("image", image);

    console.log("data", data);

    try {
      let res = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=15552000&key=${apiKey}`,
        data,
        {
          // headers: {
          //   Authorization: "Client-ID 950010defffbe12",
          // },
        }
      );
      console.log("res", res);
      return res.data.data.url;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

// edf20ed6d233a26ce4aa3552432e917c83df01d0
