import { connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PanelForm from './panelForm';
const mapStateToProps = state => ({
  formType: 'branch'

});

const mapDispatchToProps = dispatch => ({
  //NEED THE CREATE PANEL
  // action: panel => dispatch(createPanel(panel))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PanelForm));