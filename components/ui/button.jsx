import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ogPrimary text-ogBG-base hover:bg-ogPrimary-dark",
        default: "bg-ogLabel-base text-ogBG-base hover:bg-neutral-700",
        destructive:
          "bg-ogDestructive text-ogDestructive-light hover:bg-ogDestructive-dark",
        outline: "border border-input bg-transparent hover:bg-neutral-200",
        secondary: "bg-neutral-200 text-ogLabel-base hover:bg-neutral-300",
        ghost: "text-ogLabel-base hover:bg-neutral-200",
        link: "text-ogLabel-base underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        md: "h-10 rounded-md px-5 py-2",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 md:h-20 rounded-xl md:rounded-2xl px-4 md:px-0",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
