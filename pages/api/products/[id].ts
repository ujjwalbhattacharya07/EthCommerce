import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("gumroad");
    console.log(req.query);
    const query = { _id: new ObjectId(Array.isArray(req.query.id)?req.query.id[0]:req.query.id) };

    const product = await db.collection("products").findOne(query);
    res.json({ status: 200, data: product! });

}
