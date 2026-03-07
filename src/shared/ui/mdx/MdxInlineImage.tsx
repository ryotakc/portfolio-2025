import fs from "fs";
import imageSize from "image-size";
import Image, { type ImageProps } from "next/image";
import path from "path";

function normalizeDimension(value: ImageProps["width"] | ImageProps["height"]) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
}

function getLocalImageDimensions(src: string) {
  const relativePath = src.replace(/^\/+/, "");
  const imagePath = path.join(process.cwd(), "public", relativePath);

  if (!fs.existsSync(imagePath)) {
    return {};
  }

  try {
    const buffer = fs.readFileSync(imagePath);
    const dimensions = imageSize(buffer);

    return {
      width: dimensions.width,
      height: dimensions.height,
    };
  } catch (error) {
    console.error("Failed to infer inline image dimensions:", src, error);
    return {};
  }
}

export function MdxInlineImage(props: ImageProps) {
  const { alt, ...rest } = props;

  if (rest.fill || typeof rest.src !== "string") {
    return <Image {...rest} alt={alt} />;
  }

  const width = normalizeDimension(rest.width);
  const height = normalizeDimension(rest.height);
  const inferredDimensions = width && height ? {} : getLocalImageDimensions(rest.src);

  return (
    <Image
      {...rest}
      alt={alt}
      width={width ?? inferredDimensions.width}
      height={height ?? inferredDimensions.height}
    />
  );
}
