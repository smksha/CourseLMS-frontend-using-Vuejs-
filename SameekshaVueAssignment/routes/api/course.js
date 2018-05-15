const Course=require('../../connection').Course
const Batch=require('../../connection').Batch
const Lecture=require('../../connection').Lecture

const route=require('express').Router()

route.get('/:id?',(req,res)=>{
    var id=req.params.id;
    console.log("in get 1"+id)
    if(id){
        Course.findOne({        
            where:{
                id:req.params.id
            }
        })
        .then((courses)=>{
            res.json(courses)
            //res.status(200).send(courses)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive courses"
            })
        })
    }
    else{
        Course.findAll()
        .then((courses)=>{
            res.json(courses)
           // res.status(200).send(courses)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive courses"
            })
        })
    }
})

route.use('/:id/batches/:id2?',(req,res)=>{
    var id=req.params.id2;
    console.log("in get 2"+id)
    if(id){
        Batch.findAll({        
            
            where:{
                CourseId:req.params.id,
                id:req.params.id2
            },
            include:Course
        })
        .then((batches)=>{
            res.json(batches)
            //res.status(200).send(courses)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive batches"
            })
        })
    }
    else{
        Batch.findAll()
        .then((batches)=>{
            res.json(batches)
           // res.status(200).send(batches)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive batches"
            })
        })
    }
})

route.use('/:id/batches/:id2/lectures',(req,res)=>{
    var id=req.params.id3;
    //console.log("in get 3")
    if(id){

        // Lecture.findAll({   
        //     include:Batch,  
        //     where:{  
        //         BatchId:            
        //     }
        // })
        // .then((batches)=>{
        //     res.json(batches)
        //     //res.status(200).send(courses)
        // })
        // .catch((error)=>{
        //     res.status(500).send({
        //         error: "Could not retrive batches"
        //     })
        // })
        Lecture.findAll({
            include: [{
            model: Batch,
            where: {
            CourseId:req.params.id,
            BatchId:req.params.id2,
            }
            }]
            })
            .then((lecture) => {
            res.status(200).send(lecture)
            })
            .catch( (err) => {
            res.status(500).send({
            error: "Could not retrive Batches corresponding to courses"
            })
            })
    }
    else{
        Lecture.findAll()
        .then((lecture)=>{
            res.json(lectures)
           // res.status(200).send(batches)
        })
        .catch((error)=>{
            res.status(500).send({
                error: "Could not retrive batches"
            })
        })
    }
})

route.post('/',(req,res)=>{
    Course.create({
        name: req.body.name
    }).then((course)=>{
        res.status(201).send(course)
    }).catch((err)=>{
        res.status(501).send({
            error: "could not add new course"+err
        })
    })
})

exports=module.exports=route
