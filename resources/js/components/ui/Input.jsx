import { forwardRef } from "react";

const Input = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`rounded-md input border focus-within:shadow-none focus-within:outline-none focus-within:border-primary h-12 bg-zinc-900 border-white/10 ${className}`}
    />
  )
})

export default Input;
