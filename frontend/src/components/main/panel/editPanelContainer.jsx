
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PanelForm from './panelForm';
import {fetchPanel, updatePanel } from '../../../actions/panel_actions';
import { authorRoot } from '../../../actions/user_actions';

const mapStateToProps = state => ({
  formType: 'edit',
  currentUser: state.session.user,
  panels: state.entities.panels
});

const mapDispatchToProps = dispatch => ({
  action: (panel) => dispatch(updatePanel(panel)),
  fetchPanel: (id) => dispatch(fetchPanel(id)),
  authorRoot: (userAndpanelIds) => dispatch(authorRoot(userAndpanelIds))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PanelForm));