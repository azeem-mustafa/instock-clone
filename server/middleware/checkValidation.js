const isValidData = (req, res, next) => {
  const phoneRegExp = /^\+?1? ?\(?[0-9]{3}\)?[ -]?[0-9]{3}[ -]?[0-9]{4}$/;
  const emailRegExp =
    /^[a-z][a-z0-9.+\-_]{1,}([a-z]|[0-9])+@{1}[a-z]+(\.com|\.ca)$/i;
  const generalTextRegExp = /^[ \-'a-z0-9]+$/i;

  let isValid = true;
  // Loop through each property in req.body to check if it passes validation
  for (const property in req.body) {
    if (req.body[property] === "" && property !== "contact") {
      console.log(req.body[property], "empty string");
      isValid = false;
    }
    if (!generalTextRegExp.test(req.body[property]) && property !== "contact") {
      isValid = false;
    }

    // req.body.contact is an object. Loop through this as well.
    if (property === "contact") {
      for (const contactProperty in req.body[property]) {
        console.log(contactProperty, req.body[property][contactProperty]);

        if (
          contactProperty === "phone" &&
          !phoneRegExp.test(req.body[property][contactProperty])
        ) {
          isValid = false;
        }
        if (
          contactProperty === "email" &&
          !emailRegExp.test(req.body[property][contactProperty])
        ) {
          isValid = false;
        }
      }
    }
  }

  if (isValid) {
    next();
  } else {
    res.status(404).json({ error: "Invalid data provided" });
  }
};

module.exports = {
  isValidData,
};
