import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../config/config";
import './SingleContent.css';

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  origin_country,
  original_language
}) => {
  const mediaTypeText = media_type === 'tv' ? "TV Series" : "Movie";
  const ratingText = `Rating:\n${vote_average}`;
  
  return (
    <div className="media">
      <Badge className="badge" badgeContent={ratingText} color={vote_average > 6 ? 'primary' : 'secondary' } />
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
          <span className="originalLanguage">Original Language: {original_language}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleContent




