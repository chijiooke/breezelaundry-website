import fetch from "node-fetch";
import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";
import type { PartnerPayload } from "@/types/partner";

const notion = new Client({ auth: process.env.NOTION_TOKEN, fetch });

export async function POST(req: NextRequest) {
  console.log("TOKEN:", process.env.NOTION_TOKEN?.slice(0, 12));
  console.log("DB_ID:", process.env.NOTION_DATABASE_ID);
  try {
    const {
      ownerName,
      shopName,
      city,
      address,
      staffCount,
      equipment,
      whatsapp,
    }: PartnerPayload = await req.json();

    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID as string },
      properties: {
        "Shop Name": { title: [{ text: { content: shopName } }] },
        "Owner Name": { rich_text: [{ text: { content: ownerName } }] },
        City: { select: { name: city } },
        Address: { rich_text: [{ text: { content: address } }] },
        "Staff Count": { number: staffCount },
        Equipment: {
          multi_select: (equipment ?? []).map((e) => ({ name: e })),
        },
        WhatsApp: { phone_number: `+234${whatsapp}` },
        "Submitted At": { date: { start: new Date().toISOString() } },
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("[Notion]", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
