export function Label({ className = "", ...props }) {
    return (
        <label
            className={`label-text text-white mb-1`}
            {...props}
        />
    )
}