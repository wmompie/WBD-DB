/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  state = {
    movie: {},
  };

  async componentDidMount() {
    try {
      const res = await fetch(`
      https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=1d6d0654f7271ea8cb6b808c849dda59&language=en-US`);
      const movie = await res.json();
      this.setState({
        movie,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { movie } = this.state;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={`${movie.id}`} duration="600" animationDelay="1">
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
          </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

const MovieWrapper = styled.div`
  background-size: cover;
  background: url(${props => props.backdrop}) no-repeat;
  padding-top: 50vh;
  position: relative;
`;

const MovieInfo = styled.div`
  background: white;
  display: flex;
  padding: 2rem 10%;
  text-align: left;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;
