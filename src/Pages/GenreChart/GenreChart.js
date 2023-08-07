import React, { useEffect, useState, useRef } from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import './GenreChart.css';
Chart.register(CategoryScale);

const GenreChart = () => {
  const [genreData, setGenreData] = useState(null);
  const [selectedType, setSelectedType] = useState('movie'); // Default to 'movie'
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [movieNames, setMovieNames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const chartRef = useRef(null);

  const years = Array.from({ length: new Date().getFullYear() - 1990 + 1 }, (_, index) => 1990 + index);
  const countries = ['US', 'GB', 'CA', 'AU', 'DE', 'JP'];
  const languages = ['en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'ar', 'zh'];
  const ratings = Array.from({ length: 10 }, (_, index) => index + 1);
  const countryNames = {
    US: 'United States',
    GB: 'United Kingdom',
    CA: 'Canada',
    AU: 'Australia',
    DE: 'Germany',
    JP: 'Japan',
  };
  const languageNames = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    ja: 'Japanese',
    zh: 'Chinese',
    ko: 'Korean',
    ar: 'Arabic',
  };

  const tmdbLogoUrl =
    'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';
  const tmdbApiUrl = 'https://www.themoviedb.org/';

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/${selectedType}/list?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const genres = response.data.genres;

        const genreCounts = {};
        genres.forEach((genre) => {
          genreCounts[genre.name] = 0;
        });

        let apiUrl = `https://api.themoviedb.org/3/discover/${selectedType}?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}`;

        if (selectedYear) {
          apiUrl += `&primary_release_year=${selectedYear}`;
        }
        if (selectedCountry) {
          apiUrl += `&region=${selectedCountry}`;
        }
        if (selectedLanguage) {
          apiUrl += `&with_original_language=${selectedLanguage}`;
        }
        if (selectedRating) {
          apiUrl += `&vote_average.gte=${selectedRating}&vote_average.lte=${selectedRating}`;
        }

        const popularItemsResponse = await axios.get(apiUrl);
        const popularItems = popularItemsResponse.data.results;

        popularItems.forEach((item) => {
          item.genre_ids.forEach((genreId) => {
            const genre = genres.find((g) => g.id === genreId);
            if (genre) {
              genreCounts[genre.name]++;
              if (selectedGenre === genre.name) {
                setMovieNames((prevNames) => [...prevNames, item.title || item.name]);
              }
            }
          });
        });

        const genreLabels = Object.keys(genreCounts);
        const genreCountValues = Object.values(genreCounts);

        const backgroundColors = ['orange', 'red', 'blue', 'green'];

        if (currentPage === 1) {
          setGenreData({
            labels: genreLabels,
            datasets: [
              {
                label: 'Genre Count',
                data: genreCountValues,
                backgroundColor: backgroundColors,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          setGenreData((prevData) => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: genreCountValues,
              },
            ],
          }));
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchGenreData();
  }, [selectedType, selectedYear, selectedCountry, selectedLanguage, selectedRating, currentPage, selectedGenre]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setCurrentPage(1);
    setSelectedGenre('');
    setMovieNames([]);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setCurrentPage(1);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setCurrentPage(1);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setCurrentPage(1);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
    setCurrentPage(1);
  };

  const handleBoxClick = () => {
    window.location.href = tmdbApiUrl;
  };

  const handleScroll = () => {
    if (
      chartRef.current &&
      window.innerHeight + window.pageYOffset >= chartRef.current.offsetTop + chartRef.current.offsetHeight
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBarClick = (_, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedGenre = genreData.labels[clickedIndex];
      if (selectedGenre === clickedGenre) {
        setSelectedGenre('');
        setMovieNames([]);
      } else {
        setSelectedGenre(clickedGenre);
        setMovieNames([]);
      }
    }
  };

  return (
    <div className="container">
      <div className="genre-title">Popular Genre Distribution</div>
      <div className="select-container type-box">
        <Typography variant="subtitle1" component="label" htmlFor="type-select">
          Select Type:
        </Typography>
        <select id="type-select" value={selectedType} onChange={handleTypeChange}>
          <option value="movie">Movies</option>
          <option value="tv">TV Series</option>
        </select>
      </div>
      <div className="select-container year-box">
        <Typography variant="subtitle1" component="label" htmlFor="year-select">
          Select Year:
        </Typography>
        <select id="year-select" value={selectedYear} onChange={handleYearChange}>
          <option value="">All</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="select-container country-box">
        <Typography variant="subtitle1" component="label" htmlFor="country-select">
          Select Released Country:
        </Typography>
        <select id="country-select" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">All</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {countryNames[country]}
            </option>
          ))}
        </select>
      </div>
      <div className="select-container language-box">
        <Typography variant="subtitle1" component="label" htmlFor="language-select">
          Select Language:
        </Typography>
        <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="">All</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {languageNames[language]}
            </option>
          ))}
        </select>
      </div>
      <div className="select-container rating-box">
        <Typography variant="subtitle1" component="label" htmlFor="rating-select">
          Select Rating:
        </Typography>
        <select id="rating-select" value={selectedRating} onChange={handleRatingChange}>
          <option value="">All</option>
          {ratings.map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        <div className="attribution-boxs" onClick={handleBoxClick}>
          <p>Content sourced from TMDB</p>
          <img src={tmdbLogoUrl} alt="TMDB Logo" />
        </div>
      </div>
      {genreData ? (
        <div className="chart-container">
          <Bar
            data={genreData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: 'black',
                    font: {
                      size: 15,
                    },
                  },
                  title: {
                    display: true,
                    text: 'Genre',
                    color: 'black',
                    font: {
                      size: 18,
                    },
                    padding: {
                      bottom: 10,
                    },
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    borderDash: [2],
                    color: '#ddd',
                  },
                  ticks: {
                    color: 'black',
                    font: {
                      size: 15,
                    },
                  },
                  title: {
                    display: true,
                    text: 'Count',
                    color: 'black',
                    font: {
                      size: 18,
                    },
                    padding: {
                      top: 10,
                    },
                  },
                },
              },
              onClick: handleBarClick,
            }}
            ref={chartRef}
          />
          {selectedGenre && movieNames.length > 0 && (
            <div className="genre-info">
              <Typography variant="h4" className="genre-info-title">
                {selectedGenre}:
              </Typography>
              <ul className="genre-info-list">
                {movieNames.map((movieName) => (
                  <li key={movieName}>{movieName}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default GenreChart;