import axios from 'axios'
import { Component } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileItem from '../ProfileItem'
import './index.css'

class Profiles extends Component {
    state = {
        apiStatus: '',
        profilesList: [],
        searchQuery: ''
    }

    componentDidMount() {
        this.geProfilesData()
    }

    geProfilesData = async () => {
        this.setState({apiStatus: "IN_PROGRESS"})
        try{
            const response = await axios.get("/api/persons");
            this.setState({apiStatus: "SUCCESS", profilesList: response.data})
        }
        catch(error) {
            this.setState({apiStatus: "FAILURE"})
            console.log('error');
        }
    }

    onClickSearchButton = () => {
        this.geProfilesData()
    }

    updateSearchQuery = event => {
        this.setState({searchQuery: event.target.value})
    }

    renderProfilesList = () => {
        const {profilesList, searchQuery} = this.state
        return (
        <div className="profiles-banner-container">
            <div className="search-container-lg">
            <input
                type="search"
                className="searchEl"
                placeholder="Search"
                id="searchEl"
                value={searchQuery}
                onChange={this.updateSearchQuery}
            />
            <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearchButton}
            >
                <BsSearch className="search-icon" />
            </button>
            </div>
            <ul className="profiles-container">
            {profilesList.map(profile => (
                <ProfileItem profile={profile} key={profile.id} />
            ))}
            </ul>
        </div>
        )
    }

    renderLoadingView = () => {
        return (
        <div className="loader-container" data-testid="loader">
            <ThreeDots color="#ffffff" height="50" width="50" />
        </div>
        )
    }

    renderFailureView = () => (
        <div className="jobs-failure-view">
        <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failure-img"
        />
        <h5 className="failure-heading">Oops! Something Went Wrong</h5>
        <p className="failure-description">
            We cannot seem to find the page you are looking for.
        </p>
        <button className="retry-btn" onClick={this.getJobsData}>
            Retry
        </button>
        </div>
    )

    render() {
        return (
            <div className='profiles-page'>
                <Header />
                {this.renderProfilesList()}
            </div>
        )
    }
}
export default Profiles
