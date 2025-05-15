async function postAnnotateUsingGiftCode(GiftCode, userSignature, packageString) {
    const url = new URL(`${window.VCF_APP_API}/annotate_vcf_using_gift_code`);
    url.searchParams.append('gift_code', GiftCode);
    url.searchParams.append('user_signature', userSignature);
    url.searchParams.append('package_string', packageString);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {}
    });
    const data = await response.json();
    if (data.status == "Failure") {
        const errorResponse = data?.status_details?.description;
        throw errorResponse
    }
    return data
}

async function getPresignedResultFileDownloadLink(user_signature, filePath) {
    const url = new URL(`${window.VCF_APP_API}/get_presigned_result_file_download_link`);
    url.searchParams.append('user_signature', user_signature);
    url.searchParams.append('file_path', filePath);
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