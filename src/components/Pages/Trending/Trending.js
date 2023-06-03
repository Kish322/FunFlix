import axios from 'axios';
import './Trending.css';
import { useEffect, useState } from 'react';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Header/Pagination/CustomPagination';

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );

      const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in "YYYY-MM-DD" format

      // Filter out upcoming movies from the results
      const filteredResults = data.results.filter(
        (result) => result.media_type !== 'movie' || (result.release_date && result.release_date <= currentDate)
      );
      setContent(filteredResults);
    };

    fetchTrending();
  }, [page]);

  const renderMovies = () => {
    const numMovies = 20; // Number of movies to display
    const moviesToRender = Array(numMovies).fill(null); // Initialize the array with null values

    // Replace null values with available movie data
    content.forEach((movie, index) => {
      if (index < numMovies) {
        moviesToRender[index] = movie;
      }
    });

    return moviesToRender.map((movie) => (
      <SingleContent
        key={movie ? movie.id : Math.random()} // Use a random key for null elements to avoid key conflicts
        id={movie ? movie.id : ''}
        poster={movie ? movie.poster_path : ''}
        title={movie ? movie.title || movie.name : ''}
        date={movie ? movie.first_air_date || movie.release_date : ''}
        media_type={movie ? movie.media_type : ''}
        vote_average={movie ? movie.vote_average : ''}
        origin_country={movie ? movie.origin_country : ''}
        original_language={movie ? movie.original_language : ''}
      />
    ));
  };

  return (
    <div className="trending-container">
      <h1 className="trending-heading"> Trending </h1>
      

      <div className="trending">
        {renderMovies()}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;