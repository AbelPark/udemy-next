import { insertDocument, connectDatabase } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    // 서버측 validation도 필요하다. client측은 조작의 위험성이 있다.
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (e) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }
    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (e) {
      res.status(500).json({ message: "Inserting data fail!" });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
