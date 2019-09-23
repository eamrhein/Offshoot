import { connect } from 'react-redux'

import NavBar from './nav_bar';


const mapStateToProps = (state) => ({
    currentUser: state.session.user,
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
