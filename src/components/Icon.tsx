import React from "react";
import { Flex } from "theme-ui";

type IIconProps = {
  src: string;
  alt: string;
};

const Icon: React.FC<IIconProps> = ({ src, alt }) => {
  return (
    <Flex
      sx={{
        width: "44px",
        height: "44px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img width={"100%"} src={src} alt={alt} />
    </Flex>
  );
};

export default Icon;
