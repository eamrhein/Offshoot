import { connect } from 'react-redux'

import { toggleModal } from '../../actions/ui_actions'
import { logout } from '../../actions/session_actions';
import NavBar from './nav_bar';


const mapStateToProps = (state) => ({
    //this shouldn't be necessary later
    currentUser: state.session.user || {isSignedIn: null},
    isSignedIn: state.session.isAuthenticated || false,
    currentModal: state.ui.currentModal
})

const mapDispatchToProps = (dispatch) => ({
    toggleModal: (modal) => dispatch(toggleModal(modal)),
    logout: () => dispatch(logout()),

})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
