import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz4TaEQNg6P1ChyElkWAVLshPTODBjzY-sWKZiOAWb1xg-tjQNTKoB2-E33l50JOTNlxA/exec";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    if (
      !body ||
      body.action !== "syncAll"
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Request tidak valid.",
        },
        {
          status: 400,
        }
      );

    }

    const response =
      await fetch(
        GOOGLE_SCRIPT_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },

          body: JSON.stringify(body),

          cache: "no-store",

          redirect: "follow",
        }
      );

    if (!response.ok) {

      return NextResponse.json(
        {
          success: false,
          message:
            `Google Apps Script mengembalikan status ${response.status}.`,
        },
        {
          status: 502,
        }
      );

    }

    const text =
      await response.text();

    let result;

    try {

      result =
        JSON.parse(text);

    } catch {

      console.error(
        "Response Google Apps Script:",
        text
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Response dari Google Apps Script tidak valid.",
        },
        {
          status: 502,
        }
      );

    }

    if (!result.success) {

      return NextResponse.json(
        {
          success: false,
          message:
            result.message ||
            "Google Apps Script gagal memproses data.",
        },
        {
          status: 500,
        }
      );

    }

    return NextResponse.json(
      {
        success: true,

        message:
          result.message ||
          "Data berhasil disinkronkan.",

        count:
          result.count || 0,

      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.error(
      "SYNC ERROR:",
      error
    );


    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Gagal menghubungi Google Apps Script.",

      },
      {
        status: 500,
      }
    );

  }
}