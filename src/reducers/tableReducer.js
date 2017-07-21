import * as types from '../constants/ActionTypes';
import _remove from 'lodash/remove';


const initialState = {
tableHeadData:[],
tableData:[],
sort_By:null,
sort_direction:'asc',
initialData:[],
perPage:5,
activePage:0,
search:'',
total:null

}

export default function tableReducer(state = initialState, action) {
    switch (action.type) {
      case types.LOAD_TABLE_DATA:{
        const {data,activePage,perPage} =action
        let response=[...action.data];
        let tableHeadData=response.splice(0,1)[0];
        let tableData=response.slice(activePage*perPage,activePage*perPage+perPage)


      return {...state,tableHeadData,tableData,initialData:response,total:response.length}
    }
      case types.SORT_TABLE:{
        const {sortValue,sortName}=action
        let sort_direction= sortName==state.sort_By ? state.sort_direction =='asc'? 'desc' :'asc' :state.sort_direction
        let sortedData=[...state.tableData].sort((a,b)=>  typeof a[sortValue]!=='string' ?
        sort_direction=='asc' ? a[sortValue]-b[sortValue] : b[sortValue]-a[sortValue] :
        sort_direction=='asc' ? a[sortValue].localeCompare(b[sortValue]) : b[sortValue].localeCompare(a[sortValue]) )

      return {...state,tableData:sortedData,sort_By:sortName,sort_direction}
    }
      case types.SET_PAGE:{
        const page=action.page
        // let newData =[...state.initialData].slice(page*perPage,page*perPage+perPage)

      return {...state,activePage:page}
    }
      case types.SET_SEARCH:{
        const {search} =action
        // let newData =[...state.initialData].slice(page*perPage,page*perPage+perPage)

      return {...state,search,activePage:0}
    }
      case types.CHANGE_ITEMS_PER_PAGE:{
        const {perPage}=action
        return {...state,perPage}
    }
      case types.UPDATE_TABLE_DATA:{
        const {activePage,perPage,search} =action
        let sreg=new RegExp(search)
        console.log(activePage*perPage,activePage*perPage+perPage)
        // let tableData=[...state.initialData].
        let newTableData=state.initialData.filter(item=>sreg.test(item.join(' ')) )
        let tableData =newTableData.slice(activePage*perPage,activePage*perPage+perPage)
        console.log('newTableData',newTableData)
        return {...state,tableData,total:newTableData.length}
    }
      default: {
        return state;
      }
    }
}
