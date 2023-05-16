import React from 'react';
import './pagination.css';

function Pagination ({totalPosts, postsPerPage, setCurrentPage, currentPage}){
    const [pageSet, changePageSet] = React.useState(1);

    let pages = [];
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
        console.log(pageSet)
               }else return
    }
    function nextPageSet(e){
       
        changePageSet((num) => num + 1)
        console.log(pageSet)
    }

  return (
    <div className='pagination-container'>
        <button onClick={(e) => prevPageSet(e)}>{pageSet === 1 ? "No more" : "Last 10"}</button>

        <div className='page-num-list'>
        {
        currentPageSet.map((page, index) => {
            return <button key={index}
            className='page-num-button'
             onClick={(e) => changePage(e)}>{page}</button>
                 })
        }
        </div>

        <button onClick={(e) => nextPageSet(e)}>Next 10</button>
    </div>
  )
}

export default Pagination
