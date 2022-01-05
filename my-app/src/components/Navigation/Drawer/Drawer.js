import React, {Component} from 'react'
import './Drawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {Link} from "react-router-dom";

const links = [
  {to: '/', label: "Список"},
  {to: '/auth', label: "Авторицация"},
  {to: '/quiz-creator', label: "Создать тест"}
]

class Drawer extends Component {
  static renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <Link to = {link.to}>{link.label}  </Link>
        </li>
      )
    })
  }

  render() {
    const cls = ['Drawer']

    if (!this.props.isOpen) {
      cls.push('close')
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            { Drawer.renderLinks() }
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
      </React.Fragment>
    )
  }
}

export default Drawer