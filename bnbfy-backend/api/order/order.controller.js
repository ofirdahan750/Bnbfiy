const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const orderService = require('./order.service')

async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.query)
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function deleteOrder(req, res) {
    try {
        await orderService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete order', err)
        res.status(500).send({ err: 'Failed to delete order' })
    }
}


async function addOrder(req, res) {
    try {
        var order = req.body
        // order.buyer = req.session.user
        console.log('order: before service', order)
        order = await orderService.add(order)
        console.log('order:', order)

        // console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({type: 'order-added', data: order})
        // socketService.emitToAll({type: 'user-updated', data: order.byUser, room: req.session.user._id})
        res.send(order)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

module.exports = {
    getOrders,
    deleteOrder,
    addOrder
}