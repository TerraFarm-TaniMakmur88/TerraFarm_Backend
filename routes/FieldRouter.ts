import express from "express";
import supabase from "../supabaseClient";

var fieldRouter = express.Router();

/* GET users listing. */
fieldRouter.get('/', async function(req, res, next) {
    let { data: Field, error } = await supabase
    .from('Field')
    .select('*');
    
    if (error) {
        return res.status(400).json({error: error.message});
    } 

    res.json(Field);
});

export default fieldRouter;
