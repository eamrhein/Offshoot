import { connect } from 'react-redux';
import { fetchPanels, clearPanelState } from '../../../actions/panel_actions';
import ConditionalIndex from './conditional_Index';
import { fetchChildren, clearChildState } from '../../../actions/children_actions';

const mapStateToProps = state => ({
  panels: state.entities.panels,
  indexType: 'Like',
  panelIdsToFetch: state.session.user.followedRoots,
  childPanels: state.entities.childPanels

});

// for fetching panels
const mapDispatchToProps = dispatch => ({
  fetchPanels: (panelsIdArr) => dispatch(fetchPanels(panelsIdArr)),
  clearPanelState: () => dispatch(clearPanelState()),
  fetchChildren: (arr) => dispatch(fetchChildren(arr)),
  clearChildState: () => dispatch(clearChildState())

});

export default connect(mapStateToProps, mapDispatchToProps)(ConditionalIndex)