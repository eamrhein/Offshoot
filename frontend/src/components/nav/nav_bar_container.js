import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { toggleModal, closeModals } from '../../actions/ui_actions'
import { logout } from '../../actions/session_actions';
import NavBar from './nav_bar';


const mapStateToProps = (state) => ({
    //this shouldn't be necessary later
    currentUser: state.session.user || {isSignedIn: null},
    authStatus: state.session.isAuthenticated || false,
    currentModal: state.ui.currentModal
})

const mapDispatchToProps = (dispatch) => ({
    toggleModal: (modal) => dispatch(toggleModal(modal)),
    logout: () => dispatch(logout()),
    closeModals: () => dispatch(closeModals())

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
