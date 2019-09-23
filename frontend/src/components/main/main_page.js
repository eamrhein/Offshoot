// Temporary File To show react is working
import React from 'react';

import NavBarContainer from '../nav/nav_bar_container';

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <NavBarContainer />
        <footer>
          Copyright &copy; 2019
        </footer>
      </div>
    );
  }
}

export default MainPage;
