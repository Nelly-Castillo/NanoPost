const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Max-Age", "86400");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

        return res.status(200).end();
    }

    next();
}

module.exports = cors;