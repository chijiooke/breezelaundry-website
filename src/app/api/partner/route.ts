// src/app/api/partner/route.ts
import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

interface Payload {
  shopName:   string;
  city:       string;
  address:    string;
  staffCount: string | number;
  equipment:  string[];
  whatsapp:   string;
}

export async function POST(req: NextRequest) {
  try {
    const { shopName, city, address, staffCount, equipment, whatsapp }: Payload =
      await req.json();

    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID as string },
      properties: {
        "Shop Name":    { title:        [{ text: { content: shopName } }] },
        "City":         { select:       { name: city } },
        "Address":      { rich_text:    [{ text: { content: address } }] },
        "Staff Count":  { number:       Number(staffCount) },
        "Equipment":    { multi_select: (equipment ?? []).map(e => ({ name: e })) },
        "WhatsApp":     { phone_number: `+234${whatsapp}` },
        "Submitted At": { date:         { start: new Date().toISOString() } },
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("[Notion]", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}