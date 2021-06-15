
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = { keyword: '', type: '', ctg: '', sortBy: '' }) {
    const criteria = _buildCriteria(filterBy)
    const { sortBy } = filterBy
    let sort = {}
    if (sortBy === 'name') {
        sort.name = 1
    } else if (sortBy === 'price') {
        sort.price = 1
    }
    try {
        const db = dbService.getDB()
        const collection = await dbService.getCollection('stays')
        let stays = await collection.find().toArray()
        // const stays = await dbService.getCollection('stays').find(criteria).sort(sort).toArray()
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function save(stay) {
    const { inStock, type, price, name } = stay
    if (stay._id) {
        // db.customer.updateOne({ "_id": ObjectId("579c6ecab87b4b49be12664c") }, { $set: { balance: 20 } }
        //UPDATE
        try {
        
            const savedstay = {
                _id: ObjectId(stay._id),
                name,
                type,
                price,
                inStock,
                updatedAt: Date.now()
            }
            const collection = await dbService.getCollection('stays')
            await collection.updateOne({ _id: savedstay._id }, { $set: savedstay })
            return savedstay


        } catch (err) {
            logger.error('cannot update stay', err)
            throw err
        }
    } else {
        // CREATE
        try {
            savedstay = { ...stay }
            savedstay.createdAt = Date.now()
            const db = dbService.getDB()

            await db.collection('stays').insertOne(savedstay)
            return savedstay
        } catch (err) {
            logger.error('cannot add stay', err)
            throw err
        }
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stays')
        const stay = await collection.findOne({ '_id': ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const db = dbService.getDB()

        await db.collection('stays').deleteOne({ '_id': ObjectId(stayId) })
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    const specChars = /[-!$%^&*()\\_+|~=`{}\[\]:";'<>?,.\/]/
    if (filterBy.keyword && !specChars.test(filterBy.keyword)) {
        const criteriaTxt = { $regex: filterBy.keyword, $options: 'i' }
        criteria.$or = [
            {
                name: criteriaTxt
            },
            {
                type: criteriaTxt
            }
        ]

    }
    if (filterBy.type !== 'all' && filterBy.type) {
        criteria.type = { $regex: filterBy.type, $options: 'i' }
    }

    if (filterBy.ctg === 'inStock') {
        criteria.inStock = { $eq: true }
    }
    return criteria
}
module.exports = {
    query,
    save,
    getById,
    remove
}