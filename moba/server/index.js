const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.set('secret','asnjfldjf');

app.use("/admin", express.static(__dirname + "/admin"));
app.use("/", express.static(__dirname + "/web"));
app.use("/uploads", express.static(__dirname + "/upload"));

require("./plugins/db")(app);
require("./routes/admin/index")(app);
require("./routes/web/index")(app);

app.listen(3000, () => {
    console.log("running!");
});
