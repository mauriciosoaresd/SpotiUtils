const youtubesearchapi=require('youtube-search-api');

module.exports = {
    searchVid,

}

async function searchVid(titleStr) {
    return youtubesearchapi.GetListByKeyword(titleStr ,false, 2)
  
}
