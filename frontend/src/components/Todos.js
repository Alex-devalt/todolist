import React from "react";


const TodoItem = ({todo}) => {
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
                {todo.isActive === true ? "Y" : "N"}
            </td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
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
            {todos.map((todo, index) => <TodoItem todo={todo} key={index}/>)}
        </table>
    )
}

export default TodoList