const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getStays, addStay, updateStay, deleteStay, getStay } = require('./stay.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getStays)
router.get('/:id', log, getStay)
router.post('/', requireAuth, requireAdmin, log, addStay)
router.put('/:id', log, updateStay)
// router.put('/:id', requireAuth, requireAdmin, log, updateStay)
router.delete('/:id', requireAuth, requireAdmin, log, deleteStay)

module.exports = router