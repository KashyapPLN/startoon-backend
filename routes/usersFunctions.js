import { client } from "../index.js";


export async function createUser(data) {
    return await client.db("GID_project").collection("signupData").insertOne(data);
}

export async function getUserByName(userName) {
    return await client.db("GID_project").collection("signupData").findOne({ userName:userName });
}