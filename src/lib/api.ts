import type { PartData } from "@/types/part";

const API_URL =
  "https://script.google.com/macros/s/AKfycby1njEQJwRZfxOrTLP7_iCJvd-Ql7BkWZU8gjTNSbSHpfJwMSn5tAzT8zNVWcUbN7rWnw/exec";

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