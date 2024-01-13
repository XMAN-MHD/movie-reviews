// import modules
import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'
// main function 
async function main()
{
    // get access to the enviromental variables
    dotenv.config();
    // set up the connection parameters
    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    // set up a port
    const port = process.env.PORT || 8000
    try 
    {
        // Connect to the MongoDB
        await client.connect();
        // get access to movies collection
        await MoviesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        // start the server
        app.listen(port, () =>{
            console.log('server is running on port:'+port);
        })
    }
    catch(e)
    {
        console.error(e);
        process.exit(1);
    }
}
// execute the main function
main().catch(console.error);