import { DonationSetting } from "@prisma/client";

interface Props
  extends Pick<
    DonationSetting,
    "goal" | "goalProgress" | "goalReached" | "size" | "color"
  > {
  message: string;
  donorName: string;
  xmrAmount: number;
}

function DonationAnimation({
  message,
  donorName,
  xmrAmount,
  goal,
  goalProgress,
  goalReached,
  size,
  color,
}: Props) {
  // TODO implement the size and color from the donation settings
  const displayMessage =
    message ||
    "Hey man, I really like your stream and hope that this tip is supporting you!";
  const displayDonorName = donorName || "Satoshi Nakamoto";
  const donationAmount = xmrAmount || 1242;

  const progressPercentage =
    goal && goalProgress && Math.floor((goalProgress / goal) * 100);

  return (
    <div className="transparent tip-border m-4 h-64 border-dotted bg-transparent">
      {/* Goal */}
      <div className="m-3">
        <p className="text-right">{goal} XMR 🏁</p>
        <div className="mb-4 flex h-4 overflow-hidden rounded bg-emerald-200 text-xs">
          <div
            style={{ width: `${progressPercentage}%` }}
            className="flex flex-col justify-center whitespace-nowrap bg-red-500 text-center text-white shadow-none"
          >
            <span>{goalProgress} XMR</span>
          </div>
          <div className="grow">
            <p className="text-center">{progressPercentage}%</p>
          </div>
        </div>
      </div>
      {/* Message */}
      <div className="m-4">
        {displayMessage && (
          <div className="break-words text-center font-mono">
            {displayMessage}
          </div>
        )}
        <div className="m-2">
          {displayDonorName && (
            <p className="text-right font-mono">- {displayDonorName}</p>
          )}
        </div>
      </div>
      {/* Donation */}
      {donationAmount && (
        <div className="flex flex-col  text-center">
          <p className="font-mono text-xl">{donationAmount} XMR</p>
        </div>
      )}
    </div>
  );
}

export default DonationAnimation;
