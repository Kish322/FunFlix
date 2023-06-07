import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { Button, Typography } from "@material-ui/core";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./PopupModal.css";

const PopupModal = ({ children, media_type, id }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [video, setVideo] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    const trailerVideo = data.results.find((video) => video.type === "Trailer");
    if (trailerVideo) {
      setVideo(trailerVideo.key);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="trending" style={{ cursor: "pointer" }} onClick={handleOpen}>
        {children}
      </div>
      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="paper">
            {content && (
              <>
                {media_type === "tv" ? (
                  <>
                    <Typography variant="subtitle1" style={{ marginBottom: "1rem" }}>
                      TV Series: {content.name}
                    </Typography>
                    <Typography variant="subtitle2" style={{ marginBottom: "1rem" }}>
                      Current Season: {content.seasons[content.seasons.length - 1].season_number}
                    </Typography>
                    <Typography variant="subtitle2" style={{ marginBottom: "1rem" }}>
                      Number of Episodes: {content.seasons[content.seasons.length - 1].episode_count}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="subtitle1" style={{ marginBottom: "0.5rem" }}>
                      Movie: {content.title}
                    </Typography>
                    <Typography variant="subtitle2" style={{ marginBottom: "1rem" }}>
                      Duration: {content.runtime} min
                    </Typography>
                  </>
                )}
                <Typography variant="body1" className="description">
                  {content.overview}
                </Typography>
                {content.genres && (
                  <Typography variant="subtitle2" style={{ marginTop: "1rem" }}>
                    Genres: {content.genres.map((genre) => genre.name).join(", ")}
                  </Typography>
                )}
                {video && (
                  <Button
                    className="trailerButton"
                    variant="contained"
                    color="primary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    <YouTubeIcon className="youtubeIcon" />
                    Trailer
                  </Button>
                )}
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default PopupModal;