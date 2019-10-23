import React from 'react';
import {Link}  from 'react-router-dom'
import LikeButton from '../../panel/like_button';
class Leaf extends React.Component {
  constructor(props){
    super(props)
    this.state = {info : ''}
    this.renderInfo = this.renderInfo.bind(this)
    this.clearInfo = this.clearInfo.bind(this)
    this.memoImg = {}
  }
  renderInfo() {

    let info = (
    <div  className={'leafHover'}>
        <figure >
          {this.memoImg[this.props.panel.id] ? this.memoImg[this.props.panel.id] : (this.memoImg[this.props.panel.id] = (<img src={this.props.panel.photoURL}  alt="" />))}


          {this.props.currentUser !== undefined ?
            <ul className="panel-action-buttons">
            </ul>
            : ""}

        </figure>

        <figcaption className='panel-fig'>
          <div className="panel-text">
            <h1>{this.props.panel.title}</h1>
            {/* <p>{this.props.panel.panelText}</p> */}
          </div>

          {/* {this.props.currentUser !== undefined ?
            <div className="panel-action-buttons">
              <LikeButton panelId={this.props.panelId} likes={this.props.panel.likes} />
              <div className="branch-button-container">
                <Link to={`/panels/${this.props.panel.id}`}>
                  <i className="material-icons branch-button">
                    call_split
                                        </i>
                </Link>
                <span>{this.props.panel.childIds.length}</span>
              </div>
            </div>
            : ""} */}

        </figcaption>
    </div>)
    this.setState({ info: info })
  }

  clearInfo() {
    this.setState({ info: '' })
  }

  render(){
    let styles = {
      bottom: this.props.ypos, 
      left: this.props.xpos
    }
    // let leaf = (<svg xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 400.174 400.174" style="enable-background:new 0 0 400.174 400.174;" xml: space="preserve" width="512" height="512" class=""><g><path style="fill:#9ABC45" d="M201.38,88.422c113.12-12.44,149.88-84,150-84c1.856-3.567,6.252-4.953,9.819-3.097  c1.799,0.936,3.126,2.581,3.661,4.537c37.6,127.52,17.08,215.44-26.08,267.6c-16.709,20.331-38.11,36.296-62.36,46.52  c-22.339,9.474-46.587,13.584-70.8,12c-46.36-3.24-88.68-28-108.32-72.36c-5.032-11.34-8.284-23.388-9.64-35.72  c-2.743-24.717,2.083-49.685,13.84-71.6c12.622-23.385,32.719-41.863,57.08-52.48C172.173,93.833,186.611,89.988,201.38,88.422  L201.38,88.422z" data-original="#45B549" class="active-path" data-old_color="#45B549"></path><path style="fill:#E1F9A4" d="M350.58,7.102c0.099-4.019,3.437-7.198,7.456-7.099c4.019,0.099,7.198,3.437,7.099,7.456  c-0.007,0.296-0.033,0.59-0.076,0.883c0,0.36-6.36,84-88,168.64l-0.76,0.8c-19.18,19.673-40.226,37.436-62.84,53.04l49.04,9.12  c3.909,0.943,6.313,4.876,5.37,8.784c-0.854,3.538-4.189,5.902-7.81,5.536l-64-12c-58.36,36.96-157.28,71.08-165.92,151.6  c-0.535,3.985-4.199,6.782-8.184,6.247c-3.793-0.509-6.544-3.868-6.296-7.687c10.32-96.52,108.4-121.36,174.56-163.56l0.92-0.6  c26.403-16.71,50.861-36.311,72.92-58.44l-5.8-57.4c-0.535-3.985,2.262-7.649,6.247-8.184s7.649,2.262,8.184,6.247  c0.022,0.165,0.039,0.331,0.049,0.497l4.4,44.56C345.18,79.142,350.54,7.422,350.58,7.102L350.58,7.102z" data-original="#009549" class="" data-old_color="#009549"></path></g> </svg>)
    return(
      <div style={styles}  className={`leafContainer`}>
        <Link to={`/panels/${this.props.panel.id}`} >
        <img alt="leaf" 
        src="leaf.png" 
        className={`leaf-icon ${this.props.class}`}
        onMouseEnter={this.renderInfo}
        onMouseLeave={this.clearInfo}
        ></img>
        </Link>
       {this.state.info}
      </div>

    )
  }
}

export default Leaf;