type PropsType = {
  imgUrl: string;
  className?: string;
  opacity?: string;
};

const ImageBackground = ({ imgUrl, className, opacity }: PropsType) => (
  <div
    className={`absolute top-0 left-0 w-full h-full z-0  ${
      opacity ? opacity : "opacity-10"
    } ${className ? className : ""}`}
    style={{
      background: `url(${imgUrl}) 0% 0% / cover`,
    }}
  />
);

export default ImageBackground;
