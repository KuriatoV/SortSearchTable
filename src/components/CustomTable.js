import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tableActions from '../actions/tableActions';
import data from '../../data/data.json'
import './table.css';

export default class CustomTable extends Component {
  constructor(props, context) {
     super(props, context);
      this.state={
        clickedRow: null
      }
   }

renderTableHead=()=>{
  const {colsNames,onSort} =this.props
  return(<thead>
    <tr>
      {Object.entries(colsNames).map((item,idx)=>
        <td className='header' key={item} onClick={this.props.onSort(item[0],idx)} >
          <p>{item[0]}</p>
          <p>{item[1]}</p>
        </td>
      )}
    </tr>
  </thead>)
}
renderTableBody=()=>{
  const {colsNames,rows } = this.props;
  return (
    <tbody>
      { rows.length ? rows.map((row,rowIdx)=>
        <tr onClick={()=>this.setState({clickedRow:row})} key={rowIdx}>
          {row.map((cell,cellIdx)=>
            <td key={cellIdx} >{cell}</td>
          )}
        </tr>)
      :
      <tr><td colSpan="5" style={{textAlign:"center"}}>No data to show</td></tr>
      }
    </tbody>)
    }

render() {
  const {colsNames,rows } = this.props;
  const {clickedRow } = this.state;
  return (
    <div className="wrapper">
      <table>
        {this.renderTableHead()}
        { this.renderTableBody() }
      </table>
      {clickedRow &&
        (<div style={{display:'flex'}} >
          {clickedRow.map((item,idx)=>
            <div key ={idx} style={{flex:'1',textAlign:'center'}}>{item}</div>
          )}
        </div>)}
    </div>
  )
}
}
