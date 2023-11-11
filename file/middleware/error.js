const errorhandler = ( err , req , res ,next )=>{
    const statuscode = res.statuscode=== 200 ? 500 : res.statuscode;
    res.status(statuscode);
    res.json({
      msg: err?.message,
      stack: process.env.NODE_ENV !== "production"? null : err?.stack,
    });
};

const notFound = ( req , res , next )=>{
    const error = new Error(`Not found- ${req?.orginalUrl}`);
    res.status(404);
    next(error);
};


module.exports = {errorhandler , notFound};
