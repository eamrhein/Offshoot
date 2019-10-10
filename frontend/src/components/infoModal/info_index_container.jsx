import {connect} from 'react-redux';
import { toggleModal} from '../../actions/ui_actions';
import InfoModal from '../infoModal/infoModal'
const mapStateToProps = state => ({
  currentUser: state.session.user,
  infoModalText: "How to Browse",
  navGif: "",
  currentModal: state.ui.currentModal
  
})

const mapDispatchToProps = dispatch => ({
  toggleModal: modal => dispatch(toggleModal(modal))
})


export default connect(mapStateToProps, mapDispatchToProps)(InfoModal)
