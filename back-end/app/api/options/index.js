const { Router } = require('express')

const { Options } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const {createOptions, UpdateOption} = require("./optionManager");
const {DeleteUserFromAccount} = require("../accounts/users/userManager");

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(Options.get())
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:userId', (req, res) => {
    try {
        res.status(200).json(Options.getOptionId(req.params.userId))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/:userId',(req, res) => {
    try {
        res.status(201).json(createOptions(req.params.userId, req.body))
    }catch (err){
        manageAllErrors(res,err)
    }
})

router.put('/:userId', (req, res) => {
    try {
        console.log('la requete est passé')
        res.status(200).json(UpdateOption(req.params.userId, req.body))
    } catch (err) {
        console.log('la requete n est pas passé')
        manageAllErrors(res, err)
    }
})
module.exports = router
