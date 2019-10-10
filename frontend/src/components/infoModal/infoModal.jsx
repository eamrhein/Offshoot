import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {closeModals, toggleModal} from '../../actions/ui_actions'
const mapStateToProps = state => ({
  currentModal: state.ui.currentModal,
  currentUser: state.session.user,
  isAuthenticated: state.session.isAuthenticated
})
const mapDispatchtoProps = dispatch => ({
  toggleModal: modal => dispatch(toggleModal(modal)),
  closeModals: () => dispatch(closeModals())
})

class InfoModal extends React.Component{ 
  constructor(props){
    super(props)
    this.state = { text: '', gif: '', hidden: 'hidden', indexCounter: 0}
    this.IndexInfo = { text: ['Index Info', "second", 'IndexInfo'], gif: ['browse.gif', 'browse.gif', 'browse.gif']}
    this.handleIndexCounter = this.handleIndexCounter.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  componentDidMount(){
    // this.props.history.listen(location, )
    console.log(this.props.location)
    this.listen = this.props.history.listen(location => {
      console.log(location, 'hey this is the location')
      if (location.pathname === '/' && this.props.isAuthenticated === true){
        if(this.props.currentUser.username === 'demo' || this.props.currentUser.authoredRoots.length === 0){
          this.loadIndex();

        }
      } 
    })
    if(this.props.currentUser.username === 'demo'){
      this.loadIndex();
    }
  }

  loadIndex(){
    this.setState({ text: this.IndexInfo.text, gif: this.IndexInfo.gif }, () => {
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
        </div>
      </div>
      
    );
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(InfoModal));



