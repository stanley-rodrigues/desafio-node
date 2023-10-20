
const express = require('express')
const uuid = require('uuid')

const app = express()
app.use(express.json())

const port = 3001

const orders = []

const showMethodAndURL = (req,res,next) => {
    const method = req.method
    const url = req.url
     console.log(`Esse é o método: ${method} seguido dessa URL: ${url}`)
    next()

}

const checkOrderId = (req, res, next) => {
    const {
        id
    } = req.params
    const index = orders.findIndex(order => order.id === id)

    if (index < 0) {
        return res.status(404).json({
            message: "order not found"
        })
    }

    req.orderIndex = index
    req.orderId = id

    next()
}


app.get('/order', showMethodAndURL,(req, res) => { // get rota criada

    console.log('orders')

    return res.json(orders)
})

app.get('/order/:id', checkOrderId, showMethodAndURL,(req, res) => {
    const index = req.orderIndex

    return res.json(orders[index])

})


app.post('/order', showMethodAndURL,(req, res) => { // post rota criada

    const {orderClient,nameClient,priceOrder, } = req.body
    const order = {
        id: uuid.v4(),
        orderClient,
        nameClient,
        priceOrder,
        statusOrder : "Pedido Realizado"
    }

    orders.push(order)

    return res.status(201).json(order)
})

app.put('/order/:id', checkOrderId, showMethodAndURL,(req, res) => { // post rota criada

    const index = req.orderIndex
    const id = req.orderId

    const {orderClient, nameClient, priceOrder} = req.body

    const updadtedOrder = {
        id,
        orderClient,
        nameClient,
        priceOrder,
        statusOrder: "Pedido em preparação"
    }

    orders[index] = updadtedOrder

    return res.json(updadtedOrder)
})


app.patch('/order/:id', checkOrderId, showMethodAndURL, (req, res) => {

    const index = req.orderIndex
    const { id } = req.params
    const {orderClient,nameClient,priceOrder,} = req.body

    const StatusPedido = {
        id,
        orderClient,
        nameClient,
        priceOrder,
        statusOrder: "pedido pronto"
    }


    orders[index] = StatusPedido

    console.log(StatusPedido)
    return res.json(StatusPedido)
})



app.listen(port, () => {
    console.log(`amigo eu estou aqui 😍 ${port}`)
}) 

