// Temporary File To show react is working
import React from 'react';
import HomeIndex from './homeindex';

import NavBarContainer from '../nav/nav_bar_container';

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <HomeIndex />
        <footer>
          
          Copyright &copy; 2019
        </footer>
      </div>
    );
  }
}

export default MainPage;
