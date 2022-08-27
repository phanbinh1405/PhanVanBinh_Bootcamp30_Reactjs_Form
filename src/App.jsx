import React, { Component } from 'react'
import FormSinhVien from './components/FormSinhVien'
import QLSVContainer from './components/QLSVContainer'
import TableSinhVien from './components/TableSinhVien'

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <QLSVContainer/>
      </div>
    )
  }
}
