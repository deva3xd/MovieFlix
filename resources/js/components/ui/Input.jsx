const Input = ({ className, ...props }) => {
  return (
    <input
     {...props}
      className={`rounded-md bg-secondary input input-bordered border focus-within:shadow-none focus-within:outline-none focus-within:border-primary h-12 ${className}`}
      required
    />
  )
}

export default Input;