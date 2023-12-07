function manuallyParseCookies (cookie) {
    const list = {};
    // const cookieHeader = request.headers?.cookie;
    const cookieHeader = cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
};

export default manuallyParseCookies;