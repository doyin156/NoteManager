const express = require("express");
const fs = require("fs").promises
const app = express();



app.post('/accounts', (req, res)=>{

    console.log(req.params)
    console.log(req.body)
    console.log(req.query)
    const accountCreationDate = new Date().toISOString();
    const newAccount = {
        // userName: req.body.username,
        // fullName: req.body.fullname,
        // email: req.body.email,
        ...req.body,
        createdAt: accountCreationDate,
        updatedAt: accountCreationDate
    }
    // console.log(newAccount)
    // const accountString = await fs.readFile("./accounts.json", "utf-8")
    // const accountObject = JSON.parse(accountString)
    // accountObject.push('./accounts.json', accountObject)

    res.send('acct route reached')

})


const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
