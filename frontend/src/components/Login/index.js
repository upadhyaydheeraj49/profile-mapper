import Cookies from 'js-cookie'
import { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './index.css'

class Login extends Component {
state = {
    type: 'USER',
    username: '',
    password: '',
    errorMsg: '',
}

updateUserType = event => {
    this.setState({type: event.target.value})
}

onChangeUsername = event => {
    this.setState({username: event.target.value})
}

onChangePassword = event => {
    this.setState({password: event.target.value})
}

validateUserAttempt = async event => {
    const {username, password, type} = this.state
    event.preventDefault()
    const userDetails = {username, password, type}
    const options = {
    method: 'POST',
    body: JSON.stringify(userDetails),
    }
    const loginResponse = await fetch('/api/login', options)
    const data = await loginResponse.json()
    if (loginResponse.ok === true) {
    // console.log('We got JWT Token')
    console.log(data.jwt_token)
    Cookies.set('jwt_token', data.jwt_token, {expires: 10})
    this.setState({username: '', password: '', errorMsg: ''})
    const {history} = this.props
    history.replace('/profiles')
    } else {
    this.setState({errorMsg: data.error_msg})
    }
}

render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
    return <Redirect to="/profiles" />
    }
    return (
    <div className="login-container">
        <div className="login-card">
        <img
            src="https://res.cloudinary.com/dimvt7o8a/image/upload/v1733998600/profilemapper-logo.png"
            alt="website logo"
            className="login-card-website-logo"
        />
        <form onSubmit={this.validateUserAttempt}>
            <select onChange={this.updateUserType}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
            </select>
            <br/>
            <label htmlFor="username" className="login-form-label">
            USERNAME
            </label>
            <input
            type="text"
            id="username"
            className="login-input-field"
            placeholder="Username"
            onChange={this.onChangeUsername}
            value={username}
            />
            <label htmlFor="password" className="login-form-label">
            PASSWORD
            </label>
            <input
            type="password"
            id="password"
            className="login-input-field"
            placeholder="Password"
            onChange={this.onChangePassword}
            value={password}
            />
            <button type="submit" className="login-form-btn">
            Login
            </button>
            <p className="login-error-msg">
            {errorMsg === '' ? '' : `*${errorMsg}`}
            </p>
        </form>
        </div>
    </div>
    )
}
}
export default Login
