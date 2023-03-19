// Description: This file contains all the functions related to address
// ! just receive the lat, long and convert it to address using google maps api

const { errorResponse } = require("../helpers/basicFunctions");

const verifyAddress = (address) => {
    let message = "OK";
    const {
        addressName,
        flat,
        street,
        area,
        city,
        state,
        pincode,
        landmark,
        lat,
        long,
    } = address;

    if (!addressName) message = "Address Name is required";
    else if (!flat) message = "Flat is required";
    else if (!street) message = "Street is required";
    else if (!area) message = "Area is required";
    else if (!city) message = "City is required";
    else if (!state) message = "State is required";
    else if (!pincode) message = "Pincode is required";
    else if (!landmark) message = "Landmark is required";
    else if (!lat) message = "Latitude is required";
    else if (!long) message = "Longitude is required";

    return message;
};

// adding address in vendor's address array and user's address array
const addAddress = (address, modelObject, phoneNumber=null) => {
    const verificationMsg = verifyAddress(address);
    if (verificationMsg !== "OK") errorResponse(STATUS.BAD_REQUEST, verificationMsg);
    const { addressName, flat, street, area, city, state, pincode, landmark, phone, lat, long } = address;

    const completeAddress = `${flat}, ${street}, ${area}, ${city}, ${state}, ${pincode}, ${landmark}`;

    const newAddress = {
        addressName : addressName,
        flat : flat,
        street : street,
        area : area,
        city : city,
        state : state,
        pincode : pincode,
        landmark : landmark,
        phone : phone || phoneNumber,
        completeAddress : completeAddress,
        lat : lat,
        long : long,
        location : {
            type: "Point",
            coordinates: [long, lat]
        }
    };
    if (!modelObject.savedAddresses) modelObject.savedAddresses = [];
    modelObject.savedAddresses.push(newAddress);
    return modelObject;
}

module.exports = {addAddress}
