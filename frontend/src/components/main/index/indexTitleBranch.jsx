import React from 'react';
import Panel from '../../panel/panel';
import Leaf from './leaf'



class indexTitleBrancher extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      right: [], branchWidth: window.innerWidth * 0.7, styles: {
        width: window.innerWidth * 0.7,
        height: this.height,
      }};
    this.handleResize = this.handleResize.bind(this);
    this.toggleLeaves = this.toggleLeaves.bind(this);
    this.handleMouse = this.handleMouse.bind(this);
    this.leafClass = 'leaf' + this.props.panel.id;
    this.containerClass = 'brancher' + this.props.panel.id
    this.leafCounter = 0;
  }
  componentDidMount(){
    this.getPanelDims();
    this.depth = this.props.panelDepth[this.props.panel.id].depth;
    let right = this.growBranch( this.props.panel.childIds, this.right, this.height * 0.8  , this.height * 0.8, 5, window.innerWidth * 0.6);
    this.setState({ right: right, 
      styles: {
        width: window.innerWidth * 0.6,
        height: this.height,
      }
    
    });

    window.addEventListener('resize', this.handleResize);
    this.leafInterval = setInterval(this.toggleLeaves, 5000);
    window.addEventListener('mouseover', this.handleMouse);
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
    window.clearInterval(this.leafInterval);
    window.removeEventListener('mouseover', this.handleMouse);
  }

  handleMouse(e){
    e.preventDefault();
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
      let regrow = this.growBranch( this.props.panel.childIds, this.right, this.height * 0.8, this.height * 0.8, 5, window.innerWidth * 0.6);
      this.setState({
        right: regrow, 
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

  // x is the side
  // y is the bottom
  growBranch(childIds, xOrigin, yOrigin, height, strokeWidth, width){
    let panels = [];
      let yOffset = Math.floor(height / (childIds.length + 1));
      let branchlength = (250 * this.depth) > width ? Math.round( width / (this.depth)) : 250;
      childIds.forEach((id, idx) => {
        // get random branch lengths
        let xdest = xOrigin + (Math.floor(Math.random() * branchlength * 0.25) + branchlength * 0.75);  
        let panel = this.props.childPanels[id];
        let ydest = yOrigin - (yOffset * (idx + 1)) + (Math.floor(Math.random() * 40));
        panels.push(<svg width={`${width}`} height={`${this.height}`} key={`svgContainer` + id} className={'svgContainer'}>
          <line 
            x1={xdest - this.right} 
            x2={xOrigin - this.right} 
            y1={ydest} 
            y2={yOrigin} 
            stroke={'#996633'} 
            strokeWidth={strokeWidth}
            strokeLinecap={'square'}          
            />
        </svg>);
        panels.push( <Leaf panel={panel} class={this.leafClass} key={'leaf' + id} xpos={xdest -  this.right} ypos={ydest * -1 + this.height}/>);
        panels = panels.concat(this.growBranch( panel.childIds, xdest, ydest, yOffset, strokeWidth * 0.75, width ));
    });
    return panels;
  }

  render(){   
    return(<div className={`brancher ${this.containerClass}`}>     
      <Panel panel={this.props.panel} type={'compact'}/>
      <div className={'right-branch'} style={this.state.styles}>
        {this.state.right}
      </div>
    </div>)
  }
}

export default(indexTitleBrancher);