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
      setContent(data.results);
    };

    fetchTrending();
  }, [page]);

  return (
    <div className="trending-container">
      <h1 className="trending-heading"> Trending </h1>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
              origin_country={c.origin_country}
              original_language={c.original_language}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;

