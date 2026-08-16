import type { ChangeEvent } from "react"

interface LabelInputs {
    labelData: string
    placeHolder: string,
    type?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputBox = ({ labelData, placeHolder, type="text", onChange }: LabelInputs) => {
    return (
        <div>
            <form className="flex flex-col space-y-1">
                <label className="font-bold">
                    {labelData}
                </label>

                <input
                    className="border-2 rounded-sm p-2"
                    type={type}
                    placeholder={placeHolder}
                    onChange={onChange}
                />
            </form>
        </div>
    )
}