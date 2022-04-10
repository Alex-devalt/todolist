import React from "react";


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
            {users.map((user, index) => <UserItem user={user} key={index}/>)}
        </table>
    )
}

export default UsersList