const express=require('express');
const router=express.Router();
const fetchUser=require('../middleware/fetchUser');
const Notes=require('../models/Notes');
const mongoose=require('mongoose');
const {body,validationResult}=require('express-validator');

//to get all the notes
router.get('/fetchallnotes',fetchUser,async (req,res)=>{
    try {
        let notes= await Notes.find({user:req.user.id});
        return res.send(notes);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Error Occured!");
    }
});

//to create a note
router.post('/createnote',fetchUser,[
    body('title',"Minimum 3 Characters").isLength({min:3}),
    body('description',"Minimum 5 Characters").isLength({min:5}),
    body('tag',"Required!").exists()
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const {title,description,tag}=req.body;
        const note =new Notes({
            title:title,
            description:description,
            tag:tag,
            user:req.user.id
        });
        if(note.save()){
           console.log("New note added!");
           return res.json(note); 
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Error Occured!");
    }
});

//to edit a note
router.put('/editnote/:id',fetchUser,async (req,res)=>{
    try {
        let newnote={};
        if(req.body.title){newnote.title=req.body.title};
        if(req.body.description){newnote.description=req.body.description};
        if(req.body.tag){newnote.tag=req.body.tag};

        const notes=await Notes.findById(mongoose.Types.ObjectId(req.params.id));
        if(!notes){
           return res.status(404).json("Not found!");
        }

        if(notes.user.toString()!=req.user.id){
            return res.status(401).json("Not allowed!");
        }

        const editedNote=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
        if(editedNote){
            console.log("Note successfully updated!");
            return res.send(editedNote);
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Error Occured!");
    }
});


//to delete a node
router.delete('/deletenote/:id',fetchUser,async (req,res)=>{
    try {
        const notes=await Notes.findById(mongoose.Types.ObjectId(req.params.id));
        if(!notes){
            return res.status(404).json("Not found!");
        }

        if(notes.user.toString()!=req.user.id){
            return res.status(401).json("Not allowed!");
        }

        const deletedNote=await Notes.findByIdAndDelete(req.params.id);
        if(deletedNote){
            console.log("Note successfully deleted!");
            return res.send("Successfully Deleted!");
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Error Occured!");
    }
});

module.exports=router;