import Button from "@/components/ui/Button";

const SearchButton = ({ className, ...props }) => {
  return (
    <Button className={`text-background bg-primary border border-primary hover:bg-primary/75 text-lg h-12 ${className}`} {...props} />
  )
}

export default SearchButton;