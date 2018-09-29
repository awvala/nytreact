import axios from "axios";
const APIKEY = "api-key=82b9bb53e0504de1bbc493474a966560";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

export default {
  search: function(query) {
    return axios.get(BASEURL + query + APIKEY);
  }
};