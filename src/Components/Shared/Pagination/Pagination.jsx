import React, { useEffect } from 'react';
import { useState } from 'react';
import "./Pagination.css"
import useRole from '../../../Hooks/useRole';

const Pagination = ({itemsPerPage, setItemsPerPage,currentPage, setCurrentPage}) => {
    const [currentUser, pending] = useRole()
    const [count, setCount] = useState(76);
  
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];
    useEffect(() => {
        fetch(`http://localhost:5000/assetscount?userCompany=${currentUser?.userCompany}`)
          .then((res) => res.json())
          .then((data) => setCount(data.count));
      }, [currentUser]);
    const handleItemsPerPage = (e) => {
        const value = e.target.value;
        const number = parseInt(value);
        setItemsPerPage(number);
        setCurrentPage(0);
      };
      const handlePrevious = () => {
        if (currentPage === 0) {
          setCurrentPage(0);
        } else {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const handleNext = () => {
        if (currentPage === numberOfPages - 1) {
          setCurrentPage(numberOfPages - 1);
        } else {
          setCurrentPage(currentPage + 1);
        }
      };
    return (
        <div>
            <div className="pagination">
        <p>Current Page : {currentPage + 1}</p>
        <button onClick={handlePrevious}>Previous</button>
        {pages.map((page) => (
          <button
            className={currentPage === page ? "selected" : ""}
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNext}>Next</button>
        <select
          value={itemsPerPage}
          name=""
          id=""
          onChange={handleItemsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
        </div>
    );
};

export default Pagination;