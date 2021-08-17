"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var mongoose_1 = __importDefault(require("mongoose"));
var is_auth_1 = require("./helpers/is-auth");
var morgan_1 = __importDefault(require("morgan"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var auth_1 = __importDefault(require("./routes/auth"));
var user_1 = __importDefault(require("./routes/user"));
var MONGODB_URI = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@clear-cluster.2zd4u.mongodb.net/" + process.env.MONGO_DEFAULT_DATABASE + "?retryWrites=true&w=majority";
var accessLogStream = fs_1.default.createWriteStream(path_1.default.join(path_1.default.resolve(), "access.log"), { flags: "a" });
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(morgan_1.default("combined", { stream: accessLogStream }));
app.use("*", is_auth_1.isAuth);
app.use("/auth", auth_1.default);
app.use("/user", user_1.default);
mongoose_1.default
    .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(function () {
    app.listen(process.env.PORT || 5000, function () {
        console.log("Node server is listening on port " + process.env.PORT);
    });
})
    .catch(function (err) { return console.log(err); });
app.use(function (error, _a, res, _b) {
    var statusCode = error.statusCode, message = error.message, validErrors = error.validErrors;
    var msg = message;
    console.log(message);
    if (message.includes(":")) {
        msg = message.split(":")[2].split(" ,")[0];
    }
    return res.status(statusCode || 500).json({
        message: msg || "An unknown error occurred",
        validErrors: validErrors || [],
    });
});
//# sourceMappingURL=app.js.map