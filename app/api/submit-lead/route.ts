import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const leadData = Object.fromEntries(formData);

    console.log("Received lead:", leadData);

    return new Response(
      JSON.stringify({ message: "Lead submitted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error processing lead submission" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
