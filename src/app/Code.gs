const SHEET_NAME = "data";

function getSheet() {
  const spreadsheet =
    SpreadsheetApp.getActiveSpreadsheet();

  return spreadsheet.getSheetByName(
    SHEET_NAME
  );
}


// ========================================
// GET DATA
// ========================================

function doGet() {

  try {

    const sheet = getSheet();

    if (!sheet) {

      return jsonResponse({
        success: false,
        message:
          "Sheet data tidak ditemukan"
      });

    }

    const values =
      sheet
        .getDataRange()
        .getValues();

    if (values.length <= 1) {

      return jsonResponse({
        success: true,
        data: []
      });

    }

    const headers = values[0];

    const data =
      values
        .slice(1)
        .map((row) => {

          const item = {};

          headers.forEach(
            (header, index) => {

              item[header] =
                row[index];

            }
          );

          return item;

        });


    return jsonResponse({

      success: true,

      data

    });


  } catch (error) {

    return jsonResponse({

      success: false,

      message:
        error.message

    });

  }

}


// ========================================
// POST
// ========================================

function doPost(e) {

  try {

    const data =
      JSON.parse(
        e.postData.contents
      );


    const sheet =
      getSheet();


    if (!sheet) {

      return jsonResponse({

        success: false,

        message:
          "Sheet data tidak ditemukan"

      });

    }


    const action =
      data.action;


    // ====================================
    // CREATE
    // ====================================

    if (
      action === "create"
    ) {

      const newId =
        Date.now();


      sheet.appendRow([

        newId,

        data.area,

        data.prefix,

        data.partCode,

        data.fullCode,

        data.result || "OK",

        data.stampDate || "",

        data.detailProblem || "",

        data.createdAt ||
          new Date()

      ]);


      return jsonResponse({

        success: true,

        message:
          "Data berhasil ditambahkan",

        id:
          newId

      });

    }


    // ====================================
    // UPDATE
    // ====================================

    if (
      action === "update"
    ) {

      const values =
        sheet
          .getDataRange()
          .getValues();


      for (
        let i = 1;
        i < values.length;
        i++
      ) {

        const rowId =
          String(
            values[i][0]
          );


        if (
          rowId ===
          String(data.id)
        ) {

          /*
            Struktur kolom:

            A = ID
            B = Model
            C = Prefix
            D = Kode Part
            E = Full Code
            F = Result
            G = Stamp Date
            H = Detail Problem
            I = Created At
          */


          sheet
            .getRange(
              i + 1,
              2,
              1,
              8
            )
            .setValues([

              [

                data.area,

                data.prefix,

                data.partCode,

                data.fullCode,

                data.result || "OK",

                data.stampDate || "",

                data.detailProblem || "",

                values[i][8]

              ]

            ]);


          return jsonResponse({

            success: true,

            message:
              "Data berhasil diperbarui"

          });

        }

      }


      return jsonResponse({

        success: false,

        message:
          "Data tidak ditemukan"

      });

    }


    // ====================================
    // DELETE
    // ====================================

    if (
      action === "delete"
    ) {

      const values =
        sheet
          .getDataRange()
          .getValues();


      for (
        let i = 1;
        i < values.length;
        i++
      ) {

        const rowId =
          String(
            values[i][0]
          );


        if (
          rowId ===
          String(data.id)
        ) {

          sheet.deleteRow(
            i + 1
          );


          return jsonResponse({

            success: true,

            message:
              "Data berhasil dihapus"

          });

        }

      }


      return jsonResponse({

        success: false,

        message:
          "Data tidak ditemukan"

      });

    }


    // ====================================
    // SYNC ALL
    // ====================================

    if (
      action === "syncAll"
    ) {

      const values =
        data.data || [];


      const lastRow =
        sheet.getLastRow();


      /*
        Struktur:

        A = ID
        B = Model
        C = Prefix
        D = Kode Part
        E = Full Code
        F = Result
        G = Stamp Date
        H = Detail Problem
        I = Created At

        Total = 9 kolom
      */


      // -------------------------------
      // Hapus data lama
      // -------------------------------

      if (
        lastRow > 1
      ) {

        sheet
          .getRange(
            2,
            1,
            lastRow - 1,
            9
          )
          .clearContent();

      }


      // -------------------------------
      // Jika tidak ada data
      // -------------------------------

      if (
        values.length === 0
      ) {

        return jsonResponse({

          success: true,

          message:
            "Tidak ada data lokal.",

          count: 0

        });

      }


      // -------------------------------
      // Buat rows
      // -------------------------------

      const rows =
        values.map(
          (item) => [

            item.id,

            item.area,

            item.prefix,

            item.partCode,

            item.fullCode,

            item.result || "OK",

            item.stampDate || "",

            item.detailProblem || "",

            item.createdAt

          ]
        );


      // -------------------------------
      // Tulis ke Google Sheet
      // -------------------------------

      sheet
        .getRange(
          2,
          1,
          rows.length,
          9
        )
        .setValues(
          rows
        );


      return jsonResponse({

        success: true,

        message:
          "Semua data berhasil disinkronkan.",

        count:
          rows.length

      });

    }

    return jsonResponse({

      success: false,

      message:
        "Action tidak dikenal"

    });


  } catch (error) {

    return jsonResponse({

      success: false,

      message:
        error.message

    });

  }

}

function jsonResponse(data) {

  return ContentService

    .createTextOutput(
      JSON.stringify(data)
    )

    .setMimeType(
      ContentService.MimeType.JSON
    );

}