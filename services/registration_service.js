async function getRegisteredUser(user_signature) {
    console.log("url: ",window.VCF_APP_API)
    const url = new URL(`${window.VCF_APP_API}/get_registered_user`)
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


async function getResultsFolder(user_signature, package_string) {
    console.log("url: ",window.VCF_APP_API)
    const url = new URL(`${window.VCF_APP_API}/get_results_folder`)
    url.searchParams.append('user_signature', user_signature);
    url.searchParams.append('package_string', package_string);
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

async function postAxiosRegisterUser(data, callBack) {
    const url = `${window.VCF_APP_API}/post_register_user`;
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        onUploadProgress: callBack,
    };
    return await axios.post(url, data, config)
        .then(res => {
            console.log("this is the normal response\n", res);
            return res
        })
}

async function postAxiosUpdateCurrentFile(data, callBack) {
    const url = `${window.VCF_APP_API}/update_current_file`;
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        onUploadProgress: callBack,
    };
    return await axios.post(url, data, config)
        .then(res => {
            console.log("this is the normal response\n", res);
            return res
        })
        .catch(err => {
            console.log("Error completo:", err);
        });
}


async function postIsValidHashCode(hashCode) {
    const url = `${window.VCF_APP_API}/is_valid_hash_code`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hashCode })
        });
		if (!response.ok) {
            const errorResponse = await response.json();
            throw errorResponse
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

