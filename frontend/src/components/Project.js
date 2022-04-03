import React from 'react'
import {useParams} from 'react-router-dom'

const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.githubUrl}</td>
            <td>
                <ol>
                    {item.users.map((user) => <li>{user}</li>)}
                </ol>
            </td>
        </tr>
    )
}
const ProjectList = ({items}) => {
    let {name} = useParams();
    let filtered_items = items.filter((item) => item.name === name);
    return (
        <table>
            <tr>
                <th>NAME</th>
                <th>GITHUB_URL</th>
                <th>USERS</th>
            </tr>
            {filtered_items.map((item) => <ProjectItem item={item}/>)}
        </table>
    )
}
export default ProjectList