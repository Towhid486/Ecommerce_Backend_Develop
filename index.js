const app = require("./app")
const Port = 8080;
app.listen(Port, () => {
    console.log(`App running on @ ${Port}`)
})