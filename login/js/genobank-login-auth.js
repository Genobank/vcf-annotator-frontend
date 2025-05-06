class GenoBankLoginAuth {
    constructor(persistent = true) {
        this.isPersistent = persistent;
    }

    async loginWithPopup() {
        return new Promise((resolve, reject) => {
            const width = 850;
            const height = 750;
            const left = (window.innerWidth - width) / 2 + window.screenX;
            const top = (window.innerHeight - height) / 2 + window.screenY;

            const popup = window.open(
                `/login/genobank_auth/index.html`, 
                'LoginToContinue', 
                `width=${width},height=${height},resizable=no,scrollbars=no,status=no,toolbar=no,menubar=no,location=no,directories=no,left=${left},top=${top}`
            );

            window.addEventListener('message', (event) => {
                if (event.origin !== window.location.origin) return;

                if (event.data && event.data.type === 'loginData') {
                    resolve(event.data.loginData);
                    popup.close();
                }
            });

            const checkPopupClosed = setInterval(() => {
                if (!popup || popup.closed) {
                    clearInterval(checkPopupClosed);
                    if (!this.isLoggedIn()) {
                        resolve();
                    }else{
                        resolve(new Error('Error: User closed popup'))
                    }
                }
            }, 1000);

            if (!popup) {
                reject(new Error("Can not open pop-up. Please, check your pop-ups locker."));
            }
        });
    }

    isLoggedIn() {
        let loggedUserSignature = localStorage.getItem('user_sign');
        let didToken = localStorage.getItem('magic_token');
        return !!loggedUserSignature || !!didToken;
    }

    getUserToken() {
        const userToken = localStorage.getItem('user_sign');
        return userToken;
    }

    getUserSignatureIfNotMagicToken() {
        const userToken = localStorage.getItem('magic_token') ? localStorage.getItem('magic_token') : localStorage.getItem('user_sign');
        return userToken;
    }

    getUserWallet() {
        return localStorage.getItem('user_wallet');
    }

    getUserAuthMethod() {
        return localStorage.getItem('login_method');
    }

    logout() {
        this.removeUserTokens();
    }

    removeUserTokens() {
        localStorage.removeItem('magic_token');
        localStorage.removeItem('user_sign');
        localStorage.removeItem('user_wallet');
        localStorage.removeItem('login_method');
        localStorage.removeItem('isPermittee');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('picture');
        localStorage.removeItem('registration');

    }
}

