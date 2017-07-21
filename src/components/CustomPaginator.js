import React, { Component, PropTypes } from 'react'

export default class CustomPaginator extends Component {

    static defaultProps = {
      total: 0,
      perPage: 10,
      activePage: 1,
      pageRange: 5,
    }

    constructor(props){
      super(props)
      const { total, perPage } = props
      this.totalPages = total % perPage === 0 ? parseInt(total / perPage) : parseInt(total / perPage) + 1
    }

    componentWillUpdate=(props)=>{
      const { total,perPage,activePage,changePage } = props
      this.totalPages = total % perPage === 0 ? parseInt(total / perPage) : parseInt(total / perPage) + 1
      if (this.totalPages - 1 < activePage)
        changePage && changePage(0)
    }

    handlePageClick=(page)=>()=>{
      const { changePage,perPage } = this.props
      changePage && changePage(page)
    }

    prevPage(){
      const {activePage } = this.props
          return (
        activePage > 0 ?
          <div onClick={this.handlePageClick(activePage - 1)}>
            <span className='pag_item'>{'<<<'}</span>
          </div> : null
      )
    }

    renderPages(){
      const { activePageClass,pageRange, total,activePage } = this.props
      let p_min = activePage - pageRange / 2
      let p_max = activePage + pageRange / 2
      if (p_min < 0){
        p_min = 0
        p_max = pageRange - 1
      }
      if (p_max > total - 1){
        p_min = total - 1
        p_max = total - pageRange
      }

      return (
        Array(this.totalPages).fill().map((_, i) =>
          {
            return (
              i >= p_min && i <= p_max ?
                <div
                  key={i}
                  onClick={this.handlePageClick(i)}
                  className={i === activePage ? activePageClass : 'pag_item'}>
                  {i+1}
                </div> : null
            )
          })
      )
    }

    nextPage(){
      const {
      activePage } = this.props

      return (
        activePage < this.totalPages - 1 ?
          <div onClick={this.handlePageClick(activePage + 1)}>
            <span className='pag_item'>{'>>>'}</span>
          </div> : null
      )
    }

    render(){
      const { paginatorClass,
        total,
        perPage,
        pageRange,
        extraTemplate,
      activePage } = this.props

      return (
        <div style={{display:'flex'}}>
          { this.prevPage() }
          { this.renderPages() }
          { this.nextPage() }
        </div>
      )
    }
  }
