

async function importFileRoutes(user_signature) {
    const filter = {"type":["23ANDME"]}
    const url = new URL(`${window.GENOBANK_APP_API}/get_my_filtered_uploaded_files_urls`)
    url.searchParams.append('user_signature', user_signature);
    url.searchParams.append('_filter', JSON.stringify(filter));

    // const url = new URL(`${window.GENOBANK_APP_API}/get_my_uploaded_files_urls`)
    // url.searchParams.append('user_signature', user_signature);



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

async function getContentFromFileUrl(user_signature, filename, file_type, original_name) {
    const url = new URL(`${window.GENOBANK_APP_API}/get_content_from_my_uploaded_file`)
    url.searchParams.append('signature', user_signature);
    url.searchParams.append('filename', filename);
    url.searchParams.append('file_type', file_type);
    const fileResponse = await fetch(url)
    const fileBlob = await fileResponse.blob();
    return new File([fileBlob], original_name, { type: fileBlob.type });
}