const express = require("express");
const app = express();
const {
    CustomerController,
    ActivityController,
    CustomerOrderController,
    ArticleController,
    UserController,
    CategoryController,
    SupplierController,
    CompanyOrderController,
    PredictionController
} = require("./controller");
const cors = require("cors");
require("./db/connect")

app.use(cors())
app.use(express.json())
CustomerController(app);
ActivityController(app);
CustomerOrderController(app);
ArticleController(app);
CategoryController(app);
SupplierController(app);
CompanyOrderController(app);
UserController(app); 
PredictionController(app); 

app.listen(3000, () => {
    console.clear();
    console.log("PredictStock app listening on port 3000")
})



