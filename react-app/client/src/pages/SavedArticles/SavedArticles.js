import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import SavedArticle from "../../components/SavedArticle";

class SavedArticles extends Component {
  state = {
    sArticles: []
  };

  componentDidMount() {
    this.getSavedArticles();
    console.log(this.state.sArticles);
  };

  getSavedArticles = () => {
    //console.log("here");
    API.getArticles().then(res => {
      console.log(res);
      this.setState({
        sArticles: res.data
      })
    }).catch(err => console.log(err));
};

  deleteArticle = id => {
    API.deleteArticles(id)
      .then(res => this.getSavedArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h2>
                Saved Articles
                </h2>
            </Jumbotron>
            {this.state.sArticles.length 
              ? <Row>
                <Col size="sm-12">
                  {this.state.sArticles.map((article) =>
                    <SavedArticle
                      key={article._id}
                      topic={article.topic}
                      _id={article._id}
                      url={article.url}
                      snippet={article.snippet}
                      date={article.date}
                      deleteArticle={this.deleteArticle}
                    />
                  )}
                </Col>
              </Row>
              : <h3>There are no saved articles.</h3>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SavedArticles;