// get vendors in given radius

// get the longitude and latitude of the user and search vendors witihin the radius of the 5km

const listVendors = async (req, res, next) => {
    console.log("listVendors");
    try {
        res.controller = "listVendors";
        // search vendors query
        return next();
    }
    catch (error) {
        throw error;
    }
}