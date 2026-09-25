import type { PartData } from "@/types/part";

const API_URL =
  "https://script.google.com/macros/s/AKfycbz0AZskuUnwHEBRBIO9EVRjT1uekHIbOuw31XKCBTGy9i6bVsGGFT-r8Tn7li_J6oZxhQ/exec";

export async function saveBatchToGoogleSheets(
  data: PartData[],
  workDate: string
) {
  try {
    console.log("=== SAVE BATCH TO GOOGLE SHEETS ===");
    console.log("API URL:", API_URL);
    console.log("Jumlah data lokal:", data.length);
    console.log("Tanggal kerja:", workDate);
    console.log("Data pertama:", data[0]);

    if (data.length === 0) {
      throw new Error(
        "Tidak ada data lokal yang bisa disimpan."
      );
    }

    if (!workDate) {
      throw new Error(
        "Tanggal kerja belum dipilih."
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(workDate)) {
      throw new Error(
        "Format tanggal kerja tidak valid."
      );
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "saveBatch",
        data,
        workDate,
      }),
    });

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
      result = JSON.parse(responseText);
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
      "Google Sheets Save Batch Error:",
      error
    );

    throw error;
  }
}