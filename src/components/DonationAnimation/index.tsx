"use client";
import { Donation, DonationSetting } from "@prisma/client";
import { useEffect, useState } from "react";
import { animated, config, useSpring, useTransition } from "react-spring";
import useMeasure from "react-use-measure";

interface Props extends Partial<DonationSetting> {
  donations: Partial<Donation>[];
}

function DonationAnimation({
  /* message = "Hey man, I really like your stream and hope that this tip is supporting you!", */
  donations,
  goal = 0,
  goalProgress = 0,
  goalReached = false,
  size,
  color,
}: Props) {
  // TODO implement the size and color from the donation settings
  // TODO connect to the Animation Websocket
  const [donation, setDonation] = useState<Partial<Donation> | undefined>();
  const transition = useTransition(donation, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    onRest: () => setTimeout(() => setDonation(undefined), 10000),
  });
  useEffect(() => setDonation(dummyDonation), []);

  const progressPercentage =
    (goal && goalProgress && Math.floor((goalProgress / goal) * 100)) || 0;

  const [ref, { width }] = useMeasure();
  const props = useSpring({ width: (goalProgress / goal) * width });
  const dummyDonation = donations?.at(0);

  return (
    <div className="tip-border m-4 h-64 border-dotted text-white">
      <button onClick={() => setDonation(dummyDonation)}>
        Toggle animation
      </button>
      {/* Goal */}
      <div className="m-3">
        <p className="text-right">{goal} XMR 🏁</p>
        <div
          ref={ref}
          className="mb-4 flex h-6 overflow-hidden rounded text-xs"
        >
          <animated.div
            style={props}
            className="flex flex-col justify-center whitespace-nowrap bg-red-500 text-center "
          >
            <p className="font-bold">{goalProgress} XMR</p>
          </animated.div>
          <animated.div className="flex grow flex-col items-center justify-center bg-green-300">
            <p className="font-bold">{progressPercentage}%</p>
          </animated.div>
        </div>
      </div>
      {transition((style, msg) => (
        <animated.div style={style}>
          {/* Message */}
          <div className="m-4">
            {msg?.message && (
              <div className="break-words text-center font-mono">
                {msg.message}
              </div>
            )}
            <div className="m-2">
              {msg?.donor && (
                <p className="text-right font-mono">- {msg.donor}</p>
              )}
            </div>
          </div>
          {/* Donation */}
          {msg?.amount && (
            <div className="flex flex-col  text-center">
              <p className="font-mono text-xl">{msg.amount} XMR</p>
            </div>
          )}
        </animated.div>
      ))}
    </div>
  );
}

export default DonationAnimation;
