//register page (not in our project)
router.get("/register", (req, res) => {
    res.render("users/register", {
        errors: [],
        name: "",
        email: "",
        password: "",
        password2: ""
    });
});

//not in out project
router.post("/register", (req, res) => {
    (async () => {
        let errors = [];
        //password validations
        if (req.body.password !== req.body.password2) {
            errors.push({ text: "passwords do not match" });
        }

        if (req.body.password.length < 4) {
            errors.push({ text: "Password length is small" });
        }

        if (errors.length > 0) {
            res.render("users/register", {
                errors: errors,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                password2: req.body.password2
            });
        }

        //if no errors regarding the validations
        else {
            //all validations passed
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                firstUser: false
            }); //we will create a newUser variable

            //now we have to check whether the email id exists or not
            User.findOne({ email: newUser.email }).then(user => {
                if (user && user.googleID.length > 0) {
                    errors.push({ text: "Use Google Login" });

                    res.render("users/register", {
                        errors: errors,
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        password2: req.body.password2
                    });
                } else if (user && user.googleID.length <= 0) {
                    errors.push({ text: "User already Exists" });
                    res.render("users/register", {
                        errors: errors,
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });

                    console.log("error_msg", error_msg);
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        //to generate salt for length upto 10 to hash the password
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            //these two lines is used to convert entered password to hash

                            newUser.password = hash;
                            newUser.save().then(() => {
                                req.flash("success_msg", "Registration Successful");
                                res.redirect("/users/login");
                            });
                        });
                    });
                }
            });
        }
    })();
});