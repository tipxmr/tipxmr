import { DonationSetting } from "@prisma/client";

interface Props
  extends Pick<
    DonationSetting,
    "goal" | "goalProgress" | "goalReached" | "size" | "color"
  > {}

function DonationAnimation({
  goal,
  goalProgress,
  goalReached,
  size,
  color,
}: Props) {
  // TODO calculate progress width

  const progressPercentage =
    goal && goalProgress && Math.floor((goalProgress / goal) * 100);

  return (
    <div className="transparent bg-transparent">
      <div className="m-5">
        <p className="text-right">{goal} XMR 🏁</p>
        <div className="mb-4 flex h-4 overflow-hidden rounded bg-emerald-200 text-xs">
          <div
            style={{ width: `${progressPercentage}%` }}
            className="flex flex-col justify-center whitespace-nowrap bg-red-500 text-center text-white shadow-none"
          >
            <span>{goalProgress} XMR</span>
          </div>

          <div className="flex justify-end">
            <p className="text-right">{progressPercentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationAnimation;
