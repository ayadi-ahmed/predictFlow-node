const { mongoose } = require("mongoose");


const db_url = "mongodb+srv://predictflow:TvEQwfkevnWqtyWp@predictflow.qy5pf5d.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connected..."));