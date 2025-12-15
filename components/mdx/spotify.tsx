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

  const isPlaylistOrAlbum = embedUrl.includes("/playlist/") || embedUrl.includes("/album/");
  const height = isPlaylistOrAlbum ? "352" : "152";

  return (
    <div className="flex justify-center my-6">
      <iframe 
        style={{ borderRadius: '12px' }} 
        src={embedUrl} 
        width="100%" 
        height={height}
        frameBorder="0" 
        allowFullScreen 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
      ></iframe>
    </div>
  );
}
