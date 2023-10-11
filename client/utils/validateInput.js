
/**
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
    const exp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig; // not perfect but works for now
    return exp.test(email);
}

/**
 * @param {string} password
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
    let exp = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[a-zA-Z])[a-zA-Z-\#\$\.\%\&\*\d]{8,16}$/g
    return exp.test(password);
}
