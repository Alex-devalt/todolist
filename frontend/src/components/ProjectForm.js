import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            users: [],
            githubUrl: ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleUsers = (event) => {
        let value = Array.from(event.target.selectedOptions, option => option.value);
        this.setState({users: value});
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.users, this.state.githubUrl)
        console.log(this.state.name);
        console.log(this.state.githubUrl);
        console.log(this.state.users);
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="login">name</label>
                        <input type="text" className="form-control" name="name" value={this.state.name}
                               onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="users">users</label>
                    <select name="users" multiple className="form-control" onChange={(event => this.handleUsers(event))}>
                        {this.props.allUsers.map((item) => <option value={item.uid} key={item.uid}>{item.username}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="githubUrl">githubUrl</label>
                    <input type="text" className="form-control" name="githubUrl" value={this.state.githubUrl}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ProjectForm