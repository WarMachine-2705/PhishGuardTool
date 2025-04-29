const dns = require("dns");

const suspiciousPatterns = [
    /bit\.ly/, /tinyurl\.com/,
    /login.*\.php/, /secure.*\.html/,
    /bank/, /paypal/, /verify/
];

exports.checkUrlSafety = (url) => {
    return new Promise((resolve) => {
        const domain = new URL(url).hostname;

        if (suspiciousPatterns.some((pattern) => pattern.test(url))) {
            return resolve(false);
        }

        dns.resolve(domain, (err) => {
            resolve(!err);
        });
    });
};
