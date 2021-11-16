const logger = require('../../services/logger.service')
const stayService = require('.//stay.service')

async function getStays(req, res) {
    try {
        const filterBy = req.query
        const stays = await stayService.query(filterBy)
        res.send(stays)
    } catch (err) {
        logger.error('Failed to get stays', err)
        res.status(500).send({ err: 'Failed to get stays' })
    }
}

async function getStay(req, res) {
    try {
        const stay = await stayService.getById(req.params.id)
        res.send(stay)
    } catch (err) {
        logger.error('Failed to get stay', err)
        res.status(500).send({ err: 'Failed to get stay' })
    }
}

async function addStay(req, res) {
    try {
        const stay = req.body
        savedstay = await stayService.save(stay)
        res.send(savedstay)
    } catch (err) {
        console.log(err)
        logger.error('Failed to add stay', err)
        res.status(500).send({ err: 'Failed to add stay' })
    }
}

async function updateStay(req, res) {
    try {
        const stay = req.body
        savedstay = await stayService.save(stay)
        res.send(savedstay)
    } catch (err) {
        console.log(err)
        logger.error('Failed to update stay', err)
        res.status(500).send({ err: 'Failed to update stay' })
    }
}

async function deleteStay(req, res) {
    try {
        await stayService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete stay', err)
        res.status(500).send({ err: 'Failed to delete stay' })
    }
}

module.exports = {
    getStays,
    getStay,
    addStay,
    updateStay,
    deleteStay
}