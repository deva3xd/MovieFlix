import Button from "@/components/ui/Button";

const SearchButton = ({ className, ...props }) => {
  return (
    <Button className={`text-background bg-primary hover:bg-primary/90 text-lg h-12 ${className}`} {...props} />
  )
}

export default SearchButton;