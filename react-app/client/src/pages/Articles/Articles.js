import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn ,TextArea} from "../../components/Form";


class Articles extends Component {
    state = {
        articles: [],
        topic: "",
        startYear: "",
        endYear: "",
        page: 0,
        currentSearch: ""
    };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
            .then(res =>
                this.setState({ articles: res.data, title: "", url: "", date: "" })
            )
            .catch(err => console.log(err));
    };

    // Skipping delete function

    saveArticle = (article) => {
        let newArticle = {
            date: article.pub_date,
            title: article.headline.main,
            url: article.web_url,
            summary: article.snippet
        }

        API.saveArticle(newArticle).then(articles => {
          //removing the saved article from the articles in state
          let unsavedArticles = this.state.articles.filter(article => article.headline.main !== newArticle.title)
          this.setState({articles: unsavedArticles})
        })
        .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        let {topic, startYear, endYear} = this.state;
        let query = {topic, startYear, endYear}
        this.getArticles(query)
    };

    getArticles = query => {
        if (query.topic !== this.state.currentSearch.topic || query.startYear !== this.state.currentSearch.startYear || query.endYear !== this.state.currentSearch.endYear) {
            this.setState ({
                articles: []
            })
        }

        let {topic, startYear, endYear } = query;
        let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&page=${this.state.page}`;
        let APIkey = "&api-key=82b9bb53e0504de1bbc493474a966560"

        if(topic.indexOf(' ') >= 0) {
            topic = topic.replace(/\s/g, '+');
        }

        if (topic) {
        queryURL+= `&fq=${topic}`
        }

        if(sYear) {
        queryURL+= `&begin_date=${startYear}`
        }

        if(eYear) {
        queryURL+= `&end_date=${endYear}`
        }

        queryURL+=APIkey;

        API.queryNYT(queryUrl).then(results => {
          this.setState({
            articles: [...this.state.results, ...results.data.response.docs],
            currentSearch: query,
            topic: '',
            startYear: '',
            endYear: ''
          });
      })
      .catch(err=> console.log(err))
    }

    getAdditionalResults = () => {
        let { topic, startYear, endYear} = this.state.currentSearch;
        let query = { topic, startYear, endYear }
        let page = this.state.page;
        page++
        this.setState({
            page: page
        }, function () {
          this.getArticles(query)
        });
      };
}

export default Articles;