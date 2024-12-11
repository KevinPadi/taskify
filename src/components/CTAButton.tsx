import { forwardRef } from "react";
import { Rocket } from "lucide-react";
import { Button } from "./ui/button";
import type { ButtonProps } from "./ui/button";

const CTAButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button 
    ref={ref}
    className="w-fit dark:bg-neutral-200 dark:hover:bg-white transition-all ease-in-out border-2 border-neutral-400 dark:border-neutral-900/80"
    {...props}
  >
    Get Started
    <Rocket />
  </Button>
));

CTAButton.displayName = "CTAButton";

export default CTAButton;
