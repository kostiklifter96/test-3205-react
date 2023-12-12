import { useState } from "react";
import "./app.css";
import { EmptyUserInfo } from "./components/EmptyUserInfo";
import { FormReq } from "./components/FormReq";
import { UserList } from "./components/UserList";
import { IUser } from "./types/types";

function App() {
    const [listUser, setListUser] = useState<IUser[]>([]);
    const [emptyListUserFromSearch, setEmptyListUserFromSearch] =
        useState<string>("");

    return (
        <div className='App'>
            <FormReq
                setListUser={setListUser}
                setEmptyListUserFromSearch={setEmptyListUserFromSearch}
            />
            {listUser.length > 0 ? (
                <UserList setListUser={setListUser} listUser={listUser} />
            ) : null}
            {emptyListUserFromSearch && (
                <EmptyUserInfo
                    emptyListUserFromSearch={emptyListUserFromSearch}
                    setEmptyListUserFromSearch={setEmptyListUserFromSearch}
                />
            )}
        </div>
    );
}

export default App;
