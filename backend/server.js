// Import modules
import express from 'express'; //create and manage your server
import cors from 'cors'; //let the browser allow the client to talk to the rest API
import movies from './api/movies.route.js'; //get access to movies routes
// create a server using express 
const  app = express();
// middlewares
app.use(cors(
  {
    origin: ["https://movie-reviews-frontend-beryl.vercel.app"],
    methods: [ "POST", "GET"], 
    credentials: true
  }
)); /* enable the communication between the browser and server */ 
app.use(express.json()); // get access to req.body
// api
app.use("/api/v1/movies", movies);
// 4O4
app.use('*', (req,res)=>{
res.status(404).json({error: "not found"})
});
//Export the server 
export default app;
