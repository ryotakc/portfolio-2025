import fs from "fs";
import path from "path";
import Image from "next/image";
import imageSize from "image-size";
import { BlockSideTitle } from "@/components/block-sidetitle";

export async function MDXImage({
  src,
  alt,
  title,
}: {
  src?: string;
  alt?: string;
  title?: string;
}) {
  if (!src) return null;

  let img: React.ReactNode;

  if (src.startsWith("https://")) {
    img = (
      /* eslint-disable @next/next/no-img-element */
      // biome-ignore lint/performance/noImgElement: External images require standard img tag due to unknown dimensions
      <img className="mt-7 w-full h-auto rounded-xl" src={src} alt={alt || ""} draggable={false} />
      /* eslint-enable @next/next/no-img-element */
    );
  } else {
    // Construct public path
    const publicDir = path.join(process.cwd(), "public", "images");
    
    // Check for light/dark variations
    const match = src.match(/(.*)(\.[^.]+)$/);
    let hasThemeImages = false;

    if (match) {
      const [_, basePath, ext] = match;
      const lightFilename = `${basePath}-light${ext}`;
      const darkFilename = `${basePath}-dark${ext}`;
      
      const lightPath = path.join(publicDir, lightFilename);
      const darkPath = path.join(publicDir, darkFilename);

      if (fs.existsSync(lightPath) && fs.existsSync(darkPath)) {
        try {
          const lightBuffer = fs.readFileSync(lightPath);
          const darkBuffer = fs.readFileSync(darkPath);
          const lightDimensions = imageSize(lightBuffer);
          const darkDimensions = imageSize(darkBuffer);

          img = (
            <>
              <Image
                className="mt-7 rounded-xl block dark:hidden"
                src={`/images/${lightFilename}`}
                alt={alt || ""}
                width={lightDimensions.width}
                height={lightDimensions.height}
                quality={95}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                draggable={false}
              />
              <Image
                className="mt-7 rounded-xl hidden dark:block"
                src={`/images/${darkFilename}`}
                alt={alt || ""}
                width={darkDimensions.width}
                height={darkDimensions.height}
                quality={95}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                draggable={false}
              />
            </>
          );
          hasThemeImages = true;
        } catch (e) {
          console.error("Failed to get dimensions for theme images", e);
        }
      }
    }

    if (!hasThemeImages) {
      const imagePath = path.join(publicDir, src);
      if (fs.existsSync(imagePath)) {
        try {
          const buffer = fs.readFileSync(imagePath);
          const dimensions = imageSize(buffer);
          img = (
            <Image
              className="mt-7 rounded-xl"
              src={`/images/${src}`}
              alt={alt || ""}
              width={dimensions.width}
              height={dimensions.height}
              quality={95}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              draggable={false}
            />
          );
        } catch (e) {
             console.error("Failed to get dimensions for image", src, e);
             return <span className="text-red-500 block">Image dimensions error: {src}</span>;
        }
      } else {
        console.error("Image file not found", imagePath);
        return <span className="text-red-500 block">Image not found: {src}</span>;
      }
    }
  }

  if (title) {
    return <BlockSideTitle title={title}>{img}</BlockSideTitle>;
  }

  return img;
}
