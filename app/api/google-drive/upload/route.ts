import { auth } from "@/lib/auth/helper";
import { uploadToDrive } from "@/lib/google-drive";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as Blob;
    const fileName = formData.get("name") as string;
    const clientId = formData.get("clientId") as string;

    if (!file || !fileName || !clientId) {
      return NextResponse.json(
        { error: "Fichier, nom ou ID client manquant" },
        { status: 400 }
      );
    }

    const result = await uploadToDrive(
      file,
      fileName,
      clientId,
      session.accessToken
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur lors de l'upload sur Google Drive:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload sur Google Drive" },
      { status: 500 }
    );
  }
}
