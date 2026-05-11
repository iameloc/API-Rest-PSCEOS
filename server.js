const express = require("express")
const app = express()
const fs = require("fs")
let data = JSON.parse(fs.readFileSync("./data.json"))
const PORT = 6753

app.use(express.json())

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`)
    next()
})

app.get("/", (req,res) => {
    res.send("Servidor Funcionando!")
})

app.get("/api/users", (req, res) => {
    res.json(data)
})

app.listen(PORT, () => {
	console.log(`Iniciando servidor em http://localhost:${PORT}`)
	}
)

//rota get
app.get("/api/users/:id", (req,res) => {
    let id = req.params.id
    id = parseInt(id)

    let usuarioencontrado = null

    for(let i = 0; i<data.usuarios.length; i++) {
        if(data.usuarios[i].id == id) {
            usuarioencontrado = data.usuarios[i]
            break
        }
    }

    if(!usuarioencontrado){
        return res.status(404).send("User não encontrado")
    }

    return res.json(usuarioencontrado)
})

//rota post
app.post("/api/users", (req,res) => {
    let novoId = null

    let ultimousuario = data.usuarios[data.usuarios.length -1]
    
    if(ultimousuario){
        novoId = ultimousuario.id + 1
    }
    else{
        novoId = 1
    }

    let novousuario = {
        id: novoId,
        nickname: req.body.nickname,
        role: req.body.role,
        champion: req.body.champion,
        team: req.body.team,
    }

    data.usuarios.push(novousuario)

    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2))
    return res.status(201).json(novousuario)
})

//rota put
app.put("/api/users/:id", (req,res) => {
    let id = req.params.id
    id = parseInt(id)
    
    let pos = null

    for(let i = 0; i<data.usuarios.length; i++){
        if(data.usuarios[i].id == id){
            pos = i
            break
        }
    }

    if(pos!=null){
        let editausuario = {
            id: novoId,
            nickname: req.body.nickname,
            role: req.body.role,
            champion: req.body.champion,
            team: req.body.team,
        }
        data.usuarios[pos] = usuarioatualizado
        return res.json(editausuario)
    }
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2))
    return res.status(404).send("Usuário não encontrado")
})

//rota delete
app.delete("/api/users/:id", (req,res) => {
    let id = req.params.id
    id = parseInt(id)
    let pos = null

    for(let i = 0; i<data.usuarios.length; i++){
        if(data.usuarios[i].id == id){
            pos = i
            break
        }
    }
    
    if(pos != null){
        let usuarioremovido = data.usuarios[pos]
        data.usuarios.splice(pos,1)

        return res.json(usuarioremovido)
    }
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2))
    return res.status(404).send("Usuário não encontrado")
})

