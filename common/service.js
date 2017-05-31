/**
 * Created by huzeyin on 2017/5/25.
 */

var base_url = "https://api.douban.com/v2/"


var service = {
    book_search: base_url + "book/search",

    book_search_id: base_url + "book/",

    music_search: base_url + "music/search",

    music_search_id: base_url + "music/",

    movie_search: base_url + "movie/search",

    movie_search_id: base_url + "movie/subject/"
}
module.exports = service;