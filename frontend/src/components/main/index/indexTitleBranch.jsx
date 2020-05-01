import React from 'react';
import Panel from '../../panel/panel';
import Leaf from './leaf'

class indexTitleBrancher extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      branchElements: [], branchWidth: window.innerWidth * 0.7, styles: {
        width: window.innerWidth * 0.7,
        height: this.height,
      }};
    this.handleResize = this.handleResize.bind(this);
    this.toggleLeaves = this.toggleLeaves.bind(this);
    // this.handleMouse = this.handleMouse.bind(this);
    this.leafClass = 'leaf' + this.props.panel.id;
    this.containerClass = 'brancher' + this.props.panel.id
    this.leafCounter = 0;
  }

  componentDidMount(){
    this.getPanelDims();
    this.depth = this.props.panelDepth[this.props.panel.id].depth;
    let branchElements = this.growBranch( this.props.panel.childIds, this.right, this.height * 0.8  , this.height * 0.8, 5, window.innerWidth * 0.6);
    this.setState({ 
      branchElements: branchElements, 
      styles: {
        width: window.innerWidth * 0.6,
        height: this.height,
      }
    });
    window.addEventListener('resize', this.handleResize);
    this.leafInterval = setInterval(this.toggleLeaves, 5000);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
    window.clearInterval(this.leafInterval);
  }

  toggleLeaves(){
    let pan = document.getElementById(`${this.props.panel.id}`).getBoundingClientRect();

    if(pan.bottom > 0  && pan.top < window.innerHeight){
      let leaves = document.querySelectorAll(`.${this.leafClass}`);
      if (leaves.length > 0) {
        let mOver = new MouseEvent('mouseover', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        let mLeave = new MouseEvent('mouseout', {
          view: window,
          bubbles: true,
          cancelable: true
        });

        if (this.previousCounter === undefined && this.leafCounter === 1) {
          this.previousCounter = 0
        }
        if (this.previousCounter !== undefined) {
          leaves[this.previousCounter].dispatchEvent(mLeave);
          this.previousCounter === (leaves.length - 1) ? (this.previousCounter = 0) : (this.previousCounter += 1);
        }
        leaves[this.leafCounter].dispatchEvent(mOver);
        this.leafCounter === (leaves.length - 1) ? (this.leafCounter = 0) : (this.leafCounter += 1);
      }
    }  
  }

  handleResize(){
    let pan = document.getElementById(`${this.props.panel.id}`).getBoundingClientRect();
    if (Math.abs(this.right - pan.right) > 100) { 
      this.left = pan.left * 2;
      this.right = pan.right;
      let regrownElements = this.growBranch( this.props.panel.childIds, this.right, this.height * 0.8, this.height * 0.8, 5, window.innerWidth * 0.6);
      this.setState({
        branchElements: regrownElements, 
        styles: {
          width: window.innerWidth * 0.6,
          height: this.height,
        }
      });
    } else {
      this.setState({
        styles: {
          width: window.innerWidth * 0.6,
          height: this.height,
        }
      });
    }  
  }

  getPanelDims(){
    let panel = document.getElementById(`${this.props.panel.id}`).getBoundingClientRect();
    this.left = panel.left * 2;
    this.right = panel.right;
    this.top = panel.top;
    this.bottom = panel.bottom;
    this.height = 350;
  }

  growBranch(childIds, xOrigin, yOrigin, height, strokeWidth, width){
    let elements = [];
      let yOffset = Math.floor(height / (childIds.length + 1));
      let branchlength = (250 * this.depth) > width ? Math.round( width / (this.depth)) : 250;
      childIds.forEach((id, idx) => {
        // get random branch lengths
        let xdest = xOrigin + (Math.floor(Math.random() * branchlength * 0.25) + branchlength * 0.75); 
        let ydest = yOrigin - (yOffset * (idx + 1)) + (Math.floor(Math.random() * 40)); 
        let panelForLeaf = this.props.childPanels[id];
        elements.push(this.buildSVG(strokeWidth, xOrigin, yOrigin, xdest, ydest, width, id));
        elements.push( <Leaf panel={panelForLeaf} class={this.leafClass} key={'leaf' + id} xpos={xdest - this.right} ypos={ydest * -1 + this.height}/>);
        let nextBranch = this.growBranch( panelForLeaf.childIds, xdest, ydest, yOffset, strokeWidth * 0.75, width );
        elements = elements.concat(nextBranch);
    });
    return elements;
  }

  buildSVG(strokeWidth, xOrigin, yOrigin, xdest, ydest, width, panelId){
    return(
      <svg width={`${width}`} height={`${this.height}`} key={`svgContainer` + panelId} className={'svgContainer'}>
        <line
          x1={xdest - this.right}
          x2={xOrigin - this.right}
          y1={ydest}
          y2={yOrigin}
          stroke={'#996633'}
          strokeWidth={strokeWidth}
          strokeLinecap={'square'}
        />
      </svg>
    );  
  }

  render(){   
    return(<div className={`brancher ${this.containerClass}`}>     
      <Panel panel={this.props.panel} type={'compact'}/>
      <div className={'right-branch'} style={this.state.styles}>
        {this.state.branchElements}
      </div>
    </div>)
  }
}

export default(indexTitleBrancher);