import { useEffect } from "react"
import { useSelector , useDispatch } from "react-redux"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import { fetchMoviespopular } from "../Redux/movies-slice-p";
import { Link } from 'react-router-dom';




export default function Moviespopular() {
  
let movies = useSelector((state) => state.moviepopular)
const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMoviespopular())
    }, [])
    return (
      <>
        <div className="topmovies">
          <div className="row">
            <div className="col-md-12">
              <Link to="/movies" className="text-decoration-none ms-2">
                <h2>
                  Popular Movies{" "}
                  <span className="span">
                    Explore All <i className="fa-solid fa-angles-right"></i>
                  </span>
                </h2>
              </Link>
            </div>
            {movies && (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                grabCursor={true}
                slidesPerView={1}
                breakpoints={{
                  300: {
                    slidesPerView: 2,
                  },
                  490: {
                    slidesPerView: 3,
                  },
                  720: {
                    slidesPerView: 4,
                  },
                  960: {
                    slidesPerView: 5,
                  },
                  1140: {
                    slidesPerView: 7,
                  },
                }}
                navigation={true}
                autoplay={{ delay: 10000 }}
              >
                {movies.map((item) => {
                  return item.map((item, i) => {
                    // console.log(item);
                    const imageUrl = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
                    return (
                      <SwiperSlide key={i}>
                        {({ isActive }) => (
                          <Link
                            to={`/movie/${item.id}`}
                            onClick={() => window.scrollTo(0, 0)}
                            className="item text-decoration-none p-0 me-2 pt-1"
                          >
                            <div className="custom-slide">
                              <div className="custom-slide-img">
                                <img
                                  className="custom-img "
                                  src={imageUrl}
                                  alt="backdrop_path"
                                />
                                <span className="custom-average">
                                  {item.vote_average}
                                </span>
                              </div>
                              <div className="custom-slide-text text-center mt-2 p-1">
                                <h2 className="custom-title h6">
                                  {item.title}
                                </h2>
                              </div>
                            </div>
                          </Link>
                        )}
                      </SwiperSlide>
                    );
                  });
                })}
              </Swiper>
            )}
          </div>
        </div>
      </>
    );
}