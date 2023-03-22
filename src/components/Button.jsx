export default function Button({ children, ...props }) {
    const { onClick, ...rest } = props
    return (
        <>
            <button
                {...rest}
                onClick={onClick}
                className='px-3 flex items-center border p-1 bg-indigo-300 rounded-md'
            >
                {children}
            </button>
        </>
    )
}
