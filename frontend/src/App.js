import React from 'react';
import axios from "axios";
import './App.css';
import UsersList from "./components/Users";
import ProjectsList from "./components/Projects";
import Footer from "./components/Footer";
import TodoList from "./components/Todos";
import ProjectList from "./components/Project";
import LoginForm from "./components/Auth";
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import Cookies from "universal-cookie";


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
            'todos': [],
            'token': '',
            'username': ''
        }
    }

    cookies = new Cookies();

    setTokens(data) {
        this.cookies.set('access token', data['access']);
        if (data['refresh']) {
            this.cookies.set('refresh token', data['refresh']);
        }
        this.setState({'token': data['access']}, () => this.loadData())
    }

    isAuthenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.cookies.set('access token', '');
        this.cookies.set('refresh token', '');
        this.setState({
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'username': ''
        })
    }

    getTokenFromStorage() {
        const token = this.cookies.get('access token');
        this.setState({'token': token}, () => this.loadData())
    }

    getRefreshToken() {
        const refreshToken = this.cookies.get('refresh token');
        if (refreshToken !== '') {
            axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                'refresh': refreshToken
            }, {headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    this.setTokens(response.data);
                    this.loadData()
                })
                .catch(error => {
                        console.log('Smth wrong with refresh')
                    }
                )
        } else {
            this.logout();
        }

    }

    getToken(username, password) {
        this.setState({'username': username});
        this.cookies.set('username', username)
        axios.post('http://127.0.0.1:8000/api/token/', {
            username: username,
            password: password
        })
            .then(response => {
                this.setTokens(response.data)
            })
            .catch(error => alert('Wrong username or password')
            )
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = 'Bearer ' + this.state.token
        }
        return headers
    }

    loadData() {
        const headers = this.getHeaders();
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => {
            if (error.response.status === 401) {
                this.getRefreshToken()
            } else {
                console.log(error)
            }
        });

        axios.get('http://127.0.0.1:8000/api/projects', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => {
            if (error.response.status === 401) {
                this.getRefreshToken()
            } else {
                console.log(error)
            }
        });

        axios.get('http://127.0.0.1:8000/api/todos', {headers})
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => {
            if (error.response.status === 401) {
                this.getRefreshToken()
            } else {
                console.log(error)
            }
        });
    }

    componentDidMount() {
        this.getTokenFromStorage()
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
                            <li>
                                {this.isAuthenticated() ? <Link to='#'
                                                                onClick={() => this.logout()}>Logout</Link> :
                                    <Link to='/login'>Login</Link>}
                            </li>
                            <li>
                                {this.isAuthenticated() ? <Link to='#'>{this.cookies.get('username')}</Link> : null}
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
                        <Route exact path='/login' component={() => <LoginForm
                            getToken={(username, password) => {this.getToken(username, password);}}/>}/>
                        <Route path="/project/:name">
                            <ProjectList items={this.state.projects}/>
                        </Route>
                        <Redirect from='/users' to='/'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;


