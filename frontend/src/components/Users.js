import React from "react";


const UserItem = ({user}) => {
    return (
        <tr>
            <td className="td">
                {user.username}
            </td>
            <td className="td">
                {user.first_name}
            </td>
            <td className="td">
                {user.last_name}
            </td>
            <td className="td">
                {user.email}
            </td>
        </tr>
    )
}

const UsersList = ({users}) => {
    return (
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
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}

export default UsersList