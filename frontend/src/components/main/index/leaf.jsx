import React from 'react';

class Leaf extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    let styles = {
      position: "absolute", 
      top: this.props.ypos, 
      left: this.props.xpos
    }
    return(
      <div style={styles}>
        {this.props.panel.title.slice(0, 10)}
        {/* {this.props.panel.rootId} */}
      </div>
    )
  }
}

export default Leaf;