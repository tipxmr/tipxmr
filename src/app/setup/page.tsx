import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default async function SetupPage() {
  const entries = [
    {
      heading: "Why use TipXMR at all?",
      content:
        "Well, you don't have to! But it's a pretty neat service that allow you to interact with our stream audience and monero-tize your stream without any other middleman!",
    },
    {
      heading: "What is Monero?",
      content: (
        <p>
          You should{" "}
          <a className="underline hover:text-foreground">
            check out the official website
          </a>
        </p>
      ),
    },

    {
      heading: "How should I setup my wallet for TipXMR?",
      content:
        "Create a new wallet just for TipXMR. You can do this during the signup process or on your own. The key is that you do not use your TipXMR wallet for anything other than TipXMR. Receive the Monero and send them to another wallet of yourself.",
    },
    {
      heading: "Can my Monero be stolen?",
      content:
        "Yes, if you use a seed phrase for logging in. We recommend using a view only wallet for TipXMR.",
    },
    {
      heading: "How do I setup OBS with TipXMR?",
      content: "We'll cross that bridge when we get to it.",
    },
    {
      heading: "How much does TipXMR know about me?",
      content: "Well, you don't have to!",
    },
  ];
  return (
    <MaxWidthWrapper className="my-6">
      <h1 className="tip-h1">
        Learn more about how to use TipXMR as savely as possible!
      </h1>
      <Accordion type="single" collapsible>
        {entries.map(({ heading, content }) => (
          <AccordionItem value={heading} key={heading}>
            <AccordionTrigger className="text-xl">{heading}</AccordionTrigger>
            <AccordionContent>{content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </MaxWidthWrapper>
  );
}
