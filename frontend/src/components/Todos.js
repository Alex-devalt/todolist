import React from "react";
import {Link} from "react-router-dom";


const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td className="td">
                {todo.project}
            </td>
            <td className="td">
                {todo.author}
            </td>
            <td className="td">
                {todo.text}
            </td>
            <td className="td">
                {todo.isActive === true? "Y": "N" }
            </td>
            <td><button onClick={()=>deleteTodo(todo.id)} type='button'>Delete</button></td>
            <td>
                <Link to={"/todos/update/" + todo.id}>
                    <button type='button'>Update</button>
                </Link>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
    return (
        <div>
            <table>
                <th>
                    Project Name
                </th>
                <th>
                    Author
                </th>
                <th>
                    Text
                </th>
                <th>
                    Is Active
                </th>
                <th></th>
                <th></th>
                {todos.map((todo, index) => <TodoItem todo={todo} key={index} deleteTodo={deleteTodo} />)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default TodoList