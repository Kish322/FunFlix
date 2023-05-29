import { img_300, unavailable } from "../config/config";
import './SingleContent.css';

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const mediaTypeText = media_type === 'tv' ? "TV Series" : "Movie";

  return (
    <div className="media">
      <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
      <div className="contentDetails">
        <b className="title">{title}</b>
        <div className="subTitle">
          <span className="mediaType">{mediaTypeText}</span>
          <span className="date">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleContent;

