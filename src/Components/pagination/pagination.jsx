import React from 'react';
import './pagination.css';

function Pagination ({totalPosts, postsPerPage, setCurrentPage, currentPage}){
    const [pageSet, changePageSet] = React.useState(1);

    const pages = [];
    
    for (let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i)
    }

    function changePage(number){
        let pageNum = parseInt(number.target.innerText);
        setCurrentPage(pageNum)
    }

    const pageQuantity = 10;
    const lastPageIndex = pageSet * pageQuantity;
    const firstPageIndex = lastPageIndex - pageQuantity;
    const currentPageSet = pages.slice(firstPageIndex,lastPageIndex)

    function prevPageSet(e){
       
        if(pageSet > 1){
        changePageSet((num) => num - 1)
        setCurrentPage((num) => num - 10)
        console.log(pageSet)
               }else return
    }
    function nextPageSet(e){
        if(pageSet < pages.length){       
        changePageSet((num) => num + 1)
        setCurrentPage((num) => num + 10)
        }
    }

  return (
    <div className='pagination-container'>
       
        <button className="pagination-button" onClick={(e) => prevPageSet(e)}>{pageSet === 1 ? "No more" : "Last 10"}</button>

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

export default Pagination
