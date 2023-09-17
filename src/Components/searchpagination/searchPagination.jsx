import React from 'react';
import './searchPagination.css';

export function Pagination ({searchTotalPosts, searchPostsPerPage, setSearchCurrentPage, searchCurrentPage}){
    const [pageSet, changePageSet] = React.useState(1);

    const pages = [];
    
    for (let i = 1; i<= Math.ceil(searchTotalPosts/searchPostsPerPage); i++){
        pages.push(i)
    }

    function changePage(number){
        let pageNum = parseInt(number.target.innerText);
        setSearchCurrentPage(pageNum)
    }

    const pageQuantity = 10;
    const searchLastPageIndex = pageSet * pageQuantity;
    const searchFirstPageIndex = searchLastPageIndex - pageQuantity;
    const currentSearchPageSet = pages.slice(searchFirstPageIndex,searchLastPageIndex)

    function prevPageSet(e){
       
        if(pageSet > 1){
        changePageSet((num) => num - 1)
        setSearchCurrentPage((num) => num - 10)
        console.log(pageSet)
               }else return
    }
    function nextPageSet(e){
        if(pageSet < pages.length){       
        changePageSet((num) => num + 1)
        setSearchCurrentPage((num) => num + 10)
        }
    }

  return (
    <div className='pagination-container'>
       
        <button className="pagination-button" onClick={(e) => prevPageSet(e)}>
            {pageSet === 1 ? "No more" : "Last 10"}
        </button>

        <div className='page-num-list'>
        {
        currentPageSet.map((page, index) => {
            return <button key={index}
            className={`page-num-button ${currentPage === page ? "active-page" : " "}`}
             onClick={(e) => changePage(e)}>{page}</button>
                 })
        }
        </div>

        <button className="pagination-button" onClick={(e) => nextPageSet(e)}>Next 10</button>
    </div>
  )
}

