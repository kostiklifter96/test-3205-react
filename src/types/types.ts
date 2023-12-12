import { SetStateAction } from "react";

export interface IUser {
    email: string;
    number?: string;
}

export interface IFormReq {
    setListUser: React.Dispatch<SetStateAction<IUser[]>>;
    setEmptyListUserFromSearch: React.Dispatch<SetStateAction<string>>;
}

export interface IRes {
    result: string;
    data: IUser[];
}

export interface IUserList {
    setListUser: React.Dispatch<SetStateAction<IUser[]>>;
    listUser: IUser[];
}

export interface IEmptyListUserFromSearch {
    emptyListUserFromSearch: string;
    setEmptyListUserFromSearch: React.Dispatch<SetStateAction<string>>;
}
