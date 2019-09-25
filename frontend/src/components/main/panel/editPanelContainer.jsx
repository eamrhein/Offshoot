
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PanelForm from './panelForm';
import { createPanel, fetchPanel } from '../../../actions/panel_actions';
const mapStateToProps = state => ({
  formType: 'edit',
  currentUser: state.session.user,
  panels: state.entities.panels
});

const mapDispatchToProps = dispatch => ({
  //NEED THE CREATE PANEL
  action: (panel) => console.log('Editactionplaceholder here is the panel!', panel),
  // action: panel => dispatch(UpdatePanel(panel))
  fetchPanel: (id) => dispatch(fetchPanel(id))

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PanelForm));