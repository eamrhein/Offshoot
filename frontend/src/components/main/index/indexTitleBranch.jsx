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
      }}
    this.handleResize = this.handleResize.bind(this)
    this.leavesToControl = []
  }
  componentDidMount(){
    this.getPanelDims()

    let right = this.growBranch('right', this.props.panel.childIds, this.right, this.height * 0.8  , this.height * 0.8, 5, window.innerWidth * 0.7)

    this.setState({ right: right, 
      styles: {
        width: window.innerWidth * 0.7,
        height: this.height,
      }
    
    })
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize(){
    
    let pan = document.getElementById(`${this.props.panel.id}`).getBoundingClientRect();
    if (Math.abs(this.right - pan.right) > 100) { 
  
      this.left = pan.left * 2
      this.right = pan.right
      let regrow = this.growBranch('right', this.props.panel.childIds, this.right, this.height * 0.8, this.height * 0.8, 5, window.innerWidth * 0.7)
      this.setState({
        right: regrow, 
        styles: {
          width: window.innerWidth * 0.7,
          height: this.height,
        }
      })
    } else {
      this.setState({
        styles: {
          width: window.innerWidth * 0.7,
          height: this.height,
        }
      })
    }
    
  }

  getPanelDims(){
    let panel = document.getElementById(`${this.props.panel.id}`).getBoundingClientRect();
    this.left = panel.left * 2;
    this.right = panel.right;
    this.top = panel.top;
    this.bottom = panel.bottom;
    // this.height = this.bottom - this.top
    this.height = 350;
    // this.currentWidth = window.innerWidth;
    // this.listenForResize = window.addEventListener('resize', () => {
    //   let newLeftDims = document.getElementById(`${this.props.panel.id}`).getBoundingClientRect().left;
    //   let multiplier = window.innerWidth > this.currentWidth ? 1 : -1;
    //   let deltaX = Math.abs(this.currentWidth - window.innerWidth) * multiplier;
    //   // this.setState({xOffset: newLeftDims - this.left})
      
    //   this.setState({xOffset: deltaX})
    //   this.currentWidth = window.innerWidth;
    // });
  }

  // x is the side
  // y is the bottom
  growBranch(dir, arr, x, y, height, lineWidth, width){
    let panels = [];
      let xOrigin = x;
      let yOrigin = y;
      let yOffset = Math.floor(height / (arr.length + 1))
      arr.forEach((id, idx) => {
        // get random branch lengths
        let xdest = xOrigin + ((Math.floor(Math.random() * 200) + 75) * (dir === 'left' ? -1 : 1));  
        // let xdest = xOrigin + (150) * (dir === 'left' ? -1 : 1);  
        this.leavesToControl.push(id)
        let panel = this.props.childPanels[id]
        let  ydest = yOrigin - (yOffset * (idx + 1)) + (Math.floor(Math.random() * 40))
        // let lineHeight = Math.abs(ydest - yOrigin)
        panels.push(<svg width={`${width}`} height={`${this.height}`} key={`svgContainer` + id} className={'svgContainer'}>
          <line 
            x1={xdest - (dir === 'left' ? 0 : this.right)} 
            x2={xOrigin - (dir === 'left' ? 0 : this.right)} 
            y1={ydest} 
            y2={yOrigin} 
            stroke={'brown'} 
            strokeWidth={lineWidth}
            strokeLinecap='round'
            
            />
        </svg>)
        panels.push( <Leaf panel={panel} className={'leaf' + this.props.panel.id} key={'leaf' + id} xpos={xdest - (dir === 'left' ? 0 : this.right)} ypos={ydest * -1 + this.height}/>)
        panels = panels.concat(this.growBranch((dir === 'left' ? 'left' : 'right'), panel.childIds, xdest, ydest, yOffset, lineWidth * 0.75, width ))
    })
    return panels
  }



  render(){

    
    return(<div className={'brancher'}>

      
      <Panel panel={this.props.panel} type={'compact'}/>
      <div className={'right-branch'} style={this.state.styles}>
        {this.state.right}

      </div>
    </div>)
  }
}

export default(indexTitleBrancher);