import axios from 'axios';
import { useEffect, useState } from 'react';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Header/Pagination/CustomPagination';

const Movies = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState(0); // Initialize numOfPages to 0 instead of undefined

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
            setContent(data.results);
            setNumOfPages(data.total_pages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [page]);

    return (
        <div>
            <span className="pageTitle">Movies</span>
            <div className="trending">
                {content && content.map((c) => (
                    <SingleContent
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type="movie"
                        vote_average={c.vote_average}
                        origin_country={c.origin_country}
                        original_language={c.original_language}
                    />
                ))}
            </div>
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        </div>
    );
};

export default Movies;