import { useAuth } from "@/hooks/useAuth";
import { DrawerDialogDemo } from "./AuthForm";
import AvatarDropdown from "./AvatarDropdown";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  const { isAuthenticated } = useAuth()

  return (
    <header className="w-full fixed top-0 left-0 py-2 px-5 border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950/50 backdrop-blur-sm border-b">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Logo />
          <span className="font-semibold text-xl hidden md:block text-black dark:text-white">Taskify</span>
        </div>
        <div className="space-x-1 flex items-center">
          <Button variant={'ghost'} className="text-black dark:text-white px-0 md:px-2">
            <a href="https://github.com/KevinPadi/taskify/issues/new?title=Feedback&body=Describe%20your%20feedback%20here." target="_blank" rel="noopener noreferrer" className="flex justify-start font-normal w-full gap-2">
              <Send />
              <span className="leading-none hidden sm:block">Feedback</span>
            </a>
          </Button>
          <ModeToggle />
          {
            isAuthenticated 
            ? <AvatarDropdown variant="normal" /> 
            : <DrawerDialogDemo />
            
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
