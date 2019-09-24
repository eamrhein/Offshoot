
import { connect } from 'react-redux';
import PanelForm from './panelForm';
const mapStateToProps = state => ({
  formType: 'create'

});

const mapDispatchToProps = dispatch => ({
  //NEED THE CREATE PANEL
  action: (panel) => console.log('actionplaceholder here is the panel!', panel)
  // action: panel => dispatch(createPanel(panel))
});

export default connect(mapStateToProps, mapDispatchToProps)(PanelForm);