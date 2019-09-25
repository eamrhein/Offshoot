
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PanelForm from './panelForm';
import { createPanel } from '../../../actions/panel_actions';
const mapStateToProps = state => ({
  formType: 'edit',
  currentUser: state.session.user
});

const mapDispatchToProps = dispatch => ({
  //NEED THE CREATE PANEL
  action: (panel) => console.log('Editactionplaceholder here is the panel!', panel)
  // action: panel => dispatch(UpdatePanel(panel))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PanelForm));