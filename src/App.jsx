// add useEffect and useRef as for mobile page load at the end instead of top
import { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { Route, Router, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';

const App = () => {
    const { activeSong } = useSelector((state) => state.player);
    // trying to fit it into iPhone x screen
    const isMobile = window.innerWidth <= 500;
    // add divRef here
    const divRef = useRef(null);

    // add useEffect and set timer for 1 second to let load content and scroll page to top
    useEffect(() => {
        setTimeout(() => divRef.current.scrollIntoView({ behavior: 'smooth' }), 500);
    });

    return (
        <div className='relative flex'>
            <Sidebar />
            {isMobile
                ? (
                    <div
                        ref={divRef}
                        className='flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]'
                        // add this to see if it will fix iPhone X not fitting into screen issue
                        style={{ width: '375px', height: 'auto' }}
                    >
                        <div className='px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
                            <div className='flex-1 h-fit pb-40'>
                                <Routes>
                                    <Route path='/' element={<Discover />} />
                                    <Route path='/top-artists' element={<TopArtists />} />
                                    <Route path='/top-charts' element={<TopCharts />} />
                                    <Route path='/around-you' element={<AroundYou />} />
                                    <Route path='/artists/:id' element={<ArtistDetails />} />
                                    <Route path='/songs/:songid' element={<SongDetails />} />
                                    <Route path='/search/:searchTerm' element={<Search />} />
                                </Routes>
                            </div>
                            <div className='xl:sticky relative top-0 h-fit'>
                                <TopPlay />
                            </div>
                        </div>
                        <Searchbar />
                    </div>
                )
                : (
                    <div className='flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]'>
                        {/* <div ref={divRef} className='flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]'> */}
                        <Searchbar />

                        <div className='px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
                            <div className='flex-1 h-fit pb-40'>
                                <Routes>
                                    <Route path='/' element={<Discover />} />
                                    <Route path='/top-artists' element={<TopArtists />} />
                                    <Route path='/top-charts' element={<TopCharts />} />
                                    <Route path='/around-you' element={<AroundYou />} />
                                    <Route path='/artists/:id' element={<ArtistDetails />} />
                                    <Route path='/songs/:songid' element={<SongDetails />} />
                                    <Route path='/search/:searchTerm' element={<Search />} />
                                </Routes>
                            </div>
                            <div className='xl:sticky relative top-0 h-fit'>
                                <TopPlay />
                            </div>
                        </div>
                    </div>
                )}
            {isMobile ? (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                    {activeSong?.title && (
                        <div className='fixed h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10'>
                            {/* <div className='absolute h-28 bottom-25 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10'> */}
                            <MusicPlayer />
                        </div>
                    )}
                </>
            ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                    {activeSong?.title && (
                        <div className='absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10'>
                            <MusicPlayer />
                        </div>
                    )}
                </>
            )}
            {/* {activeSong?.title && (
                <div className='absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10'>
                    <MusicPlayer />
                </div>
            )} */}
        </div>
    );
};

export default App;
