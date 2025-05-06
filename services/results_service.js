async function getResults(user_signature) {
    const url = new URL(`${window.VCF_APP_API}/get_results`)
    url.searchParams.append('user_signature', user_signature);
    return await fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}