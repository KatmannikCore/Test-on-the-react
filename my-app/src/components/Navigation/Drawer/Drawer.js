import React, {Component} from 'react'
import './Drawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {Link} from "react-router-dom";

class Drawer extends Component {
  static renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <Link to = {link.to}>{link.label}  </Link>
        </li>
      )
    })
  }

  render() {
    const cls = ['Drawer'];

    if (!this.props.isOpen) {
      cls.push('close')
    }

    let links = [
      {to: '/', label: "Список", exact: true}
    ];
    if(this.props.isAuthenticated){
      links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
      links.push({to: '/logout', label: 'Выйти', exact: false});
    }else {
      links.push({to: '/auth', label: "Авторицация", exact: false},);
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            { Drawer.renderLinks(links) }
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
      </React.Fragment>
    )
  }
}

export default Drawer