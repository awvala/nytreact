import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";


class Articles extends Component {
    state = {
        articles: [],
        title: "",
        url: "",
        date: "",
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

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title && this.state.url && this.state.date) {
            API.saveArticles({
                title: this.state.title,
                url: this.state.url,
                sate: this.state.date
            })
                .then(res => this.loadArticles())
                .catch(err => console.log(err));
        }
    };

}

export default Articles;