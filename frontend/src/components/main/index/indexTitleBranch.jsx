import React from 'react';
import Panel from '../../panel/panel';
import Leaf from './leaf'

class indexTitleBrancher extends React.Component {
  constructor(props){
    super(props);
    this.state = { right: []}
  }
  componentDidMount(){
    this.setOffShootDir();
    this.getPanelDims()

    let right = this.growBranch('right', this.props.panel.childIds, this.right, this.height * 0.8  , this.height * 0.8, 5)

    this.setState({ right: right})
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
    this.left = panel.left * 1.75;
    this.right = panel.right;
    this.top = panel.top;
    this.bottom = panel.bottom;
    // this.height = this.bottom - this.top
    this.height = 350;
    // debugger
  }

  // x is the side
  // y is the bottom
  growBranch(dir, arr, x, y, height, lineWidth){
    // debugger
    // if (arr.length === 0 || arr[0] === undefined) return [];
    let panels = [];
    // let childIdsToRun = [];
      let xOrigin = x;
      let yOrigin = y;
      let yOffset = Math.floor(height / (arr.length + 1))
      arr.forEach((id, idx) => {
        // get random branch lengths
        let xdest = xOrigin + ((Math.floor(Math.random() * 200) + 75) * (dir === 'left' ? -1 : 1));  
        // let xdest = xOrigin + (150) * (dir === 'left' ? -1 : 1);  

        let panel = this.props.childPanels[id]
        let  ydest = yOrigin - (yOffset * (idx + 1)) + (Math.floor(Math.random() * 40))
        // let lineHeight = Math.abs(ydest - yOrigin)
        panels.push(<svg width={`${this.left}`} height={`${this.height}`} id={`${xOrigin}` + `${panel.id}`} className={'svgContainer'}>
          <line x1={xdest - (dir === 'left' ? 0 : this.right)} x2={xOrigin - (dir === 'left' ? 0 : this.right)} y1={ydest} y2={yOrigin} stroke={'brown'} strokeWidth={lineWidth}/>
        </svg>)
        panels.push( <Leaf panel={panel} key={id} xpos={xdest - (dir === 'left' ? 0 : this.right)} ypos={ydest * -1 + this.height}/>)
        panels = panels.concat(this.growBranch((dir === 'left' ? 'left' : 'right'), panel.childIds, xdest, ydest, yOffset, lineWidth * 0.75 ))
        // childIdsToRun = childIdsToRun.concat(panel.childIds)
    })
    return panels
  }
  // need code to trigger on media query

  render(){

    let rightStyles = {
      width: this.left,
      height: this.height,
    }
    return(<div className={'brancher'}>

      
      <Panel panel={this.props.panel} type={'compact'}/>
      <div className={'right-branch'} style={rightStyles}>
        {this.state.right}

      </div>
    </div>)
  }
}

export default(indexTitleBrancher);