
import { withRouter } from 'react-router-dom'
import './index.css'

const ProfileItem = props => {
const {profile} = props
const onClickSummary = () => {
    const {history} = props
    history.push(`/profiles/${profile.id}`)
    window.location.reload(true)
}
return (
    <li className="profile-container">
        <div className="profile-top-row">
            <img
                src={profile.photograph}
                alt={`${profile.name}'s avatar`}
                className="profile-logo"
            />
            <h5 className="profile-title">{profile.name}</h5>
        </div>
        
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="profile-description">{profile.description}</p>
        <button className='summary-btn' onClick={onClickSummary}>Summary</button>
    </li>
)
}
export default withRouter(ProfileItem)
