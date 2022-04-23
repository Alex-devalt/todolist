import React from "react";
import {withRouter} from "react-router-dom";

class TodoUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        let todo = this.props.todos.filter((item) => item.id === +this.props.match.params.id)[0];
        let project = this.props.projects.filter((item) => item.name === todo.project)[0];
        let author = this.props.authors.filter((item) => item.username === todo.author)[0];
        this.state = {
            project: project.id,
            text: todo.text,
            author: author.uid,
            isActive: todo.isActive
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        if (event.target.type === 'checkbox') {
            this.setState({isActive: event.target.checked})
        }
    }

    handleSubmit(event) {
        this.props.updateTodo(this.props.match.params.id, this.state.project, this.state.text, this.state.author, this.state.isActive);
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="project">project</label>
                    <select name="project" className="form-control" defaultValue={this.state.project} onChange={(event => this.handleChange(event))}>
                        {this.props.projects.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="text">text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="author">author</label>
                    <select name="author" className="form-control" defaultValue={this.state.author} onChange={(event => this.handleChange(event))}>
                        {this.props.authors.map((item) => <option value={item.uid} key={item.uid}>{item.username}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="isActive">isActive</label>
                    <input type="checkbox" className="form-control" name="isActive" checked={this.state.isActive}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default withRouter(TodoUpdateForm)