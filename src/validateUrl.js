const validateUrl = (text) => {
    return /(deezer.com|deezer.page.link)/.test(text);
}

export default validateUrl;