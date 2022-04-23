import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: props.projects[0]?.id,
            text: '',
            author: '',
            isActive: false
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
        this.props.createTodo(this.state.project, this.state.text, this.state.author, this.state.isActive);
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="project">project</label>
                    <select name="project" className="form-control" onChange={(event => this.handleChange(event))}>
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
                    <select name="author" className="form-control" onChange={(event => this.handleChange(event))}>
                        {this.props.authors.map((item) => <option value={item.uid} key={item.uid}>{item.username}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="isActive">isActive</label>
                    <input type="checkbox" className="form-control" name="isActive" value={this.state.isActive} // check bool
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default TodoForm