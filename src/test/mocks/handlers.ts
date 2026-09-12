import { http, HttpResponse } from 'msw';

const API_URL = 'http://localhost:5000/api';

export const handlers = [
    http.get(`${API_URL}/watchlist/getList`, () => {
        return HttpResponse.json([
            {
                id: '101',
                githubId: 101,
                name: 'react',
                fullName: 'facebook/react',
                htmlUrl: 'https://github.com/facebook/react',
                stargazersCount: 200000,
                language: 'JavaScript',
                note: 'Favorite UI library'
            }
        ]);
    }),
    http.delete(`${API_URL}/watchlist/delete/:id`, () => {
        // Return 500 server error to simulate backend failure
        return new HttpResponse(null, { status: 500 });
    }),
];