export default function EditButton(props: { children?: React.ReactNode }) {
    return (
        <button className="p-2 border-gray border rounded w-fit" {...props}>
            {props.children}
        </button>
    );
}
