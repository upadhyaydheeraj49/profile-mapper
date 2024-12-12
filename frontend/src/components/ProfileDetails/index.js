import axios from 'axios'
import { Component } from 'react'
import { MdOutlineEmail, MdCall } from 'react-icons/md'
import { ThreeDots } from 'react-loader-spinner'
import Header from '../Header'
import MapComponent from '../MapComponent/index.'

import './index.css'

class ProfileDetails extends Component {
state = {
    apiStatus: 'INITIAL',
    profileData: {},
}

componentDidMount() {
    this.getProfileData()
}

getProfileData = async () => {
    this.setState({apiStatus: "IN_PROGRESS"})
    try {
        const {match} = this.props
        const {id} = match.params
        const response = await axios.get(`/api/persons/${id}`)
        this.setState({apiStatus: "SUCCESS", profileData: response.data})
    }
    catch(error) {
        this.setState({apiStatus: "FAILURE"})
        console.log(error.message)
    }

}

renderProfileDetails = () => {
    const {profileData} = this.state
    const interest = JSON.parse(profileData.interest)
    const {location} = profileData
    const loc = location.split(', ')
    const lat = parseFloat(loc[0])
    const lng = parseFloat(loc[1])
    return (
    <div className="profile-details-section">
        <div className="profile-details-container">
            <div className="profile-top-row">
                <img
                    src={profileData.photograph}
                    alt="avatar"
                    className="profile-logo"
                />
                <h5 className="profile-title">{profileData.name}</h5>
            </div>
            <div className='more-profile-details-container'>
                <div className="more-detail-item">
                    <MdOutlineEmail className="job-icon" />
                    <p className="icon-label">{profileData.email}</p>
                </div>
                <div className="more-detail-item">
                    <MdCall className="job-icon" />
                    <p className="icon-label">{profileData.phone}</p>
                </div>
            </div>

            <hr className="line" />
            <h1 className="description-heading">Description</h1>

            <p className="profile-description">{profileData.description}</p>
            <h4 className="interest-heading">Interest</h4>
            <ul>
                {interest.map(item => <li key={item} className='interest-item'>{item}</li>)}
            </ul>
            <h1 className="location-heading">Location</h1>
            <div className="map-container">
                <MapComponent lat={lat} lng={lng} />
            </div>
        </div>
    </div>
    )
}

renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
    <ThreeDots color="#fff" width={50} height={50} />
    </div>
)

renderFailureView = () => {
    return (
    <div className="profile-failure-view">
        <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
        />
        <h5 className="failure-heading">Oops! Something Went Wrong</h5>
        <p className="failure-description">
        We cannot seem to find the page you are looking for.
        </p>
    </div>
    )
}

renderResult = () => {
    const {apiStatus} = this.state
    if (apiStatus === 'SUCCESS') {
    return this.renderProfileDetails()
    } else if (apiStatus === 'IN_PROGRESS') {
    return this.renderLoadingView()
    } else if (apiStatus === 'FAILURE') {
    return this.renderFailureView()
    }
    return null
}

render() {
    return (
    <div className="profile-details-main-container">
        <Header />
        {this.renderResult()}
    </div>
    )
}
}
export default ProfileDetails

