// First is notFound middleware which takes  req, res, next as parameters and handles 404 errors when a requested resource is not found.

const notFound=(req,res,next)=>{
    const error=new Error(`Not Found - ${req.originalUrl}`);  //Creating a new error object with message containing the requested URL
    res.status(404);                                           //Setting the response status to 404 (Not Found)
    next(error);                                               //Passing the error to the next middleware
};

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode===200 ? 500 : res.statusCode; //If status code is 200, change it to 500 (Internal Server Error)
    res.status(statusCode);                                  //Setting the response status to the determined status code
    res.json({
        message:err.message,                                //Sending the error message in the response
        stack:process.env.NODE_ENV==='production' ? null : err.stack, //If in production, don't send stack trace for security reasons
    });
}

module.exports={notFound,errorHandler};