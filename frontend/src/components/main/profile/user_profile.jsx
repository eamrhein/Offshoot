import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchUserProfile} from '../../../actions/profile_actions';
import { followRoot } from '../../../actions/user_actions';
import IndexContainer from '../index/liked_index_container';
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
      this.setState(res.userProfile.data)
    })
  }

  render() {
    return(
      <div className='profile-page'>
        {`${this.state.username}'s Profile Page`}
      <IndexContainer ProfilePanels={this.state.authoredRoots} />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileShow));