// Temporary File To show react is working
import React from 'react';
import HomeIndex from './homeindex';

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <h1>Offshoot</h1>
        <HomeIndex />
        <footer>
          
          Copyright &copy; 2019
        </footer>
      </div>
    );
  }
}

export default MainPage;
