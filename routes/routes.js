import express from 'express';
export const router = express.Router()

import { celebrate, Segments } from 'celebrate'

import { sCreateVaultMember, sGetVaultMember, sQuery, sUpdateAge, sGetDecendants } from './../services/services.js'
import { vaultMemberSchema } from './../validation/schemas.js'


//base route for testing
router.get('/', (req,res) => {
    console.log("in route")
    res.status(200).json("Fallout Shelter");
})

//route to create a vault-dweller
router.post('/create',celebrate({
    [Segments.BODY]: vaultMemberSchema
    
}) ,async (req,res) => {
    console.log("here")
    const created = await sCreateVaultMember(req.body);
    res.status(200).json({created})
})

//route to search for one particular vault-dweller
router.get('/vaultdweller/:name', async (req,res) => {
    const member = await sGetVaultMember(req.params.name);
    res.status(200).json({member})
})

//route to query the database with this simple query langauge explained in sQuery
router.get('/query/:expres', async (req, res, next) => {
    let result;
    try{
        result = await sQuery(req.params.expres)
    }catch(err){
        console.log(err)
        return next (err)
    }
    res.status(200).json({result})

})

//route to let a certain amount of years pass, and age and kill off vault-dwellers as needed
router.get('/passtime/:years', async (req,res) => {
    const member = await sUpdateAge(req.params.years);
    res.status(200).json({member})
})

//returns a display of all the decendants of a specific vault-dweller
router.get('/decendants/:name', async (req,res) => {
    const member = await sGetDecendants(req.params.name);
    res.send(member)
})
