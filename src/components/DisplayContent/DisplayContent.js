import { img_300, unavailable } from "../image/image";
import './DisplayContent.css';

const DisplayContent = ({
  poster,
  title,
  date,
  media_type,
  vote_average,
  origin_country,
  original_language
}) => {
  const mediaTypeText = media_type === 'tv' ? "TV Series" : "Movie";
  
  return (
    <div className="media">
      <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
      <div className="contentDetails">
        <b className="title">{title}</b>
        <div className="subTitle">
          <span className="mediaType">Type: {mediaTypeText}</span>
          <span className="date">Released Date: {date}</span>
          {origin_country ? (
            <span className="originCountry">Origin Country: {origin_country}</span>
          ) : (
            <span className="originCountry">Origin Country: N/A</span>
          )}
          {original_language ? (
            <span className="originLanguage">Origin Language: {original_language}</span>
          ) : (
            <span className="originLanguage">Origin Language: N/A</span>
          )}
          {vote_average ? (
            <span className="rating">Rating: {vote_average}/10 ⭐</span>
          ) : (
            <span className="rating">Rating: N/A</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayContent;