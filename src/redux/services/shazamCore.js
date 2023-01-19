import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// next content could ne useless - but for know Ill keep it
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '7f0834bd79msh480b4f1ef5f113dp16b8a6jsna92d72f2b089',
//         'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
//     },
// };

// fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '7f0834bd79msh480b4f1ef5f113dp16b8a6jsna92d72f2b089');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world' }),
    }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
