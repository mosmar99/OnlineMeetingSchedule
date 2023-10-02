
/**
 * @param {string} email 
 * @returns {boolean}
 */
const isValidEmail = (email) => {
    const exp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig; // not perfect but works for now
    return exp.test(email);
}

module.exports = {
    isValidEmail
}