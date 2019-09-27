import { connect } from 'react-redux';
import { fetchPanels, clearPanelState } from '../../../actions/panel_actions';
import ConditionalIndex from './conditional_Index';
const mapStateToProps = state => ({
  panels: state.entities.panels,
  indexType: 'Like',
  panelIdsToFetch: state.session.user.followedRoots
});

// for fetching panels
const mapDispatchToProps = dispatch => ({
  fetchPanels: (panelsIdArr) => dispatch(fetchPanels(panelsIdArr)),
  clearPanelState: () => dispatch(clearPanelState())

});

export default connect(mapStateToProps, mapDispatchToProps)(ConditionalIndex)