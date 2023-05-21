import axios from "axios";
import useEnv from "../../hooks/use-env";
import { EnvKeys } from "./env.helper";

export class UploadHelper {
  static async uploadSingeFile({ file, token }): Promise<UploadFile> {
    const url = useEnv(EnvKeys.uploadUri);
    console.log("url", url);
    const formdata = new FormData();
    formdata.append("file", file);
    // console.log("formdata", formdata);
    try {
      let res = await axios.post(`${url}/upload-file`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-token": token,
        },
      });
      // console.log("res", res);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async uploadNftFiles({ files, token }): Promise<UploadFile> {
    const url = useEnv(EnvKeys.uploadUri);
    // console.log("files", files);
    const formdata = new FormData();
    for (const key of Object.keys(files)) {
      formdata.append("files", files[key]);
    }
    // console.log("formdata", formdata);
    try {
      let res = await axios.post(`${url}/upload-nft-files`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-token": token,
        },
      });
      // console.log("res", res);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export type UploadFile = {
  message?: string;
  urls?: string[];
  url?: string;
};
