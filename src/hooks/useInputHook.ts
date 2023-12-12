import { InputMaskChangeEvent } from "primereact/inputmask";
import { useState } from "react";
import { useValidate } from "./useValidate";

export const useInputHook = (
    initialState: string,
    validator: {
        isEmpty: boolean;
        minLengthError: number;
        maxLengthError: number;
        isEmail?: boolean;
    },
) => {
    const [value, setValue] = useState(initialState);
    const [isOutInput, setIsOutInput] = useState(false);
    const valid = useValidate(value, validator);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent,
    ) => {
        if (typeof e.target.value === "string") {
            setValue(e.target.value);
        }
    };

    const onBlur = () => {
        setIsOutInput(true);
    };

    return { value, onChange, onBlur, isOutInput, setValue, ...valid };
};
