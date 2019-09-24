import { connect } from 'react-redux'

import { receive}

import NavBar from './nav_bar';


const mapStateToProps = (state) => ({
    //this shouldn't be necessary later
    currentUser: state.session.user || {isSignedIn: null},
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
