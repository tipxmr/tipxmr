import { FC } from "react";

const PlanForm: FC = ({}) => {
  const tiers = [
    {
      title: "Free",
      subheader: "Try it out",
      price: "0",
      description: [
        "Try out Tipxmr for free",
        "Ready in minutes",
        "Use the basic features",
      ],
      buttonText: "Sign up for free",
      buttonVariant: "outlined",
    },
    {
      title: "Pro",
      subheader: "Support us",
      price: "15",
      description: [
        "Access to all features",
        "Fund future development",
        "Become a TipXMR Pro",
      ],
      buttonText: "Get started",
      buttonVariant: "contained",
    },
  ];

  return (
    <main className="container px-2">
      <div className="flex flex-col justify-center space-y-5">
        {tiers.map(
          ({ title, subheader = "", price, description, buttonText }) => (
            <div key={title} className="tip-border rounded-md p-5">
              <div className="text-center">
                <h2>{title}</h2>
                {subheader.length && <h3>{subheader}</h3>}
                <div className="mb-2 flex flex-col justify-center">
                  <p>${price} per month</p>
                </div>
                <ul>
                  {description.map((line) => (
                    <li>{line}</li>
                  ))}
                </ul>
                <button className="btn-primary mt-2">{buttonText}</button>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
};
export default PlanForm;
