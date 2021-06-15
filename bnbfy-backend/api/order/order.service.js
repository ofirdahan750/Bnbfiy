const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('orders')
        const orders = await collection.find().toArray()
        // var orders = await collection.aggregate([
        //     {
        //         $match: filterBy
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'byUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     },
        //     {
        //         $unwind: '$byUser'
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'aboutUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'aboutUser'
        //         }
        //     },
        //     {
        //         $unwind: '$aboutUser'
        //     }
        // ]).toArray()
        // orders = orders.map(order => {
        //     order.byUser = { _id: order.byUser._id, fullname: order.byUser.fullname }
        //     order.aboutUser = { _id: order.aboutUser._id, fullname: order.aboutUser.fullname }
        //     delete order.byUserId
        //     delete order.aboutUserId
        //     return order
        // })

        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }

}

async function remove(orderId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('order')
        // remove only if user is owner/admin
        const query = { _id: ObjectId(orderId) }
        if (!isAdmin) query.byUserId = ObjectId(userId)
        await collection.deleteOne(query)
        // return await collection.deleteOne({ _id: ObjectId(orderId), byUserId: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}


async function add(order) {
    try {
        const orderToAdd = {
            // _id: ObjectId(),
            createdAt: Date.now(),
            buyer: order.buyer, //need to delete
            totalPrice: order.totalPrice,
            startDate: order.startDate,
            endDate: order.endDate,
            guests: order.guests,
            stay: order.stay,
            hostId: order.hostId,
            status: order.status
        }
        const collection = await dbService.getCollection('orders')
        await collection.insertOne(orderToAdd)
        return orderToAdd;
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    remove,
    add
}


