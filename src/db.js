const mongoose = require('mongoose')
const dotenv = require("dotenv");
const path = require("path");
const envpath = path.join(__dirname, "/config.env");
dotenv.config({ path: envpath })

const DB = "mongodb+srv://azeemaj101:print(mongo27659199)@cluster0.lpbw8.mongodb.net/azeemaj101?retryWrites=true&w=majority";

// mongoose.connect("mongodb://localhost:27017/Azeemaj101", {
mongoose.connect(`${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Success")
}).catch((err) => {
    console.log("error: " + err);
});
const userData = new mongoose.Schema({

    views: {
        type: Number,
        unique: false,
        required: false
    },
    Name: {
        type: String,
        unique: false,
        required: true
    },
    Username: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Picture: {
        type: String,
        unique: true,
        required: true
    },
    blog: {
        type: Array,
        items: {
            type: Object,
            properties: {
                title: {
                    type: String
                },
                desc: {
                    type: String
                },
                picture1: {
                    type: String
                },
                para1: {
                    type: String
                },
                picture2: {
                    type: String
                },
                para2: {
                    type: String
                }
            }
        }
    },
    projects: {
        type: Array,
        items: {
            type: Object,
            properties: {
                link: {
                    type: String
                },
                title: {
                    type: String
                },
                para: {
                    type: String
                },
                language: {
                    type: String
                }
            }
        }
    }

})
const list = new mongoose.model("Data", userData);

module.exports = list;
// module.exports = mongoose.model('DB123', userData2)