import React from 'react';
import {connect} from 'react-redux'
 // incorporate infinite scrolling
// Fetch only roots 
// display the root cards 
// Can make a fake list of cards to call the reload

// for accessing the panels from state
const mapStateToProps = state => ({
  panels: state.entities.panels
});

// for fetching panels
const mapDispatchToProps = dispatch => ({
  // fetchPanels: () => dispatch(fetchPanels())
});

//adding styling for dummy divs to test scrolling 
// DELETE AFTER FETCH ACTION IMPLEMENTATION
const styles = {width: '200px', height: '100px', border: '1px solid black', padding: '20px', margin: '10px'}
const dummyDiv1 = <div style={styles} >this is a dummydiv1{Math.random() * 1000}</div>
const dummyDiv2 = <div style={styles} >this is a dummydiv2{Math.random() * 1000}</div>
const dummyDiv3 = <div style={styles} >this is a dummydiv3{Math.random() * 1000}</div>
const startingList = [dummyDiv1, dummyDiv2, dummyDiv3, dummyDiv1, dummyDiv2]

class HomeIndex extends React.Component {
  constructor(props){
    super(props)
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {panels : []}
  }

  componentDidMount(){
    //fetch panels
    // add them to state
    // this.props.fetchPanels().then(()=> {
    //   this.setState({panels: this.state.panels.concat(this.props.panels)})
    // })
    this.setState({panels: this.state.panels.concat(startingList)});
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  componentDidUpdate(){
    //update the state with the panels
    // remove the previous panels, maybe
  
  }
  handleScroll(){
    let lastPanel = document.querySelector('.panel-index').lastChild;
    let lastPanelOffset = lastPanel.offsetTop + lastPanel.clientHeight
    let containerOffset = window.innerHeight + window.pageYOffset;

    if (containerOffset > lastPanelOffset) {
      this.setState({panels: this.state.panels.concat(dummyDiv1).concat(dummyDiv2)})

    //IMPLEMENT DURING INTEGRATION
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
      <div className='panel-index'>
        {this.state.panels}
      </div>
    )
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex);

