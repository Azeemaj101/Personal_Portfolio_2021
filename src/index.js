// Library
const express = require("express");
const app = express();
const path = require("path");
const DB = require("./db");
const bodyParser = require("body-parser");
const session = require('express-session');
const multer = require('multer');
var fs = require('fs');

// Variables
let Port = process.env.PORT || 8000;
const static_path = path.join(__dirname, "..", "templates");
let temp_path = path.join(__dirname, "..", "templates", "views");


//  ==== Image Upload Code ====
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: function(req, file, cb) {
        cb(null, 'templates/DB_Pictures/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() +
                path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
var uploaded = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profile_picture');

var uploaded_blogs = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).fields([{ name: "picture1" }, { name: "picture2" }]);

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 86400000, signed: true }
}))


// Compunents
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "ejs");
app.set("views", temp_path);

// Routing
// Home Rout
app.get('/profilePicture', (req, res) => {
    res.redirect("/admin");
})
app.post('/profilePicture', (req, res) => {
    if (req.session.views == 1) {
        uploaded(req, res, (err) => {
            if (err) {
                res.render("adminPage", {
                    session: req.session,
                    imgErr: 1,
                    error: err,
                    info: 0

                });
            } else {
                if (fs.existsSync(`templates/${req.session.UserData[0].Picture}`)) {
                    fs.unlinkSync(`templates/${req.session.UserData[0].Picture}`)
                        // console.log(req.session.UserData[0].Picture);

                    const updateDocument = async() => {
                        try {
                            const result = await DB.updateOne({ Username: "azeemaj101" }, {
                                $set: {
                                    Picture: `DB_Pictures/${req.file.filename}`
                                }
                            });
                            const result1 = await DB.find({ Username: req.session.UserData[0].Username.toLowerCase() }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 });
                            req.session.UserData = result1;
                            res.render("adminPage", {
                                session: req.session,
                                imgErr: 2,
                                info: 0
                            });

                        } catch (err) {
                            res.render("Error404");
                        }
                    }
                    updateDocument();
                }
            }
        })
    } else {
        res.render("admin", {
            chk: 0
        });
    }
});

app.get("/", (req, res) => {
    const updateDocument = async() => {
        try {
            const result = await DB.updateOne({ Username: "azeemaj101" }, {
                $inc: {
                    views: 1
                }
            });
            if (req.session.views == 1) {

                const result = await DB.find({ Username: req.session.UserData[0].Username.toLowerCase() }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 });
                req.session.UserData = result;
                getDocument1();

            } else {
                getDocument1();

            }
        } catch (err) {
            res.render("Error404");
        }
    }
    updateDocument();
    const getDocument1 = async() => {
        try {
            const result = await DB.find({ Username: "azeemaj101" }).select({ projects: 1, blog: 1, Picture: 1, views: 1 });
            res.render("index", {
                obj: result
            })
            res.end();
        } catch (err) {
            res.render("Error404");

        }
    }
});
app.get("/blog", (req, res) => {
    const updateDocument = async() => {
        try {
            const result = await DB.updateOne({ Username: "azeemaj101" }, {
                $inc: {
                    views: 1
                }
            });
            if (req.session.views == 1) {

                const result = await DB.find({ Username: req.session.UserData[0].Username.toLowerCase() }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 });
                req.session.UserData = result;
                getDocument1();

            } else {
                getDocument1();

            }
        } catch (err) {
            res.render("Error404");
        }
    }
    updateDocument();
    const getDocument1 = async() => {
        try {
            const result = await DB.find({ Username: "azeemaj101" }).select({ projects: 1, blog: 1, Picture: 1, views: 1 });
            res.render("blog_title", {
                obj: result
            })
            res.end();
        } catch (err) {
            res.render("Error404");

        }
    }

})

// Admin Rout

app.get("/admin", (req, res) => {
    if (req.session.views == 1) {
        res.render("adminPage", {
            session: req.session,
            imgErr: 0,
            info: 0
        });

    } else {
        res.render("admin", {
            chk: 0
        });
    }

})

app.post("/admin", (req, res) => {
    const getDocument = async() => {
        try {
            let a = await DB.find({ $and: [{ Username: req.body.username.toLowerCase() }, { Password: req.body.password }] }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 }).countDocuments();
            if (a != 0) {
                req.session.views = 1;
                const result = await DB.find({ Username: req.body.username.toLowerCase() }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 });
                req.session.UserData = result;
                res.redirect("/admin");
            } else {
                res.render("admin", {
                    chk: 1
                });
            }
            res.end();

        } catch (err) {
            res.render("Error404");

        }
    }
    getDocument();
})

app.get("/set", (req, res) => {
    const createDocument = async() => {
        try {
            // let user = req.body.username.toLowerCase();
            const data = new DB({
                    Name: "Muhammad Azeem",
                    Username: "azeemaj101",
                    Password: "27659199",
                    Picture: "pictures/7.jpg",
                    views: 200
                })
                // req.session.views = 1;
            const result = await data.save();
            // console.log(result)
            // res.send(result);

        } catch (err) {
            res.render("Error404");

        }
    }
    createDocument();
})

app.post("/submit_projects", (req, res) => {
    if (req.session.views == 1) {
        const updateDocument = async() => {
            try {
                const result = await DB.updateOne({ Username: req.session.UserData[0].Username }, {
                    $push: {
                        projects: {
                            link: req.body.link,
                            title: req.body.title,
                            para: req.body.para,
                            language: req.body.language
                        }
                    }
                });
            } catch (err) {
                res.render("Error404");
            }
        }
        updateDocument();
        res.redirect('/update');
    }
});

app.get("/update", (req, res) => {
    if (req.session.views == 1) {
        const getDocument1 = async() => {
            try {
                const result = await DB.find({ Username: req.session.UserData[0].Username.toLowerCase() }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 });
                req.session.UserData = result;
                res.redirect("/admin");
                res.end();
            } catch (err) {
                res.render("Error404");

            }
        }
        getDocument1();
    } else {
        res.redirect("/admin");
    }
})
app.get("/updateForProject", (req, res) => {
    if (req.session.views == 1) {
        const getDocument1 = async() => {
            try {
                const result = await DB.find({ Username: req.session.UserData[0].Username.toLowerCase() }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 });
                req.session.UserData = result;
                res.redirect("/projectEdit");
                res.end();
            } catch (err) {
                res.render("/projectEdit", {
                    chk: 1
                });

            }
        }
        getDocument1();
    } else {
        res.redirect("/admin");
    }
})

// Edit Pages Routing
app.get("/projectEdit", (req, res) => {
    const d = new Date();
    if (req.session.views == 1) {
        res.render("projectEdit", {
            session: req.session,
            chk: 0,
            year: d.getFullYear()
        });

    } else {
        res.render("admin", {
            chk: 0
        });
    }
});

app.delete('/delete/:id', (req, res) => {

    if (req.session.views == 1) {
        const getDocument1 = async() => {
            try {
                let result2 = await DB.updateOne({ Username: req.session.UserData[0].Username }, {
                    $pull: {
                        projects: {

                            link: req.session.UserData[0].projects[req.params.id].link,
                            title: req.session.UserData[0].projects[req.params.id].title,
                            para: req.session.UserData[0].projects[req.params.id].para,
                            language: req.session.UserData[0].projects[req.params.id].language
                        }
                    }
                });
                const result = await DB.find({ Username: req.session.UserData[0].Username.toLowerCase() }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 });
                req.session.UserData = result;
                // console.log(result);
                res.end();
            } catch (err) {
                res.render("Error404");

            }
        }
        getDocument1();

        // res.redirect("/update");
    } else {
        // res.redirect("/");
    }
})

app.post("/Update_projects", (req, res) => {
    if (req.session.views == 1) {
        // console.log(req.session.UserData[0].projects[req.body.id].link)
        const getDocument12 = async() => {
            try {
                let result2 = await DB.updateMany({ Username: req.session.UserData[0].Username, "projects.link": req.session.UserData[0].projects[req.body.id].link, "projects.title": req.session.UserData[0].projects[req.body.id].title }, {
                    $set: {
                        'projects.$.link': req.body.link,
                        'projects.$.title': req.body.title,
                        'projects.$.para': req.body.para,
                        'projects.$.language': req.body.language
                    }
                });
                // console.log(result2);
            } catch (err) {
                res.render("Error404");
            }
        }
        getDocument12();
        res.redirect('/updateForProject');
    } else {
        res.redirect("/admin");
    }
});

app.get("/UpdateInfo", (req, res) => {
    res.redirect("/admin");
})
app.post("/UpdateInfo", (req, res) => {
    if (req.session.views == 1) {

        const updateDocument = async() => {
            try {
                const result = await DB.updateOne({ Username: req.session.UserData[0].Username }, {
                    $set: {
                        Username: req.body.username,
                        Password: req.body.password
                    }
                });
                if (result.nModified == 1) {
                    req.session.UserData[0].Username = req.body.username;
                }
                const result1 = await DB.find({ Username: req.session.UserData[0].Username.toLowerCase() }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 });
                req.session.UserData = result1;
                // getDocument1();
                res.render("adminPage", {
                    session: req.session,
                    imgErr: 0,
                    info: 1

                });

                // console.log(result1);
            } catch (err) {
                res.render("Error404");
            }
        }
        updateDocument();
    } else {
        res.redirect("/admin");
    }
})

// Blog Routing
app.get("/year2020", (req, res) => {
    res.render("year2020")
});
app.get("/addBlog", (req, res) => {
    res.redirect("/admin")
});

app.post("/addBlog", (req, res) => {
    if (req.session.views == 1) {
        uploaded_blogs(req, res, (err) => {
            if (err) {
                res.render("adminPage", {
                    session: req.session,
                    imgErr: 1,
                    error: err,
                    info: 0

                });
            } else {

                const updateDocument = async() => {
                    try {
                        const result = await DB.updateOne({ Username: req.session.UserData[0].Username.toLowerCase() }, {
                            $push: {
                                blog: {
                                    title: req.body.title,
                                    desc: req.body.desc,
                                    picture1: `DB_Pictures/${req.files.picture1[0].filename}`,
                                    para1: req.body.para1,
                                    picture2: `DB_Pictures/${req.files.picture2[0].filename}`,
                                    para2: req.body.para2
                                }
                            }
                        });
                        const result1 = await DB.find({ Username: req.session.UserData[0].Username.toLowerCase() }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 });
                        req.session.UserData = result1;
                        res.render("adminPage", {
                            session: req.session,
                            imgErr: 2,
                            info: 0
                        });
                    } catch (err) {
                        res.render("Error404");
                    }
                }
                updateDocument();
            }
        })
    } else {
        res.render("admin", {
            chk: 0
        });
    }
});

app.get("/blogEdit", (req, res) => {
    if (req.session.views == 1) {
        res.render("editBlog", {
            session: req.session,
            chk: 0,
        });

    } else {
        res.render("admin", {
            chk: 0
        });
    }
})

app.delete('/deleteBlog/:id', (req, res) => {

    if (req.session.views == 1) {
        const getDocument1 = async() => {
            try {
                let result2 = await DB.updateOne({ Username: req.session.UserData[0].Username }, {
                    $pull: {
                        blog: {
                            title: req.session.UserData[0].blog[req.params.id].title,
                            desc: req.session.UserData[0].blog[req.params.id].desc,
                            picture1: req.session.UserData[0].blog[req.params.id].picture1,
                            para1: req.session.UserData[0].blog[req.params.id].para1,
                            picture2: req.session.UserData[0].blog[req.params.id].picture2,
                            para2: req.session.UserData[0].blog[req.params.id].para2,
                        }
                    }
                });
                if (fs.existsSync(`templates/${req.session.UserData[0].blog[req.params.id].picture1}`) && fs.existsSync(`templates/${req.session.UserData[0].blog[req.params.id].picture2}`)) {
                    fs.unlinkSync(`templates/${req.session.UserData[0].blog[req.params.id].picture1}`)
                    fs.unlinkSync(`templates/${req.session.UserData[0].blog[req.params.id].picture2}`)
                }
                const result = await DB.find({ Username: req.session.UserData[0].Username.toLowerCase() }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 });
                req.session.UserData = result;
                // console.log(result2);
                res.end();
            } catch (err) {
                res.render("Error404");

            }
        }
        getDocument1();

        // res.redirect("/update");
    } else {
        // res.redirect("/");
    }
})
app.post("/Update_blog", (req, res) => {
    if (req.session.views == 1) {
        uploaded_blogs(req, res, (err) => {
            if (err) {
                res.render("adminPage", {
                    session: req.session,
                    imgErr: 1,
                    error: err,
                    info: 0

                });
            }
            if (req.files.picture1 == undefined && req.files.picture2 == undefined) {
                const getDocument12 = async() => {
                    try {
                        let result2 = await DB.updateMany({ Username: req.session.UserData[0].Username, "blog.title": req.session.UserData[0].blog[req.body.id].title, "blog.desc": req.session.UserData[0].blog[req.body.id].desc }, {
                            $set: {
                                'blog.$.title': req.body.title,
                                'blog.$.desc': req.body.desc,
                                'blog.$.picture1': req.session.UserData[0].blog[req.body.id].picture1,
                                'blog.$.para1': req.body.para1,
                                'blog.$.picture2': req.session.UserData[0].blog[req.body.id].picture2,
                                'blog.$.para2': req.body.para2
                            }
                        });
                        const result1 = await DB.find({ Username: req.session.UserData[0].Username.toLowerCase() }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 });
                        req.session.UserData = result1;
                        res.redirect('/blogEdit');
                    } catch (err) {
                        res.render("Error404");
                    }
                }
                getDocument12();
            }
            if (req.files.picture1 != undefined && req.files.picture2 != undefined) {
                if (fs.existsSync(`templates/${req.session.UserData[0].blog[req.body.id].picture1}`) && fs.existsSync(`templates/${req.session.UserData[0].blog[req.body.id].picture2}`)) {
                    fs.unlinkSync(`templates/${req.session.UserData[0].blog[req.body.id].picture1}`)
                    fs.unlinkSync(`templates/${req.session.UserData[0].blog[req.body.id].picture2}`)
                    const getDocument12 = async() => {
                        try {
                            let result2 = await DB.updateMany({ Username: req.session.UserData[0].Username, "blog.title": req.session.UserData[0].blog[req.body.id].title, "blog.desc": req.session.UserData[0].blog[req.body.id].desc }, {
                                $set: {
                                    'blog.$.title': req.body.title,
                                    'blog.$.desc': req.body.desc,
                                    'blog.$.picture1': `DB_Pictures/${req.files.picture1[0].filename}`,
                                    'blog.$.para1': req.body.para1,
                                    'blog.$.picture2': `DB_Pictures/${req.files.picture2[0].filename}`,
                                    'blog.$.para2': req.body.para2
                                }
                            });
                            const result1 = await DB.find({ Username: req.session.UserData[0].Username.toLowerCase() }).select({ projects: 1, blog: 1, Name: 1, Username: 1, Picture: 1, views: 1 });
                            req.session.UserData = result1;
                            res.redirect('/blogEdit');
                        } catch (err) {
                            res.render("Error404");
                        }
                    }
                    getDocument12();
                }
            }
        })
    } else {
        res.redirect("/admin");
    }
});

app.get("/blogRead/:id", (req, res) => {
        const getDocument1 = async() => {
            try {
                const result = await DB.find({
                    Username: "azeemaj101"
                }).select({ blog: 1 });
                res.render("ReadBlog", {
                    obj: result[0].blog[req.params.id]
                })
                res.end();
            } catch (err) {
                res.render("Error404");

            }
        }
        getDocument1();
    })
    // Logout Routing
app.get("/logout", (req, res) => {
    if (req.session.views == 1) {
        req.session.views = 0;
        res.redirect("/admin");
    } else {
        res.redirect("/");
    }
})

// Server
app.listen(Port, () => {
    console.log(`Listing on Port ${Port}`);
})