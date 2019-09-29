import React from 'react';
import axios from 'axios';
class PanelForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      panel:{
        authorId: '',
        title: '',
        panelText: '',
        photoURL: '',
        childId: [],
        parentId: null,
        likes: 0
      },
      photoFile: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.photoReader = this.photoReader.bind(this);
    this.sendPanel = this.sendPanel.bind(this);
  }

  componentDidMount(){
    if (this.props.formType === 'edit') {
      this.props.fetchPanel(this.props.match.params.panelId)
        .then(() => {
          this.setState({ panel: this.props.panels[this.props.match.params.panelId] })
        })
    } else if (this.props.formType === 'branch') {
      this.setState({panel: {parentId: this.props.match.params.panelId}})
    }
  }
  handleSubmit(e){
    e.preventDefault();
    this.getSignedPhotoRequest(this.state.photoFile);
    //Need logic to handle how we want behavior after action.
  }
  handleChange(form){
    return(e) => {
      let pannelTochange = this.state.panel;
      pannelTochange[form] = e.target.value;
      this.setState({panel: pannelTochange});
    }
  }

  sendPanel() {
    const panel = this.state.panel;
    console.log(panel);
    panel.authorId = this.props.currentUser.id;
    this.props.action(panel)

      .then((childPanel) => {
        if (childPanel.panel.data.parentId && this.props.formType === 'branch') {

          this.props.fetchPanel(childPanel.panel.data.parentId)
            .then(parentPanel => {
              parentPanel.panel.data.childIds.push(childPanel.panel.data.id)

              this.props.updatePanel(parentPanel.panel.data)
                .then(() => (this.props.history.push(`/panels/${childPanel.panel.data.id}`)))
            }, err => console.log(err));
        } else {
          this.props.authorRoot({ userId: this.props.currentUser.id, rootId: childPanel.panel.data.id})
            .then(() => {
              this.props.history.push(`/panels/${childPanel.panel.data.id}`)

            })
        }
      }, err => console.log(err));
  }

  photoReader(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () => this.setState({ photoURL: reader.result, photoFile: file });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ panel: {photoURL: ""}, photoFile: null });
    }
  }

  getSignedPhotoRequest(photo) {

    const res = axios.get(`/api/images?file-name=${photo.name}&file-type=${photo.type}`)
      .then( res => {
          console.log(res);
          const { signedRequest, url } = res.data;
          this.uploadFile(photo, signedRequest, url)
        },
        err => console.log(err)
      );
    console.log(res);
  }

  uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const {title, authorId, panelText, childId, parentId, likes} = this.state.panel;
          console.log(url);
          //const newURL = /com\/.+(\.jpg|\.png|\.gif|\.bmp|\.tiff|\.jpeg).+/.exec(url); newURL[0].slice(4)
          this.setState({ panel: {photoURL: url, title: title, authorId: authorId, panelText: panelText,
          childId: childId, parentId: parentId, likes: likes}});
          this.sendPanel();
        }
        else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }

  render(){
    return (
    <form className='create-panel-form' onSubmit={this.handleSubmit}>

      <h1 className='panel-form-title'>{this.props.formType}</h1>
      <label >
        Title
        <input type="text" onChange={this.handleChange('title')} />
      </label>
      {/* UNFINISHED FOR AWS */}
      <label className="image-input">
      <input id="file-input" type="file" onChange={this.photoReader} />
      <div className="image-input-label">upload an image</div>
      {this.state.photoURL ? (<img src={this.state.photoURL} alt={this.state.panel.title} className="image-preview" />) : ""}
      </label>
      {/* <label>
        Photo
      </label>
      <input onChange={e => this.setState({})}/> */}
      <label >
        Caption
        <textarea cols="30" rows="10" onChange={this.handleChange('panelText')} value={this.state.panel.panelText}></textarea>
      </label>
      <input type="submit" value={this.props.formType}/>
    </form>)
  }
}

export default PanelForm;

