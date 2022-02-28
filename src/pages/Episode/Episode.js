import React, { Component } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // episode: null,
      characters: [],
      // hasLoaded: false,
      // hasError: false,
      // errorMessage: null,
    };

    this.loadCharacters = this.loadCharacters.bind(this);
  }

  async componentDidMount() {
    this.loadCharacters();
  }

  async loadCharacters() {
    const { match } = this.props;
    const episodeId = match.params.id;

    const url0 = `https://rickandmortyapi.com/api/episode/${episodeId}`;

    const { data } = await axios.get(url0);
    const urls = data.characters;
    const arr = await axios.all(urls.map((url) => axios.get(url)));
    const arr2 = arr.map((elem) => elem.data);

    this.setState(() => ({
      characters: arr2,
    }));
  }

  render() {
    const { characters } = this.state;

    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            <div className="row">
              {characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  image={character.image}
                  species={character.species}
                  status={character.status}
                  origin={character.origin}
                  location={character.location}
                />
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
