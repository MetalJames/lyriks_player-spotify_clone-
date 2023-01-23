// add useEffect and useRef as for mobile page load at the end instead of top
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetTopChartsQuery();

    // add divRef here
    const divRef = useRef(null);

    // add useEffect and set timer for 1 second to let load content and scroll page to top
    useEffect(() => {
        setTimeout(() => divRef.current.scrollIntoView({ behavior: 'smooth' }), 700);
    });

    if (isFetching) return <Loader title='Loading Top Charts...' />;

    if (error) return <Error />;

    return (
        <div ref={divRef} className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Discover Top Charts</h2>
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    );
};

export default TopCharts;
