import { WithId, Document } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("gumroad");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      await db.collection("products").insertOne(bodyObject);
      res.json({
        status: 200,
        data: []
      });
      break;
    case "GET":
      const products = await db.collection("products").find({}).sort({ createdAt: -1 }).toArray();
      res.json({ status: 200, data: products });
      break;
  }
}
