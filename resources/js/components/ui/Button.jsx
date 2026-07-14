import { cva } from "class-variance-authority";

const buttonVariants = cva(
    "flex justify-center items-center gap-2 rounded-full font-semibold disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "border border-primary bg-primary hover:bg-primary/85 text-white",
                secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
                outline: "border border-white text-white hover:bg-white/10",
            },
            size: {
                sm: "text-sm px-4 py-1.5",
                md: "text-lg px-8 py-3",
                lg: "text-2xl px-10 py-3",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export function Button({ className, children, as : Component = "button", variant, size, ...props }) {
    return (
        <Component
            className={buttonVariants({ variant, size, className })}
            {...props}
        >
            {children}
        </Component>
    );
}
