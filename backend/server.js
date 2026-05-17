const express=require('express')
const app=express()
app.use(express.json())
app.get('/',(req,res) =>{
res.send('Server running')
})
app.get('/about', (req, res) => {
  res.send('About Route')
})
app.post('/issue',(req,res)=>{
    console.log(req.body)
    res.send("Issue created")
})
app.listen(5000,()=>{
    console.log("Server running on 5000")
})