import { useEffect } from "react";
import { IEmptyListUserFromSearch } from "../types/types";

export const EmptyUserInfo = ({
    emptyListUserFromSearch,
    setEmptyListUserFromSearch,
}: IEmptyListUserFromSearch) => {
    useEffect(() => {
        setTimeout(() => {
            setEmptyListUserFromSearch("");
        }, 3000);
    }, []);

    return (
        <div className='emptyUserInfo'>
            <div className='emptyUserInfo-title'>{emptyListUserFromSearch}</div>
        </div>
    );
};
