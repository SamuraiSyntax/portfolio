import { Image, StyleSheet } from "@react-pdf/renderer";
import type { Style as StyleType } from "@react-pdf/types";

const styles = StyleSheet.create({
  image: {
    objectFit: "contain",
  },
});

interface PDFLogoProps {
  style: StyleType;
}

export const PDFLogo = ({ style }: PDFLogoProps) => {
  if (!style) {
    return null;
  }

  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_APP_URL}/logo-br-output.png`}
      style={{
        ...styles.image,
        ...style,
      }}
    />
  );
};
