import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import CharacterCard from "../../components/CharacterCard";
import EpisodeCard from "../../components/EpisodeCard";

import Layout from "../../components/Layout";

export default function Character() {
  const [character, setCharacter] = useState();
  const [episodes, setEpisodes] = useState("");
  const location = useLocation();

  useEffect(() => {
    loadCharacter();
  }, []);

  const loadCharacter = async () => {
    const url = `https://rickandmortyapi.com/api/${location.pathname}`;

    const { data } = await axios.get(url);
    setCharacter(data);
    console.log(character);

    const urls = data.episode;
    const urls2 = await axios.all(urls.map((ele) => axios.get(ele)));
    const episodesArr = urls2.map((elem) => elem.data);
    console.log(urls2);
    console.log(episodesArr);
    setEpisodes(episodesArr);
  };

  return (
    <Layout>
      <section className="row">
        <div className="col col-12">
          <div className="row">
            {console.log(character)}
            {character && (
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
            )}
          </div>
        </div>
        <div className="col col-12">
          <hr />
        </div>
        {episodes &&
          episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              id={episode.id}
              name={episode.name}
              airDate={episode.air_date}
              episode={episode.episode}
            />
          ))}
        <div className="col col-12" />
      </section>
    </Layout>
  );
}
