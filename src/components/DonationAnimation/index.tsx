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

  const [donation, setDonation] = useState<Partial<Donation> | undefined>();
  const transition = useTransition(donation, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    onRest: () => setTimeout(() => setDonation(undefined), 10000),
  });

  useEffect(() => setDonation(donations?.at(0)), []);

  const progressPercentage =
    (goal && goalProgress && Math.floor((goalProgress / goal) * 100)) || 0;

  const [open, toggle] = useState(false);
  const [ref, { width }] = useMeasure();
  const props = useSpring({ width: (goalProgress / goal) * width });

  return (
    <div className="transparent tip-border m-4 h-64 border-dotted bg-transparent text-black">
      <button onClick={() => setDonation(donations[0])}>
        Toggle animation
      </button>
      {/* Goal */}
      <div className="container">
        <div ref={ref} className="main" onClick={() => toggle(!open)}>
          <animated.div className="fill" style={props} />
          <animated.div className="content">
            {props.width.to((x) => x.toFixed(0))}
          </animated.div>
        </div>
      </div>

      <div className="m-3">
        <p className="text-right">{goal} XMR 🏁</p>
        <div
          ref={ref}
          className="mb-4 flex h-4 overflow-hidden rounded text-xs"
        >
          <animated.div
            style={props}
            className="flex flex-col justify-center whitespace-nowrap bg-red-500 text-center text-white shadow-none"
          >
            <span>{goalProgress} XMR</span>
          </animated.div>
          <animated.div className="content">
            <p className="text-center">{progressPercentage}%</p>
          </animated.div>
        </div>
      </div>
      {transition((style, msg) => (
        <animated.div style={style}>
          {/* Message */}
          <div className="m-4">
            {msg?.text && (
              <div className="break-words text-center font-mono">
                {msg.text}
              </div>
            )}
            <div className="m-2">
              {msg?.donorName && (
                <p className="text-right font-mono">- {msg.donorName}</p>
              )}
            </div>
          </div>
          {/* Donation */}
          {msg?.xmrAmount && (
            <div className="flex flex-col  text-center">
              <p className="font-mono text-xl">{msg.xmrAmount} XMR</p>
            </div>
          )}
        </animated.div>
      ))}
    </div>
  );
}

export default DonationAnimation;
