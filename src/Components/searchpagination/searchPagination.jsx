import React from 'react';
import './searchPagination.css';

export function Pagination ({
                            currentSearchPostsLength, 
                            searchPostsPerPage,
                            setSearchCurrentPage, 
                            currentSearchPage
                        }){
    const [pageSet, changePageSet] = React.useState(1);

    const pages = [];
    
    for (let i = 1; i<= Math.ceil(currentSearchPostsLength/searchPostsPerPage); i++){
        pages.push(i)
    }
    

    function changePage(number){
        let pageNum = parseInt(number.target.innerText);
        setSearchCurrentPage(pageNum)
    }

    const pageQuantity = 10;
    const searchLastPageIndex = pageSet * pageQuantity;
    const searchFirstPageIndex = searchLastPageIndex - pageQuantity;
    const currentSearchPageSet = pages.slice(searchFirstPageIndex,searchLastPageIndex);

    //these two functions set the numbers correctly 
    function prevPageSet(e){
       
        if(pageSet > 1){
        changePageSet((num) => num - 1)
        setSearchCurrentPage((num) => num - 10)
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
            {pageSet === 1 ? "0" : "Last 10"}
        </button>

        <div className='page-num-list'>
        {
        currentSearchPageSet.map((page, index) => {
            return <button key={index}
            className={`page-num-button ${currentSearchPage === page ? "active-page" : " "}`}
             onClick={(e) => changePage(e)}>{page}</button>
                 })
        }
        </div>

        <button className="pagination-button" onClick={(e) => nextPageSet(e)}>Next 10</button>
    </div>
  )
}

