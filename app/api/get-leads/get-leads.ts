import { NextApiRequest, NextApiResponse } from "next";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  visas: string[];
  resume: string | null;
  additionalInfo: string;
  status: "PENDING" | "REACHED_OUT";
}

const leads: Lead[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(leads); // Return the list of leads
  } else {
    res.status(405).end();
  }
}
