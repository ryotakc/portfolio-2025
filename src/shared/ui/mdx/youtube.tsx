interface YouTubeProps {
  src: string;
  title?: string;
}

export default function YouTube({ src, title = "YouTube video embed" }: YouTubeProps) {
  return (
    <div className="my-6 w-full aspect-video rounded-2xl border-2 border-[var(--border)] overflow-hidden">
      <iframe
        src={src}
        title={title}
        className="w-full h-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
