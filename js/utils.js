function isLoggedIn() {
  let loggedUserSignature = localStorage.getItem('user_sign');
  let didToken = localStorage.getItem('magic_token');
  return !!loggedUserSignature || !!didToken;
}

function getUserToken() {
  const userToken = localStorage.getItem('user_sign');
  return userToken;
}

function getEmail() {
  const email = localStorage.getItem('email');
  return email;
}

function getMagicToken() {
  const magicToken = localStorage.getItem('magic_token');
  return magicToken;
}

function getPicture() {
  const picture = localStorage.getItem('picture');
  return picture;
}

function getIsPermittee() {
  const isPermittee = localStorage.getItem('isPermittee');
  return isPermittee
}

function getName() {
  const name = localStorage.getItem('name');
  return name;
}

function getUserSignatureIfNotMagicToken() {
  const userToken = localStorage.getItem('magic_token') ? localStorage.getItem('magic_token') : localStorage.getItem('user_sign');
  return userToken;
}

function getUserWallet() {
  return localStorage.getItem('user_wallet');
}

function getLoginMethod() {
  return localStorage.getItem('login_method') || null;
}

function getUserAuthMethod() {
  return localStorage.getItem('login_method');
}

function logout() {
  removeUserTokens();
}

function getLocalRegistration() {
  const StrRegistration = localStorage.getItem('registration');
  return JSON.parse(StrRegistration)
}

function setLocalRegistration(registration) {
  localStorage.setItem('registration', JSON.stringify(registration));
}

function setLocalJobStatus(jobStatus) {
  localStorage.setItem('jobStatus', JSON.stringify(jobStatus));
}

function getLocalJobStatus() {
  const StrJobStatus = localStorage.getItem('jobStatus');
  return JSON.parse(StrJobStatus)
}

function removeUserTokens() {
  localStorage.clear();
}

function isEmpty(value) {
  if (value == null) {
    return true;
  }
  const type = typeof value;
  if (type === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }
  if (type === 'object') {
    return Object.keys(value).length === 0;
  }
  if (type === 'boolean' || type === 'number') {
    return !value;
  }
  return false;
}

function redirectToPage(url) {
  if (typeof url === 'string' && url.trim().length > 0) {
    window.location.href = url;
  } else {
    console.error('Invalid URL provided to redirectToPage');
  }
}

function roundAncestryValues(ancestryData) {
  const roundedAncestry = { ...ancestryData };

  Object.keys(roundedAncestry.ancestry).forEach(key => {
    const value = parseFloat(roundedAncestry.ancestry[key]);
    roundedAncestry.ancestry[key] = (value * 100).toFixed(2);
  });

  return roundedAncestry;
}


function shortWallet(wallet) {
  return shortText(wallet, 7, 5)
}

function shortText(text, firsts, lasts) {
  return text.length > firsts + lasts ?
    text.substring(0, firsts) + "..." + text.substring(text.length - lasts, text.length)
    :
    text;
}

function getSearchParamCaseInsensitive(url, paramName) {
  const urlObj = new URL(url);
  const params = urlObj.searchParams;
  const paramNameLower = paramName.toLowerCase();

  for (const [key, value] of params.entries()) {
    if (key.toLowerCase() === paramNameLower) {
      return value;
    }
  }

  return null;
}