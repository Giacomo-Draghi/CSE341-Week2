const cors = require('cors') // Place this with other requires (like 'path' and 'express')
const PORT = process.env.PORT || 5000;
// Importing modules
// My routers
const routes = require('./routes');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// Express JS
const express = require('express');
// Body parser
const bodyParser = require('body-parser');
// Path
const path = require('path');
// mongoose
const mongoose = require('mongoose');
// Controllers
const errorController = require('./controllers/error');
const User = require('./models/user');
const { use } = require('./routes/shop');

// Creating a express application
const app = express();

// telling to compile with templates and adding it
app.set('view engine', 'ejs');
app.set('views', 'views');

// Working with the middleware
// parsing 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findById('609fb293058ce545b429f912')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

// Calling the router object
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const corsOptions = {
    origin: "https://<your_app_name>.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://giacomo:963741@cluster0.btxa6.mongodb.net/shop?retryWrites=true&w=majority";


mongoose
    .connect(
        MONGODB_URL, options
    )
    .then(result => {
        // This should be your user handling code implement following the course videos
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Giacomo',
                    email: 'jak127@yahoo.it',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    })
    .catch(err => {
        console.log(err);
    });
