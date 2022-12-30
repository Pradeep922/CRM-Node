const admin = async(req, res, next) => {
    const admin_user = req.user.isAdmin;

    if(!admin_user){
        
        return res.status(401).send("Not an Admin user");
    }

    next();
}

export default admin;