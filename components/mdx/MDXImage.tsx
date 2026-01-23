import Image from "next/image";
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
    try {
      // Assuming assets is at root /assets
      const image = await import(`@/assets/images/${src}`);
      img = (
        <Image
          className="mt-7 rounded-xl"
          src={image.default}
          alt={alt || ""}
          quality={95}
          placeholder="blur"
          draggable={false}
        />
      );
    } catch (e) {
      console.error("Failed to load image", src, e);
      return <p className="text-red-500">Image not found: {src}</p>;
    }
  }

  if (title) {
    return <BlockSideTitle title={title}>{img}</BlockSideTitle>;
  }

  return img;
}
