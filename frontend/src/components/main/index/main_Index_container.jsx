import { connect } from 'react-redux';
import { fetchPanels, clearPanelState } from '../../../actions/panel_actions';
import ConditionalIndex from './conditional_Index';
const mapStateToProps = state => ({
  panels: state.entities.panels,
  indexType: 'Main',
  panelIdsToFetch: ''
});

// for fetching panels
const mapDispatchToProps = dispatch => ({
  fetchPanels: () => dispatch(fetchPanels()),
  clearPanelState: () => dispatch(clearPanelState())
 
});

export default connect(mapStateToProps, mapDispatchToProps)(ConditionalIndex)

