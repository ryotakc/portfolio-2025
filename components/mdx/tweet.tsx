import { Tweet } from "react-tweet";

export default function EmbeddedTweet({ id }: { id: string }) {
  return (
    <div className="flex justify-center my-6">
      <div data-theme="light">
        <Tweet id={id} />
      </div>
    </div>
  );
}
