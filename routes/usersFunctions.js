import { client } from "../index.js";


export async function createUser(data) {
    return await client.db("GID_project").collection("signupData").insertOne(data);
}

export async function updateUser(_id,data) {
    return await client.db("GID_project").collection("signupData").updateOne({ _id: _id }, { $set: data });
}
export async function updateUserPassword(_id,data) {
    return await client.db("GID_project").collection("signupData").updateOne({ _id: _id }, { $set: data });
}
export async function updateUserPhoneNumber(_id,data) {
    return await client.db("GID_project").collection("signupData").updateOne({ _id: _id }, { $set: data });
}
export async function getUserByName(userName) {
    return await client.db("GID_project").collection("signupData").findOne({ _id:userName });
}

export async function addAddress(req) {
    return await client.db("GID_project").collection("address").insertOne(req);
}

export async function updateAddressById(_id, data) {
    return await client.db("GID_project").collection("address").updateOne({ _id: _id }, { $set: data });
}

export async function deleteAddressById(_id) {
    return await client.db("GID_project").collection("address").deleteOne({ _id: _id });
}

export async function getAddressById(_id) {
    return await client.db("GID_project").collection("address").findOne({ _id:_id});
}
export async function createOrder(req) {
    return await client.db("GID_project").collection("orders").insertOne(req);
}
export async function deleteOrderById(_id) {
    return await client.db("GID_project").collection("orders").deleteOne({ _id:_id});
}

export async function getAllOrdersItemsByUserName(userName) {
    return await client.db("GID_project").collection("orders").find({userName:userName} ).toArray();
}

export async function getOrderById(_id) {
    return await client.db("GID_project").collection("orders").findOne({ _id:_id });
}