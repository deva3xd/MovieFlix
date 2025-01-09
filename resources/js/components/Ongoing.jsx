import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from '@inertiajs/react';
import { Pagination } from 'swiper/modules';

const Ongoing = ({ data }) => {
    const imgURL = import.meta.env.VITE_IMGURL;

    return (
        <div className="bg-custom-primary text-white px-10 py-7">
            <h2 className="text-3xl mb-2 font-bold">Ongoing</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop='true'
                centeredSlides='true'
                fadeEffect='true'
                grabCursor='true'
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 4,
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
                                <Link href={route('detail', { id: data.id, ongoing: true })}>
                                    <div className="card w-60 bg-white shadow-xl rounded-none mb-9">
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

export default Ongoing;