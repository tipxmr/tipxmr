import {
  BarChartIcon,
  DashboardIcon,
  DesktopIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const MenuItem = ({ href, Icon, text, ...props }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenu.Item className="rounded px-4 py-2 hover:bg-gray-200">
      <NextLink href={href} passHref>
        <NavigationMenu.Link className={clsx(isActive && "underline")}>
          <Icon className="mr-1 inline h-4 w-4 align-middle" /> {text}
        </NavigationMenu.Link>
      </NextLink>
    </NavigationMenu.Item>
  );
};

function Drawer() {
  return (
    <NavigationMenu.Root className="shrink-0 self-stretch bg-white p-2">
      <NavigationMenu.List>
        <MenuItem href="/dashboard" Icon={DashboardIcon} text="Dashboard" />

        <MenuItem href="/dashboard/wallet" Icon={RocketIcon} text="wallet" />

        <MenuItem
          href="/dashboard/settings"
          Icon={DesktopIcon}
          text="Settings"
        />

        <MenuItem href="/dashboard/profile" Icon={PersonIcon} text="Profile" />

        <MenuItem
          href="/dashboard/history"
          Icon={BarChartIcon}
          text="History"
        />
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

export default Drawer;
