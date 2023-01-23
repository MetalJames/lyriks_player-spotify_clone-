// add useEffect and useRef as for mobile page load at the end instead of top
import { useEffect, useRef } from 'react';
import { ArtistCard, Loader, Error } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
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
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Top Artists</h2>
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.map((track) => (
                    <ArtistCard
                        key={track.key}
                        track={track}
                    />
                ))}
            </div>
        </div>
    );
};

export default TopArtists;
