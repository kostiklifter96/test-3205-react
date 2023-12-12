import { InputMask } from "primereact/inputmask";
import { useState } from "react";
import { useInputHook } from "../hooks/useInputHook";
import { IFormReq, IRes } from "../types/types";

export const FormReq = ({
    setListUser,
    setEmptyListUserFromSearch,
}: IFormReq) => {
    const [loading, setLoading] = useState(false);

    const email = useInputHook("", {
        isEmpty: true,
        minLengthError: 8,
        maxLengthError: 25,
        isEmail: true,
    });

    const number = useInputHook("", {
        isEmpty: true,
        minLengthError: 8,
        maxLengthError: 9,
    });

    const handlerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.inputValid || !number.inputValid) {
            alert("не хватает данных");
            return;
        }
        setListUser([]);

        const user = {
            email: email.value.toLowerCase().trim(),
            number: number.value.split("-").join(""),
        };

        console.log(user);

        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.REACT_APP_BACKEND}searchUser`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                },
            );

            const dataFromBack: IRes = await res.json();

            if (dataFromBack.result === "ok") {
                if (dataFromBack.data.length > 1) {
                    setListUser(dataFromBack.data);
                } else {
                    setEmptyListUserFromSearch("Пользователи не найдены");
                }
            }
            setLoading(false);

            console.log(dataFromBack);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            setLoading(false);
        }
    };

    return (
        <div className='form'>
            <h1 className='form-title'>Найти пользователя</h1>
            <form action='' className='form-field' onSubmit={handlerSubmit}>
                <label htmlFor='email' style={{ color: "red" }}>
                    {email.isOutInput &&
                        email.emailError &&
                        "Не валидный эмайл"}
                </label>
                <input
                    type='email'
                    id='email'
                    placeholder='Введите эмейл'
                    style={{
                        border: `${
                            email.isOutInput && email.emailError
                                ? "2px solid red"
                                : ""
                        }`,
                    }}
                    onBlur={() => email.onBlur()}
                    onChange={(e) => email.onChange(e)}
                    value={email.value}
                />

                <label htmlFor='email' style={{ color: "red" }}>
                    {number.isOutInput && number.isEmpty && "Пустой номер"}
                </label>
                <InputMask
                    id='number'
                    onBlur={() => email.onBlur()}
                    onChange={(e) => number.onChange(e)}
                    mask='99-99-99'
                    placeholder='Введите номер'
                    style={{
                        border: `${
                            number.isOutInput && number.isEmpty
                                ? "2px solid red"
                                : ""
                        }`,
                    }}
                    value={number.value}
                />

                <div></div>

                <button>{loading ? "Идет поиск..." : "Отправить"}</button>
            </form>
        </div>
    );
};
