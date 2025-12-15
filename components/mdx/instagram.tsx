export default function Instagram({ url }: { url: string }) {
  if (!url) return null;

  // Ensure it's not already an embed URL (though transformer should handle it)
  // Clean URL params for safety
  const urlObj = new URL(url);
  urlObj.search = "";
  const cleanUrl = urlObj.toString();

  // Remove trailing slash if present to avoid double slash
  const finalUrl = cleanUrl.endsWith("/") ? cleanUrl.slice(0, -1) : cleanUrl;
  const embedUrl = `${finalUrl}/embed`;

  return (
    <div className="flex justify-center my-6">
      <div style={{ width: "100%", maxWidth: "540px", height: "600px" }}>
        <iframe
          className="bg-white border rounded-xl"
          src={embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="yes"
          // @ts-expect-error: allowtransparency is not in the type definition but required by React
          allowtransparency="true"
        ></iframe>
      </div>
    </div>
  );
}
