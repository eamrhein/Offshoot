import { connect } from 'react-redux';
import { fetchPanels } from '../../../actions/panel_actions';
import ConditionalIndex from './conditional_Index';
const mapStateToProps = state => ({
  panels: state.entities.panels,
  indexType: 'Like',
  panelIdsToFetch: state.session.user.followedRoots
});

// for fetching panels
const mapDispatchToProps = dispatch => ({
  fetchPanels: (panelsIdArr) => dispatch(fetchPanels(panelsIdArr))

});

export default connect(mapStateToProps, mapDispatchToProps)(ConditionalIndex)