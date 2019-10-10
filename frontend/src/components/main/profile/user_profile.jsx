import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchUserProfile} from '../../../actions/profile_actions';
import ProfileAuthoredIndexContainer from '../index/profile_authored_index_container';
const mapStateToProps = state => ({
  userProfiles: state.entities.userProfiles
})

const mapDispatchToProps = dispatch => ({
  fetchUserProfile: userId => dispatch(fetchUserProfile(userId))
})


class ProfileShow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
          username: '',
          followedRoots: [],
          authoredRoots: []
    }
  }

  componentDidMount(){
    this.props.fetchUserProfile(this.props.match.params.userId).then((res) => {
      this.setState(res.userProfile.data,);
    })
  }

  render() {
    return(
      <div className='profile-page'>
        <div className='profile-info'>
          <div className="username">
            <img src="acorn-icon-black.png" className="acorn-icon"></img>
            <span>{`${this.state.username}`}</span>
          </div>
          <h2>
            Authored Roots
          </h2>
        </div>

      <ProfileAuthoredIndexContainer ProfilePanels={this.state.authoredRoots} />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileShow));