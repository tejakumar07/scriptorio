interface ButtonLabel {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

export const Button = ({ label, onClick, disabled = false }: ButtonLabel) => {
    return (
        <main>
            <button
                onClick={onClick}
                disabled={disabled}
                className="bg-black text-white w-full rounded-lg mt-2 p-2 hover:bg-white hover:text-black hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {label}
            </button>
        </main>
    )
}