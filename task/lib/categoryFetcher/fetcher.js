export const fetcher = (url) => fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}
).then((res) => res.json()).then((json) => json.data);
