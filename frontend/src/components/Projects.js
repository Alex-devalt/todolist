import React, {useState} from "react";
import {Link} from 'react-router-dom';


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td className="td">
                <Link to={`project/${project.name}`}>{project.name}</Link>
            </td>
            <td className="td">
                {project.githubUrl}
            </td>
            <td className="td">
                <ol>
                    {project.users.map((user, index) => <li key={index}>{user}</li>)}
                </ol>
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectsList = ({projects, deleteProject}) => {
    const [filteredData, setFilteredData] = useState(projects);
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        const filter = projects.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData(projects);
        } else {
            setFilteredData(filter);
        }

    }
    return (
        <div>
            <input type="text" placeholder="Search by name" onChange={handleFilter}/>
            <table>
                <th>
                    Project Name
                </th>
                <th>
                    URL
                </th>
                <th>
                    Users
                </th>
                <th></th>
                {filteredData.map((project, index) => <ProjectItem project={project} deleteProject={deleteProject}
                                                                   key={index}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectsList