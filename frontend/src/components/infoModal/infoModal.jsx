import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {closeModals, toggleModal, showInfoModal, hideInfoModal} from '../../actions/ui_actions'
const mapStateToProps = state => ({
  currentModal: state.ui.currentModal,
  currentUser: state.session.user,
  isAuthenticated: state.session.isAuthenticated,
  showInfoModal: state.ui.showInfoModal
  
})
const mapDispatchtoProps = dispatch => ({
  toggleModal: modal => dispatch(toggleModal(modal)),
  closeModals: () => dispatch(closeModals()),
  toggleInfoModal: () => dispatch(showInfoModal()),
  hideInfoModal: () => dispatch(hideInfoModal())
});

class InfoModal extends React.Component{ 
  constructor(props){
    super(props)
    this.state = { text: '', gif: '', hidden: 'hidden', indexCounter: 0, showInfoModal: true}
    this.handleIndexCounter = this.handleIndexCounter.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  
  componentDidMount(){
      if (this.props.location.pathname === '/' && this.props.isAuthenticated === true && this.props.showInfoModal === true){
        if(this.props.currentUser.username === 'demo' || this.props.currentUser.authoredRoots.length === 0){
          this.indexInfo = { text: [
            'Welcome to Offshoot!',
            'Click roots to expand, click again to visit their show page.',
            'Create Roots stories!',
            'Create Roots stories!',
            'Branch off the stories of other users',
            'Like stories that you want to keep track of',
            'Leave comments!',
            'Swipe rigth to navigate backwards from a shoot',
            "Enjoy!", 
          ], 
          gif: [
            'welcome.gif',
            'IndexBrowse.gif', 
            'navToCreate.gif',
            'createRoot.gif', 
            'makeBranch.gif',
            'liking.gif',
            'commentShow.gif',
            'swipeRight.gif',
            'browse.gif'
          ] }
          this.loadModal(this.indexInfo);
        }
      } 
  }

  loadModal(modalInfoToLoad){
    this.setState({ text: modalInfoToLoad.text, gif: modalInfoToLoad.gif }, () => {
      this.props.toggleModal('info-modal')
    })
  }
  handleIndexCounter(num){
    return(()=>{
      this.setState({ indexCounter: this.state.indexCounter + num })

    })
  }

  handleClose(){
    this.setState({text: '', gif: '', indexCounter: 0})
    this.props.closeModals()
  }
  handleCheck(){
    if (this.state.showInfoModal === true){
      this.setState({ showInfoModal: false }, () => (this.props.hideInfoModal()))
    } else if (this.state.showInfoModal === false) {
      this.setState({ showInfoModal: true }, () => (this.props.toggleInfoModal()))
    }
  }

  render(){
    return (
      <div className={`info-modal-container ${this.props.currentModal === 'info-modal' ? '' : 'hidden'}`}>
        <div onClick={this.handleClose} className={`info-background ${this.props.currentModal === 'info-modal' ? '' : 'hidden'}`}>
        </div>
        <div className={`info-modal ${this.props.currentModal === 'info-modal' ? '' : 'hidden'}`}>

          <div className={`info-text ${this.props.currentModal === 'info-modal' ? '' : 'hidden'}`}>
            <span>{this.state.text[this.state.indexCounter]}</span>
            <span>
          </span>
          </div>

          <div className={`info-gif ${this.props.currentModal === 'info-modal' ? "" : "hidden"}`}>
            <img src={this.state.gif[this.state.indexCounter]} alt="navigation gif" />
          </div>
          <div className={'info-modal-nav'}>
            {this.state.indexCounter > 0 ? (<button onClick={this.handleIndexCounter(-1)}>{`<`}</button>) : (<button className={"nonFuncNav"}>{`<`}</button>)}
            <button onClick={this.handleClose}>Close</button>
            {this.state.indexCounter === this.state.text.length - 1 ? ((<button className={"nonFuncNav"}>{`>`}</button>)) : (<button onClick={this.handleIndexCounter(1)}>{`>`}</button>)}

          </div>
          <div className='modal-check'>
            <span>Do not show again </span>
            <input 
              type="checkbox"  
              onChange={this.handleCheck} 
              checked={!this.state.showInfoModal}
            /> 
      
          </div>
        </div>
        
      </div>
      
    );
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(InfoModal));



