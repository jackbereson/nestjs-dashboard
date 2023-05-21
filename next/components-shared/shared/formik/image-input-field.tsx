import { ChangeEvent, CSSProperties, MutableRefObject, useRef, useState } from "react";
import { classNames } from "../../../lib/helpers/design";
import { UploadHelper } from "../../../lib/helpers/upload.helper";
import { getUserToken } from "../../../lib/modules/user/user.model";
import { useToast } from "../../../providers/toast-provider";
import { ImageDialog } from "../utilities/dialog/image-dialog";
import MediaDialog from "../../../components/media/media-dialog";
import { Button } from "../utilities/form/button";

function ImageInputField({
  className = "",
  labelName,
  wrapperClassName = "",
  inputClassName = "",
  ...props
}: {
  labelName?: string;
  value?: any;
  placeholder?: string;
  name?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  prefix?: string;
  prefixClassName?: string;
  onChange?: (val: string) => any;

  className?: string;
  style?: CSSProperties;
  children?: any;
}) {
  const ref: MutableRefObject<HTMLInputElement> = useRef();
  const [showImage, setShowImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const toast = useToast();

  const onFileChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (files.length == 0) return;
    let file = files[0];
    try {
      setUploading(true);
      // console.log("file", file);
      const token = getUserToken(false);
      let res = await UploadHelper.uploadSingeFile({ file, token });
      props.onChange(res.url);
    } catch (err) {
      console.error(err);
      toast.error(`Upload ảnh thất bại. Xin thử lại bằng url thay vì upload.`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const [isMediaModalOpen, toggleMediaModal] = useState(false);

  return (
    <div className={className}>
      {labelName && (
        <label
          // htmlFor={inputName}
          className={classNames("font-light text-sm px-1 capitalize flex items-center")}
        >
          {labelName}
        </label>
      )}
      <div
        className={`form-input relative flex items-center focus-within:border-primary-dark group px-0 ${
          wrapperClassName || ""
        }`}
      >
        <img
          className="w-10 h-10 p-1 object-cover cursor-pointer"
          src={props.value || "/images/logo.svg"}
          onClick={() => setShowImage(props.value)}
          onError={(e) => {
            (e.target as any).src = "/images/logo.svg";
          }}
        />
        <input
          className={`flex-grow h-9 px-1 ${inputClassName || ""}`}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <div className="flex">
          <Button
            className="border-l h-9 rounded-none border-gray-300 px-2 text-xs"
            isLoading={uploading}
            text="Upload"
            onClick={() => ref.current?.click()}
          />
          <Button
            className="border-l h-9 rounded-none border-gray-300 px-2 text-xs"
            text="Choose image"
            onClick={() => toggleMediaModal(!isMediaModalOpen)}
          />
        </div>
        <input hidden type="file" multiple accept="image/*" ref={ref} onChange={onFileChanged} />
        <ImageDialog isOpen={!!showImage} image={showImage} onClose={() => setShowImage("")} />
        {isMediaModalOpen && (
          <MediaDialog
            isOpen={isMediaModalOpen}
            onClose={() => toggleMediaModal(!isMediaModalOpen)}
            onChange={props.onChange}
          />
        )}
      </div>
    </div>
  );
}

export default ImageInputField;
