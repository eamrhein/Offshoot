
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PanelForm from './panelForm';
import {createPanel} from '../../../actions/panel_actions';
import {authorRoot} from '../../../actions/user_actions'
const mapStateToProps = state => ({
  formType: 'create',
  currentUser: state.session.user
});

const mapDispatchToProps = dispatch => ({
  //NEED THE CREATE PANEL
  // action: (panel) => console.log('actionplaceholder here is the panel!', panel)
  action: panel => dispatch(createPanel(panel)),
  authorRoot: (userAndpanelIds) => dispatch(authorRoot(userAndpanelIds))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PanelForm));