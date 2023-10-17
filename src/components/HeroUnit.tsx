import { FC } from "react";

interface HeroUnitProps {
  title: string;
  text: string;
}

const HeroUnit: FC<HeroUnitProps> = ({ title, text }) => {
  return (
    <section className="max-w-xl py-2">
      <h1 className="text-center">{title}</h1>
      <p>{text}</p>
    </section>
  );
};

export default HeroUnit;
