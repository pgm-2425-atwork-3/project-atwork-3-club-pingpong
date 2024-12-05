import { useFormStatus } from "react-dom";

export default function LoginButton() {
    const { pending } = useFormStatus();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (pending) {
            event.preventDefault();
        }
    };

    return (
        <button
            aria-disabled={pending}
            type="submit"
            onClick={handleClick}
            className="w-full py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm text-white bg-darkOrange hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-bold drop-shadow-xl"
        >
            Submit
        </button>
    );
}
