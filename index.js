const express = require("express");
const config = require("./config.json");
const morgan = require("morgan");
const projectManager = require("./util/project-manager");
const stats = require("./util/stats");
const passport = require("passport");
const bodyParser = require("body-parser");
const GitHubStrategy = require("passport-github2");

const app = express();
const port = config.port;

app.use(morgan("common"));
app.use(bodyParser.urlencoded({extended: false}));

app.use(require("express-session")({
    secret: require("uid-safe").sync(128),
    saveUninitialized: false,
    resave: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));


passport.use(new GitHubStrategy({
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: config.url + "/auth/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        })
    }));

app.get('/auth',
    passport.authenticate('github', {scope: ['user:email']}));

app.get('/auth/callback',
    passport.authenticate('github', {failureRedirect: '/'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.set("view engine", "ejs")

const rte = new (require("./routes/index"))(app);
require("./routes/projects")(app);

projectManager.init()
    .then(() => stats.init())
    .then(() => app.listen(port, () => console.log(`Listening on port ${port}`)));