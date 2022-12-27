import { Arrow,Content, Portal, Root, Trigger } from "@radix-ui/react-tooltip";
interface Props {
  tooltip: JSX.Element;
  children: any;
}
function Tooltip({ tooltip, children }: Props) {
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
            {tooltip}
            <Arrow className="TooltipArrow" />
          </>
        </Content>
      </Portal>
    </Root>
  );
}

export default Tooltip;
