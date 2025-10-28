require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/status',(req,res)=>res.json({status:'ok'}));
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'public','dashboard.html')));
const PORT = process.env.PORT||10000; app.listen(PORT,()=>console.log('listening',PORT));
