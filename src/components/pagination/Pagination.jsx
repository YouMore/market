import React from "react";
import { getPagesArray } from "../../utils/pages";

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages, page);
    
    return (
        <div className="pagination">
            {pagesArray.map(p =>  
                <span 
                    onClick={() => {
                        changePage(p)
                    }}
                    key={p}
                    className={page === p ? "page curPage" : "page"}                    
                >
                    {p}
                </span>
            )}
        </div>
    );
};

export default Pagination;