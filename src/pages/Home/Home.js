import React, { Component } from "react";
import axios from "axios";

import Layout from "../../components/Layout";

import EpisodeCard from "../../components/EpisodeCard";
import Button from "../../components/Button/Button";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      paginationInfo: {},
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadEpisodes = this.loadEpisodes.bind(this);
    this.handleButtonNext = this.handleButtonNext.bind(this);
    this.handleButtonPrev = this.handleButtonNext.bind(this);
  }

  async componentDidMount() {
    await this.loadEpisodes();
  }

  // async componentDidUpdate() {
  //   await this.handleButtonNext();
  // }

  async handleButtonNext() {

    console.log("hola");
    this.setState((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  }

  async handleButtonPrev() {
    const { page } = this.state;
    this.setState({
      page: page - 1,
    });
  }

  async loadEpisodes() {
    const { page } = this.state;
    console.log(page);
    const config = {
      method: "get",
      url: `https://rickandmortyapi.com/api/episode?page=${page}`,
      headers: {},
    };
    await axios(config)
      .then((response) => {
        this.setState({
          paginationInfo: response.data.info,
          episodes: response.data.results,
          hasLoaded: true,
          hasError: false,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: "carapolla",
        });
      });
  }

  render() {
    const {
      page,
      episodes,
      hasLoaded,
      hasError,
      errorMessage,
      paginationInfo,
      handleButtonPrev = this.handleButtonPrev,
      handleButtonNext = this.handleButtonNext,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {!hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>loading Episodes!</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              id={episode.id}
              name={episode.name}
              airDate={episode.air_date}
              episode={episode.episode}
            />
          ))}
          <div className="col col-12">
            <hr />
            <div>{errorMessage}</div>
          </div>
          {paginationInfo.prev === null ? null : (
            <Button handleButton={handleButtonPrev}>Prev</Button>
          )}
          {paginationInfo.next === null ? null : (
            <Button handleButton={handleButtonNext}>Next</Button>
          )}
        </section>
      </Layout>
    );
  }
}

export default Home;
