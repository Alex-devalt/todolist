import axios from "axios";
import './App.css';
import React, {Fragment} from "react";
import UsersList from "./components/Users";
import ProjectsList from "./components/Projects";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import TodoList from "./components/Todos";
import ProjectList from "./components/Project";
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';


const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Page '{location.pathname}' not found!</h1>
        </div>
    )
};

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          'users': [],
          'projects': [],
          'todos': []
      }
  }

  componentDidMount() {
      axios.get('http://127.0.0.1:8000/api/users')
          .then(response => {
               const users = response.data.results
                 this.setState(
                     {
                         'users': users
                     }
                 )
          }).catch(error => console.log(error));

      axios.get('http://127.0.0.1:8000/api/projects')
          .then(response => {
               const projects = response.data.results
                 this.setState(
                     {
                         'projects': projects
                     }
                 )
          }).catch(error => console.log(error));

      axios.get('http://127.0.0.1:8000/api/todos')
          .then(response => {
               const todos = response.data.results
                 this.setState(
                     {
                         'todos': todos
                     }
                 )
          }).catch(error => console.log(error));

      }

    render() {
      return (
          <div className="App">
              {/*<Menu />*/}
              <BrowserRouter>
                  <nav>
                      <ul>
                          <li>
                              <Link to='/'>Users</Link>
                          </li>
                          <li>
                              <Link to='/projects'>Projects</Link>
                          </li>
                          <li>
                              <Link to='/todos'>Todos</Link>
                          </li>
                      </ul>
                  </nav>
                  <Switch>
                      <Route exact path='/' component={() => <UsersList
                      users={this.state.users}/>}/>
                  <Route exact path='/projects' component={() => <ProjectsList
                      projects={this.state.projects}/>}/>
                  <Route exact path='/todos' component={() => <TodoList
                      todos={this.state.todos}/>}/>
                  <Route path="/project/:name">
                      <ProjectList items={this.state.projects}/>
                  </Route>
                  <Redirect from='/users' to='/' />
                  <Route component={NotFound404} />
                  </Switch>
              </BrowserRouter>
              <Footer />
          </div>
      )
  }
}

export default App;

