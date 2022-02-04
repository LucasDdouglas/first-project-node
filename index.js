
const { request } = require("express")
const express = require("express")
const uuid = require("uuid")

const app = express()
const port = 3000
app.use(express.json())


const users = []


const checkUserId = (request, response, next) => {

    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User Not Found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {

    return response.json(users)
})


app.post('/users', (request, response) => {
    const { model, brand, age } = request.body

    const user = { id: uuid.v4(), model, brand, age }

    users.push(user)

    return response.status(201).json(user)
})


app.put('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
    const id = request.userId
    const { model, brand, age } = request.body

    const updateUser = { id, model, brand, age }

    users[index] = updateUser

    return response.json(updateUser)
})


app.delete('/users/:id', checkUserId, (request, response) => {

    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})


app.listen(port, () => {
    console.log(`Sever started on port ${port}`)
})
