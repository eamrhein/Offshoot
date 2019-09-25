import React from 'react';

class PanelForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      panel:{
        authorId: '',
        title: 'default state',
        panelText: '',
        photoURL: '',
        childId: [],
        parentId: null, 
        likes: 0
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    // if (this.props.formType = 'edit') this.setState({panel: this.props.currPanel })
    // if (this.props.formType = 'branch') this.setState({panel: {parentId: this.props.match}})
  }
  handleSubmit(e){
    // debugger
    e.preventDefault();
    const panel = this.state.panel;
    panel.authorId = this.props.currentUser.id;
    this.props.action(panel)
      .then((panel)=> {
        debugger
        this.props.history.push(`/panels/${panel.data.id}`)});
    //Need logic to handle how we want behavior after action. 
  }
  handleChange(form){
    return(e) => {
      let pannelTochange = this.state.panel;
      pannelTochange[form] = e.target.value;
      this.setState({panel: pannelTochange});
    }
  }

  render(){
    return (
    <form className='create-panel-form' onSubmit={this.handleSubmit}>
      <div className='panel-form-title'>{this.props.formType}</div>
      <label >
        Title
        <input type="text" onChange={this.handleChange('title')} value={this.state.panel.title}/>
      </label>
      {/* UNFINISHED FOR AWS */}
      {/* <label>
        Photo
      </label>
      <input onChange={e => this.setState({})}/> */}
      <label >
        Panel Text
        <textarea cols="30" rows="10" onChange={this.handleChange('panelText')} value={this.state.panel.panelText}></textarea>
      </label>

      <input type="submit" value={this.props.formType}/>
    </form>)
  }
}

export default PanelForm;