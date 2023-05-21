import { ChangeEvent, CSSProperties, MutableRefObject, useRef, useState } from "react";
import { classNames } from "../../../lib/helpers/design";
import { Imgbb } from "../../../lib/helpers/imgbb.helper";
import { useToast } from "../../../providers/toast-provider";
import { ImageDialog } from "../utilities/dialog/image-dialog";
import { Button } from "../utilities/form/button";

export function ImageInput({
  className = "",
  labelName,
  lableClass,
  inputName,
  inputClassName = "",
  haveErrors,
  error,
  important,
  disabled,
  wrapperClass,
  ...props
}: {
  value: any;
  placeholder?: string;
  inputName?: string;
  inputClassName?: string;
  prefix?: string;
  prefixClassName?: string;
  onChange?: (val: string) => any;
  labelName?: string;
  lableClass?: string;
  className?: string;
  style?: CSSProperties;
  haveErrors?: boolean;
  error?: string;
  important?: boolean;
  children?: any;
  disabled?: boolean;
  wrapperClass?: string;
}) {
  const ref: MutableRefObject<HTMLInputElement> = useRef();
  const [showImage, setShowImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const toast = useToast();

  const onFileChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (files.length == 0) return;

    let file = files[0];
    // console.log("file", file);
    try {
      setUploading(true);
      // console.log("file", file);
      const imgUrl = await Imgbb.uploadImage(file);
      // console.log("imgUrl", imgUrl);
      props.onChange(imgUrl);
    } catch (err) {
      console.error(err);
      toast.error(`Upload ảnh thất bại. Xin thử lại bằng url thay vì upload.`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className={classNames("mb-2", disabled ? "opacity-50" : "", wrapperClass)}>
      {labelName && (
        <label
          htmlFor={inputName}
          className={classNames(
            "font-light text-sm px-1 capitalize flex items-center gap-1",
            haveErrors ? "text-danger" : "",
            lableClass
          )}
        >
          {labelName}
          {important && <div className="mr-2 text-danger">*</div>}
        </label>
      )}
      <div
        className={`form-input relative flex items-center focus-within:border-primary-dark group px-0 ${
          className || ""
        }`}
      >
        <img
          className="w-10 h-10 p-1 object-cover cursor-pointer"
          src={props.value || "/images/no-img.png"}
          onError={(e) => {
            (e.target as any).src = "/images/no-img.png";
          }}
        />
        <input
          className={`flex-grow h-9 px-1 ${inputClassName || ""}`}
          name={inputName}
          value={props.value}
          placeholder={props.placeholder}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <Button
          className="border-l h-9 rounded-none border-gray-300"
          isLoading={uploading}
          text="Upload"
          onClick={() => ref.current?.click()}
        ></Button>
        <input hidden type="file" accept="image/*" ref={ref} onChange={onFileChanged} />
        <ImageDialog isOpen={!!showImage} image={showImage} onClose={() => setShowImage("")} />
      </div>
    </div>
  );
}
