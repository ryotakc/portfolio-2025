export default function Spotify({ link }: { link: string }) {
  if (!link) return null;

  // Ensure it's an embed URL if passed a direct link, though transformer handles most
  // But for safety, we can just pass the link if it's already properly formatted by the transformer
  // or do client-side adjustment if needed. Use 'embed' path for iframe.
  
  // Logic: 
  // https://open.spotify.com/track/ID -> https://open.spotify.com/embed/track/ID
  // https://open.spotify.com/playlist/ID -> https://open.spotify.com/embed/playlist/ID
  
  let embedUrl = link;
  if (!link.includes('/embed/')) {
     embedUrl = link.replace('open.spotify.com/', 'open.spotify.com/embed/');
  }

  // Clean query params
  const urlObj = new URL(embedUrl);
  urlObj.search = "";
  const cleanEmbedUrl = urlObj.toString();

  const isPlaylistOrAlbum = cleanEmbedUrl.includes("/playlist/") || cleanEmbedUrl.includes("/album/");
  const height = isPlaylistOrAlbum ? 380 : 152;

  return (
    <div className="flex justify-center my-6">
      <div style={{ width: "100%", maxWidth: "100%", height: `${height}px` }}>
        <iframe
          style={{ borderRadius: "12px" }}
          src={cleanEmbedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          title="Spotify Embed"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
