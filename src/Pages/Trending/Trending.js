import axios from 'axios';
import './Trending.css';
import { useEffect, useState } from 'react';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import PopupModal from '../../components/PopupModal/PopupModal';

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );

      setContent(data.results);
    };

    fetchTrending();
  }, [page]);

  const renderMovies = () => {
    return content.map((movie) => (
      <PopupModal
        key={movie.id}
        media_type={movie.media_type}
        id={movie.id}
      >
        <SingleContent
          id={movie.id}
          poster={movie.poster_path}
          title={movie.title || movie.name}
          date={movie.first_air_date || movie.release_date}
          media_type={movie.media_type}
          vote_average={movie.vote_average}
          origin_country={movie.origin_country}
          original_language={movie.original_language}
        />
      </PopupModal>
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