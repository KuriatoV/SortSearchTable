import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tableActions from '../actions/tableActions';
import data from '../../data/data.json'
// import './schedule.css';
import CustomTable from './CustomTable'
import CustomPaginator from './CustomPaginator'

///////////////////////////$Recycle.Bin
@connect(state => ({
tableHeadData:state.table.tableHeadData,
initialData:state.table.initialData,
tableData:state.table.tableData,
perPage:state.table.perPage,
activePage:state.table.activePage,
search:state.table.search,
total:state.table.total,
  }),
   dispatch => ({
  actions: bindActionCreators({
    ...tableActions
  }, dispatch)
    }))

export default class TablePage extends Component {
  constructor(props, context) {
     super(props, context);

   }
   componentWillReceiveProps=(next)=>{
     const {perPage,activePage,search}=this.props
      if (perPage!=next.perPage || activePage!=next.activePage || search!=next.search ){
        this.props.actions.updateTableData(next.activePage,next.perPage,next.search) }

   }
   componentDidMount=()=>{
    const {perPage,activePage}=this.props
     this.props.actions.loadTableData(data,activePage,perPage)
   }

   onSort=(sortName,sortValue)=>()=>{
   this.props.actions.tableSort(sortName,sortValue)
   }
   changePage=(page)=>{
     this.props.actions.changePage(page)

   }


changePerPage=(e)=>{
  let perPage=+e.target.value
  perPage<1 && (perPage=1)
  perPage>50 && (perPage=50)
this.props.actions.changePerPage(perPage)
}
setSearch=(e)=>{
  let search=e.target.value
this.props.actions.setSearch(search)
}

    render() {
      const {tableHeadData, tableData,perPage,activePage,search,total} = this.props;
      return (
          <div>
            <div style={{display:'flex'}}>
              items per page
              <input style={{width:'40px'}} value={perPage} onChange={this.changePerPage} type="number"/>

              <input  value={search} onChange={this.setSearch} type="text"/>
            </div>
            <CustomPaginator
              activePage={activePage}
              total={total}
              perPage={perPage}
              pageRange={'10'}
              changePage={this.changePage}
              activePageClass={'active'}
            />
            <CustomTable
              onSort={this.onSort}
              colsNames={tableHeadData}
              rows={tableData}

            />

          </div>
        )
    }
}
