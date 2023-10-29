import React, { Component } from 'react'
import '../CSS/NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
            <div className="nav-bar-x">
                <img id="nav-img-x" src="https://scarletnexusstorage.blob.core.windows.net/images/Avatar.png" alt="alt"></img>
            </div>
      </header>
    );
  }
}
