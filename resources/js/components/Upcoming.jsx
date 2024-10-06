import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from '@inertiajs/react';

const Upcoming = ({ data }) => {
    const imgURL = import.meta.env.VITE_IMGURL;

    return (
        <div className="bg-gray-200 text-black px-10 py-7">
            <h2 className="text-3xl mb-2 font-bold">Upcoming</h2>
            <Swiper
                slidesPerView={6}
                spaceBetween={0}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 0,
                    },
                }}
            >
                {data.length == 0 ? (
                    <p className="py-3 text-xl">No Movie Available</p>
                ) : (
                    data.map(data => {
                        return (
                            <SwiperSlide key={data.id}>
                                <Link href={route('detail', { id: data.id, ongoing: false })}>
                                    <div className="card w-44 bg-white shadow-xl rounded-none">
                                        <figure><img src={`${imgURL}/w500/${data.poster_path}`} alt={data.title} /></figure>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })
                )}
            </Swiper>
        </div>
    )
}

export default Upcoming;