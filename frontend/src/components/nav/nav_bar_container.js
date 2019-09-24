import { connect } from 'react-redux'

import { toggleModal } from '../../actions/ui_actions'

import NavBar from './nav_bar';


const mapStateToProps = (state) => ({
    //this shouldn't be necessary later
    currentUser: state.session.user || {isSignedIn: null},
    currentModal: state.ui.currentModal
})

const mapDispatchToProps = (dispatch) => ({
    toggleModal: (modal) => dispatch(toggleModal(modal))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
