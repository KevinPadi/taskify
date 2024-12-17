import { useAuth } from "@/hooks/useAuth";
import { DrawerDialogDemo } from "./AuthForm";
import AvatarDropdown from "./AvatarDropdown";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const { isAuthenticated } = useAuth()

  return (
    <header className="w-full fixed top-0 py-2 px-5 border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950/50 backdrop-blur-sm border-b">
      <div className="flex justify-between">
        <span>LOGO 🎉</span>
        <div className="space-x-1 flex items-center">
          <ModeToggle />
          {
            isAuthenticated 
            ? <AvatarDropdown />
            : <DrawerDialogDemo />
            
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
