import type { PartData } from "@/types/part";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyjZ98FsaP6KFZZTHEiB3Uwz3n-GD4cIhrD6XuFI294yAm8XgYFyCQ7_ww0SgBh4R_MOQ/exec";

export async function syncAllToGoogleSheets(
  data: PartData[]
) {
  try {

    console.log(
      "=== GOOGLE SHEETS SYNC ==="
    );

    console.log(
      "API URL:",
      API_URL
    );

    console.log(
      "Jumlah data:",
      data.length
    );

    console.log(
      "Data pertama:",
      data[0]
    );


    const response = await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8",
        },

        body: JSON.stringify({
          action: "syncAll",
          data,
        }),
      }
    );


    console.log(
      "HTTP Status:",
      response.status
    );

    console.log(
      "HTTP Status Text:",
      response.statusText
    );

    const responseText =
      await response.text();


    console.log(
      "Response Google:",
      responseText
    );


    if (!response.ok) {

      throw new Error(
        `Google Sheets HTTP ${response.status}: ${response.statusText}`
      );

    }


    let result;

    try {

      result =
        JSON.parse(
          responseText
        );

    } catch {

      throw new Error(
        "Response Google Sheets bukan JSON. Cek deployment Apps Script."
      );

    }


    console.log(
      "Parsed result:",
      result
    );


    if (!result.success) {

      throw new Error(
        result.message ||
          "Gagal menyimpan data ke Google Sheets."
      );

    }


    return result;


  } catch (error) {

    console.error(
      "Google Sheets Sync Error:",
      error
    );

    throw error;

  }
}