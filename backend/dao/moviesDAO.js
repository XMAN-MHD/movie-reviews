// imports 
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
// hold the reference of the movies collection
let movies;
// get access to the movies collection
export default class MoviesDAO
{   
    static async injectDB(conn) // injectDB is called as soon as the server starts
    {
        if(movies)
        {
            return;
        }
        try
        {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)
            .collection('movies');
        }
        catch(e){
            console.error(`unable to connect in MoviesDAO: ${e}`);
        }
    }
    static async getMovies({filters=null, page=0, moviesPerPage=20}={})
    {
        let query; 
        // set up the filters of the request
        if(filters)
        {
            if(filters.hasOwnProperty('title')) 
            {
                query = {$text: {$search: filters['title']}};
            } 
            else if(filters.hasOwnProperty('rated')) 
            {
                query = {"rated": {$eq: filters['rated']}};
            }
        }
        let cursor; 
        try{
            // retreive the movies and implement a pagination in the same time
            cursor = await movies.find(query).limit(moviesPerPage).skip(moviesPerPage*page);
            // create a list to hold the movies retrieved
            let moviesList = await cursor.toArray();
            // get the number of the movies retrieved
            let totalNumMovies = await movies.countDocuments(query);
            // send the number of movies its list
            return {totalNumMovies, moviesList};
        } 
        catch(e){
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0};
        }
    
    }
    static async getRatings()
    {
        let ratings = []
        try{
            ratings = await movies.distinct("rated")
            return ratings
        }
        catch(e){
            console.error(`unable to get ratings, $(e)`)
            return ratings
        }
    }
    static async getMovieById(id)
    {
        try
        {
            return await movies.aggregate([
                {
                    $match: {
                       _id: new ObjectId(id)
                    }
                } ,
                { 
                    $lookup:
                    {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'movie_id',
                        as: 'reviews',
                    }
                }
            ]).next()
        }
        catch(e){
            console.error(`something went wrong in getMovieById: ${e}`)
            throw e
        }
    }   
}
    
