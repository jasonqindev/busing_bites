import { FC, useState } from "react";
import { Image, ImageProps } from "@mantine/core";

interface PropsType extends ImageProps {
  src?: string;
  alt?: string;
  defaultSrc?: string;
}

const CImage: FC<PropsType> = ({ src, alt, defaultSrc, ...props }) => {
  const [imgSrc, setImgSrc] = useState(
    defaultSrc || "/images/img_default.jpeg"
  );

  const handleLoadImg = () => {
    src && setImgSrc(src);
  };

  return <Image {...props} src={imgSrc} onLoad={handleLoadImg} alt={alt} />;
};

export default CImage;
