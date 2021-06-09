module.exports = {
    hasSubDomain: (req) => {
        if (req.subdomains.length > process.env.SUB_DOMAIN_LENGHT)
            return true;
        return false;
    },
    subdomain: (req) => {
        return req.subdomains[process.env.SUB_DOMAIN_INDEX];
    },
    getSubdomain: (req) => {
        return req.subdomains[process.env.SUB_DOMAIN_INDEX];
    }
}