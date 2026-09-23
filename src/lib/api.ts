import type { PartData } from "@/types/part";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyeAqqo4ae5GK9rtKmkBCwqTK2CMd1h5lMj4uh7a2pr3-DlT9eyQAvrNqp_8svX8e7RxQ/exec";

export async function syncAllToGoogleSheets(
  data: PartData[]
) {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },

    body: JSON.stringify({
      action: "syncAll",
      data,
    }),
  });

  if (!response.ok) {
    throw new Error(
      "Gagal menghubungi Google Sheets."
    );
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(
      result.message ||
        "Gagal menyimpan data ke Google Sheets."
    );
  }

  return result;
}