import { forwardRef } from "react";

const Input = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`rounded-md bg-secondary input input-bordered border focus-within:shadow-none focus-within:outline-none focus-within:border-primary h-12 ${className}`}
    />
  )
})

export default Input;
