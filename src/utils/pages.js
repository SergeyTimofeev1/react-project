export const getPagesCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages) => {
  let result = []
  for (let i = 0; i < 10; i++) {
    result.push(i + 1)    
  }  
  return result
}