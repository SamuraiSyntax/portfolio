import { wpFetch } from "@/lib/wordpress";
import { NextResponse } from "next/server";
import { cache } from "react";

const getWPData = cache(
  async (endpoint: string, query: Record<string, string> = {}) => {
    return wpFetch({
      endpoint,
      query,
      embed: true,
    });
  }
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint manquant" }, { status: 400 });
    }

    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== "endpoint") {
        query[key] = value;
      }
    });

    const data = await getWPData(endpoint, query);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur API WordPress:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données" },
      { status: 500 }
    );
  }
}
