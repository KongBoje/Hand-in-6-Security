var Ufacade = require("./Ufacade");

Ufacade.createUser("Michael", "mich123", (data) => {
    if(data != null) console.log("You created Michael successfully!")
})

Ufacade.createUser("Christian", "chris321", (data) => {
    if(data != null) console.log("You created Christian successfully!")
})