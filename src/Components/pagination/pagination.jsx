import React from 'react'

function Pagination ({totalPosts, postsPerPage, setCurrentPage, currentPage}){
    let pages = [];
    for (let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i)
    }
    function changePage(number){
        let pageNum = parseInt(number.target.innerText);
        setCurrentPage(pageNum)
    }

  return (
    <div>
        {
        pages.map((page, index) => {
            return <button key={index} onClick={(e) => changePage(e)}>{page}</button>
        })
        }
    </div>
  )
}

export default Pagination
