import React, { Component } from 'react';
import styled from 'styled-components';

import Movie from './Movie';

class MoviesList extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    try {
      const res = await fetch(`
      https://api.themoviedb.org/3/discover/movie?api_key=1d6d0654f7271ea8cb6b808c849dda59&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <MovieGrid>
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  padding: 1rem;
`;
