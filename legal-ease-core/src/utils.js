

export const normalizeQuery = (query) => {
    return query.trim().toLowerCase(); // normalize case and remove extra spaces
  };
  
export const groupQueriesByFrequency = (searches) => {
    const queryMap = {};
  
    searches.forEach(search => {
      const normalizedQuery = normalizeQuery(search.query);
  
      if (queryMap[normalizedQuery]) {
        queryMap[normalizedQuery].count += 1;
      } else {
        queryMap[normalizedQuery] = {
          query: search.query, // original query
          count: 1,
        };
      }
    });
  
    // Convert the map into an array and sort by frequency (highest first)
    const groupedQueries = Object.values(queryMap).sort((a, b) => b.count - a.count);
  
    return groupedQueries;
  };
  