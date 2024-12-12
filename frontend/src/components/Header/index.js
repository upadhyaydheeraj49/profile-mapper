import { BsBriefcaseFill } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { IoMdHome } from 'react-icons/io'

import Cookies from 'js-cookie'
import { Link, withRouter } from 'react-router-dom'
import './index.css'

const Header = props => {
const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
}
return (
    <>
    <nav className="navbar-lg">
        <Link to="/profiles" className="nav-link">
        <img
            src="https://res.cloudinary.com/dimvt7o8a/image/upload/v1733998600/profilemapper-logo.png"
            alt="website logo"
            className="nav-web-logo"
        />
        </Link>
        
        <button className="nav-logout-btn" onClick={onLogout} type="button">
        Logout
        </button>
    </nav>
    <nav className="navbar-sm">
        <Link to="/profiles" className="nav-link">
        <img
            src="https://res.cloudinary.com/dimvt7o8a/image/upload/v1733998600/profilemapper-logo.png"
            alt="website logo"
            className="nav-web-logo-sm"
        />
        </Link>

        <ul className="nav-sm-menu-container">
            <li>
                <button
                className="nav-sm-menu-btn"
                onClick={onLogout}
                type="button"
                >
                <FiLogOut className="nav-menu-icon" />
                </button>
            </li>
        </ul>
    </nav>
    </>
)
}
export default withRouter(Header)
