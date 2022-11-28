import type { DonationSetting } from "@prisma/client";

interface Props {
  url?: DonationSetting["url"] | undefined;
}

function StreamingUrl({ url }: Props) {
  return (
    <div className="w-full">
      <p className="select-none">Animation URL:</p>
      <div className="break-words bg-white font-mono">
        http://localhost:3000/animation/{url ?? "..."}
      </div>
      <p className="mb-4 select-none font-light leading-relaxed text-slate-600">
        Paste this URL as a browser resource in your OBS studio
      </p>
    </div>
  );
}

export default StreamingUrl;
