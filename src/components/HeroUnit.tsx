import { FC } from "react";

interface HeroUnitProps {
  title: string;
  text: string;
}

const HeroUnit: FC<HeroUnitProps> = ({ title, text }) => {
  return (
    <div className="max-w-xl py-2">
      <h3 className="text-center">{title}</h3>
      <h5>{text}</h5>
    </div>
  );
};

export default HeroUnit;
