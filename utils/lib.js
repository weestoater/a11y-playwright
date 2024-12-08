export const traverse = (array) => {
  let results = [];
  const sites = array.length;
  for (let i = 0; i < sites; i++) {
    let site = array[i].site;
    let pages = array[i].pages.length;
    for (let j = 0; j < pages; j++) {
      let page = array[i].pages[j];
      let url = site + page.url;
      results.push({ page: page.name, url: url });
    }
  }
  return results;
};
