import axios from 'axios';
import './Popular.css';
import { useEffect, useState } from 'react';
import DisplayContent from '../../components/DisplayContent/DisplayContent';
import Pagination from '../../components/Pagination/Pagination';
import PopupModal from '../../components/PopupModal/PopupModal';

const Popular = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      const popularMovies = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
     
      const topRatedTVShows = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );

      const popularMoviesData = popularMovies.data.results.map((movie) => ({
        ...movie,
        media_type: 'movie',
      }));

      const topRatedTVShowsData = topRatedTVShows.data.results.map((tvShow) => ({
        ...tvShow,
        media_type: 'tv',
      }));

      const combinedContent = [...popularMoviesData, ...topRatedTVShowsData];

      setContent(combinedContent);
    };


    fetchContent();
  }, [page]);

  const renderMovies = () => {
    return content.map((item) => (
      <PopupModal
        key={item.id}
        media_type={item.media_type}
        id={item.id}
      >
        <DisplayContent
          id={item.id}
          poster={item.poster_path}
          title={item.title || item.name}
          date={item.first_air_date || item.release_date}
          media_type={item.media_type}
          vote_average={item.vote_average}
          origin_country={item.origin_country}
          original_language={item.original_language}
        />
      </PopupModal>
    ));
  };

  return (
    <div className="trending-container">
      <h1 className="trending-heading">Popular Movies and Top Rated TV Shows</h1>
      <div className="trending">
        {renderMovies()}
      </div>
      <Pagination setPage={setPage} />
    </div>
  );
};

export default Popular;