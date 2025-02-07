const GOOGLE_DRIVE_API_ENDPOINT = "https://www.googleapis.com/drive/v3";

export async function uploadToDrive(
  file: Blob,
  fileName: string,
  clientId: string,
  accessToken: string
) {
  try {
    // 1. Vérifier/Créer le dossier client
    const folderResponse = await fetch(
      `${GOOGLE_DRIVE_API_ENDPOINT}/files?q=name='${clientId}' and mimeType='application/vnd.google-apps.folder'`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const folderData = await folderResponse.json();
    let clientFolderId;

    if (folderData.files.length === 0) {
      // Créer le dossier
      const createFolderResponse = await fetch(
        `${GOOGLE_DRIVE_API_ENDPOINT}/files`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: clientId,
            mimeType: "application/vnd.google-apps.folder",
          }),
        }
      );
      const newFolder = await createFolderResponse.json();
      clientFolderId = newFolder.id;
    } else {
      clientFolderId = folderData.files[0].id;
    }

    // 2. Upload du fichier
    const metadata = {
      name: fileName,
      parents: [clientFolderId],
    };

    const uploadResponse = await fetch(
      `${GOOGLE_DRIVE_API_ENDPOINT}/files?uploadType=multipart`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/related; boundary=boundary",
        },
        body: createMultipartBody(metadata, file),
      }
    );

    const uploadedFile = await uploadResponse.json();

    // 3. Définir les permissions de partage
    await fetch(
      `${GOOGLE_DRIVE_API_ENDPOINT}/files/${uploadedFile.id}/permissions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "reader",
          type: "anyone",
        }),
      }
    );

    return {
      success: true,
      fileId: uploadedFile.id,
      webViewLink: uploadedFile.webViewLink,
    };
  } catch (error) {
    console.error("Erreur lors de l'upload:", error);
    throw error;
  }
}

function createMultipartBody(metadata: any, file: Blob): string {
  const boundary = "boundary";
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadataPart = `Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(
    metadata
  )}`;

  const filePart = `Content-Type: ${file.type}\r\n\r\n${file}`;

  return delimiter + metadataPart + delimiter + filePart + closeDelimiter;
}
