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
      <Image
        className="mt-7"
        src={src}
        alt={alt || ""}
        quality={95}
        placeholder="blur"
        draggable={false}
      />
    );
  } else {

    try {
      // Assuming assets is at root /assets
      const image = await import(`@/assets/images/${src}`);
      img = (
        <Image
          className="mt-7"
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
