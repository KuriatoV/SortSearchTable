import * as types from '../constants/ActionTypes';;

export const loadTableData=(data,activePage,perPage)=>{
    return {type: types.LOAD_TABLE_DATA, data,activePage,perPage};
}
export const updateTableData=(activePage,perPage,search)=>{
    return {type: types.UPDATE_TABLE_DATA, activePage,perPage,search};
}
export const tableSort=(sortName,sortValue)=>{
    return {type: types.SORT_TABLE, sortName,sortValue};
}
export const changePage=(page)=>{
    return {type: types.SET_PAGE, page:page};
}
export const changePerPage=(perPage)=>{
    return {type: types.CHANGE_ITEMS_PER_PAGE, perPage};
}
export const setSearch=(search)=>{
    return {type: types.SET_SEARCH, search};
}
