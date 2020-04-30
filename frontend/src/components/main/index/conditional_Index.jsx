import React from 'react';
import IndexTitleBrancher from './indexTitleBranch'
import Panel from '../../panel/panel'
class ConditionalIndex extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      panels : [], 
      panelsIdsToRender : []
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.rebuildAllPanels= this.rebuildAllPanels.bind(this);
  }

  componentDidMount(){
    this.loadedPanelIds = [];
    if (this.props.ProfilePanels === undefined){
      const { panelIdsToFetch, indexType } = this.props;
      if (panelIdsToFetch.length > 0 || indexType === 'Main' || indexType === 'Like') {
        this.fetchAndLoadPannels(panelIdsToFetch);
      } 
    } else if (this.props.indexType === 'Profile') {
      if (this.props.ProfilePanels.length > 0) {
        this.fetchAndLoadPannels(this.props.ProfilePanels)
      }

    }
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.rebuildAllPanels)
  }

  rebuildAllPanels(){
    if((window.innerWidth < 550 && this.props.indexType) || this.props.indexType === 'Like'){
      let mobilePanels = this.state.panelsIdsToRender
         .map(id => <Panel panel={this.props.panels[id]} key={'panel' + id} />)
         this.setState({panels: mobilePanels});
    } else if(this.props.indexType !== 'Like') {
      let branchingPanels = this.state.panelsIdsToRender
        .map(id => <IndexTitleBrancher panel={this.props.panels[id]} key={'idxBranch' + id} childPanels={this.props.childPanels} panelDepth={this.props.panelDepth}/>)
        this.setState({panels: branchingPanels});
    }
  }

  buildOnePanel(id){
    if ((window.innerWidth < 550 && this.props.indexType) || this.props.indexType === 'Like'){
      let panel = (<Panel panel={this.props.panels[id]} key={'panel' + id} />)
      this.setState({panels: this.state.panels.concat([panel]), panelsIdsToRender: this.state.panelsIdsToRender.concat[id]})
    } else if(this.props.indexType !== 'Like') {
      let branchingPanels = (<IndexTitleBrancher panel={this.props.panels[id]} key={'idxBranch' + id} childPanels={this.props.childPanels} panelDepth={this.props.panelDepth}/>)
      this.setState({ panels: this.state.panels.concat([branchingPanels]), panelsIdsToRender: this.state.panelsIdsToRender.concat([id]) })

    }
  }

  fetchAndLoadPannels(idsArr){
    this.props.fetchPanels(idsArr)
      .then(() => {
        let idsToFetchChildren = Object.keys(this.props.panels)
        this.props.fetchChildren(idsToFetchChildren).then(() => {
          this.loadedPanelIds = Object.keys(this.props.panels).reverse()
            //panel object threaded to panel component
          this.setState({ panelsIdsToRender: this.state.panelsIdsToRender.concat(this.loadedPanelIds.splice(0, 7)) }, ()=> {
            this.rebuildAllPanels()
          })
        }); 
      });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.rebuildAllPanels);
    this.props.clearPanelState();
    this.props.clearChildState();
  }

  handleScroll(){
    if (this.loadedPanelIds.length > 0){
      let lastPanel = document.querySelector('.panel-index').lastChild;
      let lastPanelOffset = lastPanel.offsetTop + lastPanel.clientHeight
      let containerOffset = window.innerHeight + window.pageYOffset;
      if (containerOffset > lastPanelOffset) {
        this.buildOnePanel(this.loadedPanelIds.shift())
      }
    }
  }

  render(){
    return (
      <div className="panel-index">
        {this.state.panels}
        {Object.keys(this.state.panels).length > 0 ? <span className="footer-text"><div>Leaf Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div></span> : ''}
      </div>
    );
  }
}

export default ConditionalIndex;

