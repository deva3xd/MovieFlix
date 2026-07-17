export default function Label({ className = "", value, children, ...props }) {
    return (
        <label className={`label-text text-white mb-1 ${className}`} {...props}>
            {value ? value : children}
        </label>
    )
}