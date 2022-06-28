const express=require("express")
const port=process.env.PORT||8000

const mongoose=require("mongoose")
const userModel=require("./models/User")
mongoose.connect("mongodb://localhost:27017").then(data=>{
    
  console.log("database connected")


}).catch(err=>{
    console.log(err)
})


const app=express()

 app.use(express.json())

  app.post("/saveuser",(req,res)=>{
  
    const user=new userModel({
     
        name:req.body.name,
        age:req.body.age,
        isValid:true

    })

     user.save().then(data=>{

         res.send("inserted")
      
     }).catch(err=>{

        res.send(err)


     })
   

  })

  app.get("/getdata",(req,res)=>{
        
         userModel.find().then(data=>{

            res.json({
                message:"success",
                data:data
            })
         }).catch(err=>{
            res.json({
                message:err
            })
         })
       


  })

  app.get("/getone/:id",(req,res)=>{

      
    userModel.findOne({
        id:req.params.id}).then(data=>{

            res.json({
                message:"success",
                data:data
            })
         }).catch(err=>{
            res.json({
                message:err
            })
         })

  })


  app.put("/edit/:id",(req,res)=>{

       userModel.updateOne({id:req.params.id},{$set:{name:req.body.name}}).then(data=>{
        
        res.json({
            message:"updated",
            data:data
        })


       }).catch(err=>{
          console.log(err)
       })

  })


  app.delete("/delete/:id",(req,res)=>{

        userModel.deleteOne({id:req.params.id}).then(data=>{

            res.json({
                message:"deleted",
                data:data
            })
        }).catch(err=>{
            console.log(err)
        })

  })

app.listen(port,()=>{

    console.log("server running at port"+port)
})