import React from 'react';
import IndexTitleBrancher from './indexTitleBranch'
import Panel from '../../panel/panel'
class ConditionalIndex extends React.Component {
  constructor(props){
    super(props)
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      panels : [], 
      panelsToRender : []

    }
    this.rebuildAllPanels= this.rebuildAllPanels.bind(this);
  }

  componentDidMount(){
    this.loadedPanels = [];
    if (this.props.ProfilePanels === undefined){
      const { panelIdsToFetch, indexType } = this.props;
      if (panelIdsToFetch.length > 0 || indexType === 'Main') {
        this.fetchAndLoadPannels(panelIdsToFetch);
      } 
      window.addEventListener('scroll', this.handleScroll)

    } else if (this.props.indexType === 'Profile') {
      if (this.props.ProfilePanels.length > 0) {
        this.fetchAndLoadPannels(this.props.ProfilePanels)
      }
      window.addEventListener('scroll', this.rebuildAllPanels)

    }
    window.addEventListener('resize', this.rebuildAllPanels)
}
  


  rebuildAllPanels(){
    if(window.innerWidth < 550){
      let mobilePanels = this.state.panelsToRender
         .map(id => <Panel panel={this.props.panels[id]} key={'panel' + id} />)
         this.setState({panels: mobilePanels});
    } else {
      let branchingPanels = this.state.panelsToRender
        .map(id => <IndexTitleBrancher panel={this.props.panels[id]} key={'idxBranch' + id} childPanels={this.props.childPanels} />)
        this.setState({panels: branchingPanels});
    }
  }

  fetchAndLoadPannels(idsArr){
    this.props.fetchPanels(idsArr)
      .then(() => {
        let idsToFetchChildren = Object.keys(this.props.panels)
        this.props.fetchChildren(idsToFetchChildren).then(() => {
          this.loadedPanels = Object.keys(this.props.panels).reverse()
            //panel object threaded to panel component
          this.setState({ panelsToRender: this.state.panelsToRender.concat(this.loadedPanels.splice(0, 7)) }, ()=> {
            this.rebuildAllPanels()
          })
        }); 
      });
    
  }


  // componentDidUpdate(prevProps){
  //   if(prevProps.ProfilePanels !== this.props.ProfilePanels){
  //     if(this.props.ProfilePanels.length > 0)this.fetchAndLoadPannels(this.props.ProfilePanels)
  //   }
  // }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.rebuildAllPanels);
    // could make this a conditional
    // check if the panels exist in the state, if they do add them to the state,
    // if they don't fetch them
    // currently clearing state to prevent overlab between the authored and liked panels
    this.props.clearPanelState();
    this.props.clearChildState();
  }

  handleScroll(){
    if (this.state.panels.length > 1){
      let lastPanel = document.querySelector('.panel-index').lastChild;
      let lastPanelOffset = lastPanel.offsetTop + lastPanel.clientHeight
      let containerOffset = window.innerHeight + window.pageYOffset;

      if (containerOffset > lastPanelOffset) {
        this.setState({ panels: this.state.panels.concat(this.loadedPanels.shift()) })
    }


    // Could be refactored to remove panels off the top as needed
    // this.fetchPanels().then(() => {
    //   let panelsToAdd = this.props.panels
    //   this.state.panels.forEach(panel => {
    //     if (panelsToAdd[panel.id]){
    //       delete panelsToAdd[panel.id];
    //     }
    //   });
    //   this.setState({panels: this.state.panels.concat(panelsToAdd)})})
     }

    // Optional upwards scrolling to remove peices
    //  slicing will in the initial if statement.
    // else {
    //   this.setState({ panels: [dummyDiv1, dummyDiv2].concat(this.state.panels.slice(0, this.state.panels.length - 2)) })
    // }
  }


  render(){
    return (
      <div className="panel-index">
        {this.state.panels}
        {/* {this.state.panels.length === 0 ? <div>{`${this.props.indexType} more panels!`}</div> : ''} */}
        <span>Icon credit</span>
      </div>
    );
  }
}

export default ConditionalIndex;

