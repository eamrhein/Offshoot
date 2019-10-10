import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {closeModals, toggleModal} from '../../actions/ui_actions'
const mapStateToProps = state => ({
  currentModal: state.ui.currentModal,
  currentUser: state.session.user
})
const mapDispatchtoProps = dispatch => ({
  toggleModal: modal => dispatch(toggleModal(modal)),
  closeModals: () => dispatch(closeModals())
})

class InfoModal extends React.Component{ 
  constructor(props){
    super(props)
    this.state = {text: '', gif:'', hidden: 'hidden'}
    this.IndexInfo = { text: 'To scroll, go down', gif: 'browse.gif'}
  }

  componentDidMount(){
    // this.props.history.listen(location, )
    this.listen = this.props.history.listen(location => {
      console.log(location, 'hey this is the location')
      if (location.pathname === '/'){
        
        this.setState({text: this.IndexInfo.text, gif: this.IndexInfo.gif}, () => {
          this.props.toggleModal('info-modal')
        })
      } 
    })
    if(this.props.currentUser.username === 'demo'){
      this.setState({hidden: ''});
      this.props.toggleModal('info-modal');
    }
  }


  render(){
    return (
      <div className={`info-modal-container ${this.props.currentModal === 'info-modal' ? '' : 'hidden'}`}>
        <div onClick={this.props.closeModals} className={`info-background ${this.props.currentModal === 'info-modal' ? '' : 'hidden'}`}>
        </div>
        <div className={`info-modal ${this.props.currentModal === 'info-modal' ? '' : 'hidden'}`}>

          <div className={`info-text ${this.props.currentModal === 'info-modal' ? '' : 'hidden'}`}>
            <span>{this.state.text}</span>
            <span>
          </span>
          </div>
          <div className={`info-gif ${this.props.currentModal === 'info-modal' ? "" : "hidden"}`}>
            <img src={this.state.gif} alt="navigation gif" />
          </div>


        </div>
      </div>
      
    );
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(InfoModal));



