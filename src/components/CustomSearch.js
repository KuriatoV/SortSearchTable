import React from 'react';
import './table.css';

export default class CustomTable extends React.Component {
  // constructor(props, context) {
  //    super(props, context);
  //     this.state={
  //
  //     }
  //  }

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
        <tr key={rowIdx}>
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
  return (
    <div className="wrapper">
      <table>
        {this.renderTableHead()}
        { this.renderTableBody() }
      </table>
    </div>
  )
}
}
