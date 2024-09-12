export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages, curPage) =>{
    let result = []
    result.push(1);
    if (curPage < 6){
      for (let i=1; i < 10; i++) {
        result.push(i+1);
      }
    }
    else {
      if (curPage < totalPages-4){
        for (let i=curPage-4; i < curPage+5; i++) {
          result.push(i);
        }
      }
      else{
        for (let i=totalPages-9; i < totalPages; i++) {
          result.push(i);
        }
      }
    }
    result.push(totalPages)
    return result;
}