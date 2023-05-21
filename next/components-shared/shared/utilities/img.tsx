import { CSSProperties, useState } from "react";
import LazyLoad from "react-lazyload";

const defaultImage = "/images/logo.svg";
const defaultAvatar = "/images/logo.svg";

export function Img({
  src,
  alt = "",
  once = true,
  ...props
}: {
  src?: string;
  alt?: string;
  avatar?: boolean;
  rounded?: boolean;
  ratio169?: boolean;
  percent?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: any;
}) {
  const [image, setImage] = useState(src);
  const [error, setError] = useState(false);

  const onImageError = () => {
    if (error) return;
    if (props.avatar) setImage(defaultAvatar);
    else setImage(defaultImage);
    setError(true);
  };

  return (
    <LazyLoad className="w-full" once={once}>
      <div
        className={`image-wrapper ${props.avatar ? "circle" : ""} ${
          props.rounded ? "rounded" : ""
        } ${props.ratio169 ? "ratio-16-9" : ""} ${
          props.className || ""
        }`.trim()}
        style={{
          ...(props.style ? props.style : {}),
          ...(props.percent ? { paddingTop: props.percent + "%" } : {}),
        }}
      >
        {src && <img src={image} onError={onImageError} alt={alt} />}
        {props.children}
      </div>
    </LazyLoad>
  );
}
