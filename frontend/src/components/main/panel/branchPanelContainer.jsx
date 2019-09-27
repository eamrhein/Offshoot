
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PanelForm from './panelForm';
import { createPanel,fetchPanel, updatePanel } from '../../../actions/panel_actions';
const mapStateToProps = state => ({
  formType: 'branch',
  currentUser: state.session.user
});

const mapDispatchToProps = dispatch => ({
  action: panel => dispatch(createPanel(panel)),
  fetchPanel: panel => dispatch(fetchPanel(panel)),
  updatePanel: panel => dispatch(updatePanel(panel))
  
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PanelForm));