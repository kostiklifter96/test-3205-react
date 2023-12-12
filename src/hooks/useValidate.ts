import { useEffect, useState } from "react";

export const useValidate = (
    value: string,
    validator: {
        isEmpty: boolean;
        minLengthError: number;
        maxLengthError: number;
        isEmail?: boolean;
    },
) => {
    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [maxLengthError, setMaxLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [inputValid, setInputValid] = useState(false);

    useEffect(() => {
        for (const key in validator) {
            switch (key) {
                case "minLengthError":
                    value.length < validator[key]
                        ? setMinLengthError(true)
                        : setMinLengthError(false);
                    break;

                case "maxLengthError":
                    value.length > validator[key]
                        ? setMaxLengthError(true)
                        : setMaxLengthError(false);
                    break;

                case "isEmpty":
                    value ? setEmpty(false) : setEmpty(true);
                    break;

                case "isEmail":
                    const EMAIL_REGEXP =
                        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

                    EMAIL_REGEXP.test(String(value).toLowerCase())
                        ? setEmailError(false)
                        : setEmailError(true);
                    break;
            }
        }
    }, [value]);

    useEffect(() => {
        if (isEmpty || maxLengthError || minLengthError || emailError) {
            setInputValid(false);
        } else {
            setInputValid(true);
        }
    }, [emailError, isEmpty, maxLengthError, minLengthError]);

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        inputValid,
    };
};
