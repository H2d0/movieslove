import { useEffect } from "react"
import { useSelector , useDispatch } from "react-redux"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { fetchTv } from "../Redux/tv-slice";
import { Link } from 'react-router-dom';

export default function Tvshows() {
const tv = useSelector((state) => state.TvtopSlice)
const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTv())
    }, [])
    return (
      <>
        <div className="tvshows">
          <div className="row">
            <div className="col-md-12">
              <Link href="/tvshows" className="text-decoration-none ms-2">
                <h2>
                  Top Rated TV Shows{" "}
                  <span className="span">
                    Explore All <i className="fa-solid fa-angles-right"></i>
                  </span>
                </h2>
              </Link>
            </div>
            {tv && (
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
                {tv.map((item) => {
                  return item.map((item, i) => {
                    const imageUrl = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
                    return (
                      <SwiperSlide key={i + 1}>
                        {({ isActive }) => (
                          <Link
                            to={`/tv/${item.id}`}
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
                                <h2 className="custom-title h6">{item.name}</h2>
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
