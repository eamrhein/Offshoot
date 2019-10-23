import { connect } from 'react-redux';
import { fetchPanels, clearPanelState } from '../../../actions/panel_actions';
import {fetchChildren, clearChildState} from '../../../actions/children_actions'
import ConditionalIndex from './conditional_Index';
const mapStateToProps = state => ({
  panels: state.entities.panels,
  childPanels: state.entities.childPanels,
  panelDepth: state.entities.panelDepth,
  indexType: 'Main',
  panelIdsToFetch: ''
});

// for fetching panels
const mapDispatchToProps = dispatch => ({
  fetchPanels: (arr) => dispatch(fetchPanels(arr)),
  clearPanelState: () => dispatch(clearPanelState()),
  fetchChildren: (arr) => dispatch(fetchChildren(arr)),
  clearChildState: () => dispatch(clearChildState())

});

export default connect(mapStateToProps, mapDispatchToProps)(ConditionalIndex)

