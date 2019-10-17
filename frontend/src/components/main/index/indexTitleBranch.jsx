import React from 'react';
import Panel from '../../panel/panel';
import Leaf from './leaf'

class indexTitleBrancher extends React.Component {
  constructor(props){
    super(props);
    this.state = {left: [], right: []}
  }
  componentDidMount(){
    this.setOffShootDir();
    // this.setState()
    this.getPanelDims()
    let left = this.growBranch('left',this.props.panel.childIds, this.left, this.bottom, this.height, 1)
    // debugger
    this.setState({left: left})
  }
  
  setOffShootDir(){

    this.props.panel.childIds.forEach(id => {
    this.seed = {left: [], right: []}
      let num = Math.floor(Math.random() * 2 ) 
      if(num === 0){
        this.seed.left.push(id)
      } else {
        this.seed.right.push(id)
      }
    });
    
  }
  // have a set with
  // recursively halve the ypos
  // recursively increase or decrease the xpos depending on the position
  // 
  getPanelDims(){
    let panel = document.getElementById(`${this.props.panel.id}`).getBoundingClientRect();
    this.left = panel.left;
    this.right = panel.right;
    this.top = panel.top;
    this.bottom = panel.bottom;
    this.height = this.bottom - this.top
    // debugger
  }

  // x is the side
  // y is the bottom
  growBranch(dir, arr, x, y, height, lineWidth){
    // debugger
    if (arr.length === 0 || arr[0] === undefined) return [];
    let panels = [];
    let childIdsToRun = [];
    if (dir === 'left'){
      let xOrigin = x;
      let yOrigin = y;
      let yOffset = Math.floor(this.height / (arr.length + 2))
      let xdest = xOrigin - 100;  
      let linewidth = Math.abs(xOrigin - xdest);
      arr.forEach((id, idx) => {
        // debuggert
        let panel = this.props.childPanels[id]
        let  ydest = (yOffset * (idx + 1))
        let lineHeight = Math.abs(ydest - yOrigin)
        panels.push(<svg width={`${this.left}`} height={`${this.height}`} id={`${xOrigin}` + `${panel.id}`} style={{position: 'absolute'}}>
          <line x1={xdest} x2={xOrigin} y1={ydest} y2={yOrigin} stroke={'brown'} strokeWidth={lineWidth}/>
        </svg>)
        panels.push( <Leaf panel={panel} key={id} xpos={xdest} ypos={ydest}/>)
        
        childIdsToRun = childIdsToRun.concat(panel.childIds)
    })
      return panels.concat(this.growBranch('left', childIdsToRun, xdest , y, height / 2, linewidth /  2))
    } else if (dir === 'right'){

    }
    console.log(this.props.panel.id)
    
    //grow branch and then set the state to the branch
    // if 
    // this.seed[dir]
  }
  // need code to trigger on media query

  render(){
    let leftStyles = {
      width: this.left,
      height: this.height
    }
    let rightStyles = {
      width: this.left,
      height: this.height,
    }
    return(<div className={'brancher'}>
      <div className={'left-branch'} style={leftStyles}>
        {this.state.left}
      </div>
      
      <Panel panel={this.props.panel} />
      <div className={'right-branch'} style={rightStyles}>
        {this.state.right}

      </div>
    </div>)
  }
}

export default(indexTitleBrancher);