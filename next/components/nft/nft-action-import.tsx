import { useEffect, useState } from "react";
import { classNames } from "../../lib/helpers/design";

import NextIcon from "../../components-shared/next-icon";
import { Button } from "../../components-shared/shared/utilities/form/button";
import { Upload } from "antd";
import { UploadHelper } from "../../lib/helpers/upload.helper";
import { getUserToken } from "../../lib/modules/user/user.model";
import { setLoading } from "../../redux/actions/loading.action";
import { useDispatch } from "../../redux/store";
import ModalImportNfts from "./modal-import-nfts";
import _ from "lodash";

const NftActionImport = ({ loadData }: { loadData: () => void }) => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [DNAlist, setDNAList] = useState<any>();
  const [DNAImgList, setDNAImgList] = useState<any>();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [listJson, setListJson] = useState<string>();
  const openModal = () => {
    setOpen(true);
    setLoading(false)(dispatch);
  };

  const turnOffModal = () => {
    setOpen(false);
    setDNAList(null);
    setDNAImgList(null);
    setListJson(null);
  };

  const beforeUpload = (file) => {
    setFileList((prev) => [...prev, file]);
  };

  useEffect(() => {
    if (fileList.length > 0) {
      setLoading(true)(dispatch);
      const token = getUserToken(false);
      const nftImages = [];
      const dnaList = [];
      for (const file of fileList) {
        // console.log("file.type", file);
        if (
          file.type === "application/json" &&
          file.webkitRelativePath.includes("Erc721_metadata")
        ) {
          file.text().then((res) => {
            dnaList.push(JSON.parse(res));
          });
        }

        if (file.type === "image/jpeg" && file.webkitRelativePath.includes("Images")) {
          nftImages.push(file);
        }
      }
      // console.log("nftImages", nftImages);
      // console.log("dnaList", dnaList);
      setDNAList(dnaList);
      if (nftImages.length > 0) {
        UploadHelper.uploadNftFiles({ token, files: nftImages }).then((data) => {
          // console.log("data", data);
          setDNAImgList(data.urls);
        });
      }
    }
  }, [fileList]);

  useEffect(() => {
    if (DNAlist && DNAImgList) {
      if (DNAlist.length === DNAImgList.length) {
        // console.log("DNAlist", DNAlist);
        // console.log("DNAImgList", DNAImgList);
        const list = DNAlist.map((item) => {
          const name: string = item.name;
          item.image_url = DNAImgList.find((img: string) =>
            img.includes(name.toLowerCase().toString())
          );
          return item;
        });

        setListJson(JSON.stringify(_.uniqBy(list, "name")));
        openModal();
        // console.log("list", list);
        setDNAList(null);
        setDNAImgList(null);
      }
    }
  }, [DNAImgList, DNAlist]);

  // console.log("DNAlist", DNAlist);

  return (
    <>
      <Upload directory beforeUpload={beforeUpload} showUploadList={false} multiple>
        <Button
          className={classNames(
            "w-8 h-9 rounded outline-none focus:outline-none",
            "mr-1 mb-1 ease-linear transition-all duration-150",
            "bg-primary-dark"
          )}
          outline
          icon={<NextIcon name="FcUpload" className="text-xl" />}
        />
      </Upload>
      {open && listJson && (
        <ModalImportNfts
          turnOffModal={turnOffModal}
          listJson={listJson}
          open={open}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftActionImport;
