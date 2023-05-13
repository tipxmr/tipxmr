import {
  BarChartIcon,
  DashboardIcon,
  DesktopIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Icon } from "@radix-ui/react-select";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import useUser from "~/lib/useUser";

interface MenuItemProps {
  href: string;
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
}

const MenuItem = ({ href, Icon, text }: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref>
      <NavigationMenu.Item
        className={clsx(
          "rounded px-4 py-2 hover:bg-gray-200",
          isActive && "underline"
        )}
      >
        <Icon className="mr-2 inline h-4 w-4 align-middle" />
        {text}
      </NavigationMenu.Item>
    </Link>
  );
};

function Drawer() {
  const { logout } = useUser();

  const signOut = () => {
    logout();
  };

  return (
    <NavigationMenu.Root className="mr-2 shrink-0 p-2" aria-label="Left navigation">
      <NavigationMenu.List>
        <MenuItem href="/dashboard" Icon={DashboardIcon} text="Dashboard" />

        <MenuItem href="/dashboard/wallet" Icon={RocketIcon} text="Wallet" />

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

        <NavigationMenu.Item
          className="cursor-pointer rounded px-4 py-2 hover:bg-gray-200"
          onClick={signOut}
        >
          <Icon className="mr-2 inline h-4 w-4 align-middle" />
          Logout
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

export default Drawer;
