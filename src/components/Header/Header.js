import React, { Component } from 'react';
import './Header.css'; 

class Header extends Component {
  componentDidMount() {
    this.animateHeader();
  }

  animateHeader() {
    const headerElement = document.querySelector('.header i');
    headerElement.classList.add('rainbow-animation');

    setTimeout(() => {
      headerElement.classList.remove('rainbow-animation');
      this.animateHeader();
    }, 3000);
  }

  render() {
    return (
      <div className="header">
        <i>FUNFLIX</i>
      </div>
    );
  }
}

export default Header;
