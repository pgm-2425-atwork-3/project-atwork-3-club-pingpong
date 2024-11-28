import { useFormStatus } from "react-dom";

export default function LoginButton() {
    const { pending } = useFormStatus();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (pending) {
            event.preventDefault();
        }
    }

    return (
        <button aria-disabled={pending} type="submit" onClick={handleClick} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
        </button>
    );
}