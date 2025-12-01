import Button from "@/components/ui/Button";

const SubmitButton = ({ className, ...props }) => {
  return (
    <Button className={`text-background bg-primary border border-primary hover:bg-primary/75 text-lg h-12 ${className}`} {...props} />
  )
}

export default SubmitButton;