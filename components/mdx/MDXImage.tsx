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
    // Dynamic import for local attributes
    // Note: Variable dynamic imports regarding basic paths only work if webpack can analyze it.
    // Ideally we should use simple `import` but here we need dynamic generic path.
    // The previous implementation used: await import(`./assets/images/${src}`) which was relative to mdx-components.tsx?
    // Let's check where the images are. usually `public/` or `assets/`.
    // The original file had `import(./assets/images/${src})` inside mdx-components.
    // `mdx-components.tsx` is in root. So `assets/images` is in root.
    // Since we are moving this to `components/mdx/MDXImage.tsx`, the relative path changes.
    // It should be `../../assets/images/${src}` if we are in components/mdx.
    // BUT dynamic imports in Next.js/Webpack are context sensitive.
    // Let's try to match the path correctly.

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
