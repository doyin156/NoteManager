const express = require("express");
const fs = require("fs").promises
const cuid = require("cuid")
const app = express();

app.use(express.json())

app.get("/", (req, res)=>{
    res.status(200).json({msg: "Welcome to your note manager API"})
})


app.get('/notes', async(req, res)=>{
   try {
    const notesToString = await fs.readFile("./notes.json", "utf-8");
    const notes = JSON.parse(notesToString)
    res.status(200).json({msg:"Note fetched", notes})
   } catch (error) {
    res.status(500).json({msg: error.message})
   }
})


app.post('/notes', async(req, res)=>{
   try {
    console.log(req.query)
    console.log(req.body)
    console.log(req.params)
    const date = new Date().toISOString();
    const newNote = {
        id: cuid(),
        ...req.body,
        createdAt: date,
        updatedAt: date
    }
    console.log(newNote)
    const notesString = await fs.readFile("./notes.json", "utf-8")
    const noteObject = JSON.parse(notesString)
    const username = req.body.name.toLowerCase();
    if(!noteObject[username]){
        noteObject[username] = [newNote]
    }else{
        noteObject[username].push(newNote)
        // console.log("User exixts")
    }
    const newNoteToString = JSON.stringify(noteObject)
    await fs.writeFile("./notes.json", newNoteToString)
    res.status(200).json({msg:"Note added Successfully"})
   } catch (error) {
    res.status(500).json({msg: error.message})
   }
    // req.method
})


app.put('/notes', (req, res)=>{
    res.status(200).json({msg:"Note Edited Successfully"})
    // req.method
})

app.delete('/notes', (req, res)=>{
    res.status(200).json({msg:"Note deleted"})
    // req.method
})

const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})


