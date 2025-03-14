import { NextRequest, NextResponse } from "next/server";

const leads: { [key: string]: unknown }[] = []; // A simple in-memory store for leads

// POST handler to submit leads
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const leadData = Object.fromEntries(formData);
    leadData.status = "PENDING"; // Default status

    // Push the new lead to the leads array
    leads.push(leadData);

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

// GET handler to retrieve leads
export async function GET() {
  try {
    // Return the stored leads
    return new NextResponse(JSON.stringify(leads), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Error retrieving leads" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
