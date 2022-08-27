import React, { Component } from 'react'
import FormSinhVien from './FormSinhVien'
import TableSinhVien from './TableSinhVien'

export default class QLSVContainer extends Component {
  
  render() {
    return (
      <div className='container'>
        <FormSinhVien/>
        <TableSinhVien/>
      </div>
    )
  }
}
