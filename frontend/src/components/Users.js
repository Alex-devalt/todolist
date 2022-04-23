import React, {useState} from "react";


const UserItem = ({user}) => {
    return (
        <tr>
            <td className="td">
                {user.username}
            </td>
            <td className="td">
                {user.firstName}
            </td>
            <td className="td">
                {user.lastName}
            </td>
            <td className="td">
                {user.email}
            </td>
        </tr>
    )
}

const UsersList = ({users}) => {
    const [filteredData, setFilteredData] = useState(users);
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        const filter = users.filter((value) => {
            return value.username.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData(users);
        } else {
            setFilteredData(filter);
        }

    }
    return (
        <div>
            <input type="text" placeholder="Search by name" onChange={handleFilter}/>
            <table>
                <th>
                    Username
                </th>
                <th>
                    First Name
                </th>
                <th>
                    Last Name
                </th>
                <th>
                    Email
                </th>
                {filteredData.map((user, index) => <UserItem user={user} key={index}/>)}
            </table>
        </div>
    )
}

export default UsersList