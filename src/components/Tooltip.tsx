import { Arrow, Content, Portal, Root, Trigger } from "@radix-ui/react-tooltip";
interface TooltipProps {
  content: JSX.Element;
  children: any;
}
function Tooltip({ content, children }: TooltipProps) {
  return (
    <Root>
      <Trigger>{children}</Trigger>
      <Portal>
        <Content
          className="TooltipContent tip-border max-w-xs rounded-md bg-gray-200 p-2"
          side="right"
          sideOffset={5}
        >
          <>
            {content}
            <Arrow className="TooltipArrow" />
          </>
        </Content>
      </Portal>
    </Root>
  );
}

export default Tooltip;
