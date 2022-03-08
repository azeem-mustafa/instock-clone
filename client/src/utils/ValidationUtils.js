/*   Regular Expression Definitions

==== PHONE ====
- MUST contain 10 digits in total.
- May be entered with the following format:
        +1 (555) 555-5555

==== EMAIL ====
Case insensitive.
    - Must start with a letter
    - May contain any of the following special characters  + . _ -
    - Must contain only one @
    - Must have a domain ending in .com or .ca
    - String before '@' must be at least 3 characters in length
    - Domain name can only contain letters

==== GENERAL ====
Case insensitive.
    - Must start and end with a letter
    - May contain any number of spaces, - or '
*/
    
const phoneRegExp = /^\+?1? ?\(?[0-9]{3}\)?[ -]?[0-9]{3}[ -]?[0-9]{4}$/;
const emailRegExp = /^[a-z][a-z0-9.+\-_]{1,}([a-z]|[0-9])+@{1}[a-z]+(\.com|\.ca)$/i;
const generalTextRegExp = /^[a-z]{1}[ \-'a-z]+[a-z]{1}$/i;


/**
 * Tests if a string passes the PHONE regular expression and returns a boolean value.
 * 
 * @param {string} phone text string entered in user input
 * @returns {boolean} true if the string passes the test, false on failure
 */
export const checkPhoneNumber = phone => phoneRegExp.test(phone);


/**
 * Tests if a string passes the EMAIL regular expression and returns a boolean value.
 * 
 * @param {string} email text string entered in user input
 * @returns {boolean} true if the string passes the test, false on failure
 */
export const checkEmail = email => emailRegExp.test(email);


/**
 * Tests if a general text input passes the GENERAL regular expression and returns a boolean value.
 * 
 * @param {string} input text string entered in user input
 * @returns {boolean} true if the string passes the test, false on failure
 */
export const checkGeneralText = input => generalTextRegExp.test(input);


/**
 * Checks if the input is currently empty. Returns a boolean value.
 * 
 * @param {string} input string entered in user input
 * @returns {boolean} true if the string is NOT empty, false if the current input is empty.
 */
export const checkForText = input => {
    if(input.trim() === "") {
        return false;
    }
    return true;
};


/**
 * Completes an entire check of all possible errors for the entered input based on the type. Returns boolean value
 * 
 * @param {string} inputField the name of the input field
 * @param {string} inputText the actual text entered into the field
 * @returns {boolean} true if errors are present, false if no errors
 */
export const checkInputForErrors = (inputField, inputText) => {
    if(!checkForText(inputText)) {
        return true;
    }
    if(inputField === "phone" && !checkPhoneNumber(inputText)) {
        return true;
    }
    if(inputField === "email" && !checkEmail(inputText)) {
        return true;
    }
    return false;
}