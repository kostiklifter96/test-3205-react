import { IUserList } from "../types/types";

export const UserList = ({ setListUser, listUser }: IUserList) => {
    return (
        <div className='userList'>
            <div className='userList-list'>
                {listUser?.map((el, i) => (
                    <div
                        key={el.email + " " + i}
                        className='userList-list_item'
                    >
                        <div>email: {el.email}</div>
                        <div>number: {el.number}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
