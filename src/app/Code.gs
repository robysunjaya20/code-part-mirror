const SHEET_NAME = "data";

function getSheet() {

  const spreadsheet =
    SpreadsheetApp.getActiveSpreadsheet();

  return spreadsheet.getSheetByName(
    SHEET_NAME
  );

}

function doGet() {

  try {

    const sheet =
      getSheet();


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


    if (
      values.length <= 1
    ) {

      return jsonResponse({

        success: true,

        data: []

      });

    }


    const headers =
      values[0];


    const data =
      values
        .slice(1)
        .map(
          (row) => {

            const item = {};


            headers.forEach(
              (header, index) => {

                item[header] =
                  row[index];

              }
            );


            return item;

          }
        );


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

    if (
      action === "create"
    ) {

      const newId =
        Date.now();


      const no =
        sheet.getLastRow();


      sheet.appendRow([

        // A = No
        no,

        // B = Shift
        data.shift || "",

        // C = PIC
        data.pic || "",

        // D = Area
        data.workArea || "",

        // E = No Rakjis
        data.rackJis || "",

        // F = Stamp Date
        data.stampDate || "",

        // G = Model
        data.area || "",

        // H = Full Code
        data.fullCode || "",

        // I = Result
        data.result || "OK",

        // J = Detail Problem
        data.detailProblem || "",

        // K = Created At
        data.createdAt ||
          new Date(),

        // L = ID
        newId

      ]);


      return jsonResponse({

        success: true,

        message:
          "Data berhasil ditambahkan",

        id:
          newId

      });

    }

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

        // Kolom L = ID
        const rowId =
          String(
            values[i][11]
          );


        if (
          rowId ===
          String(data.id)
        ) {

          sheet
            .getRange(
              i + 1,
              2,
              1,
              10
            )
            .setValues([

              [

                // B
                data.shift || "",

                // C
                data.pic || "",

                // D
                data.workArea || "",

                // E
                data.rackJis || "",

                // F
                data.stampDate || "",

                // G
                data.area || "",

                // H
                data.fullCode || "",

                // I
                data.result || "OK",

                // J
                data.detailProblem || "",

                // K
                values[i][10]

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

        // Kolom L = ID
        const rowId =
          String(
            values[i][11]
          );


        if (
          rowId ===
          String(data.id)
        ) {

          sheet.deleteRow(
            i + 1
          );


          // Rapikan nomor
          renumberRows();


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

    if (
      action === "syncAll"
    ) {

      const values =
        data.data || [];


      const lastRow =
        sheet.getLastRow();

      if (
        lastRow > 1
      ) {

        sheet
          .getRange(
            2,
            1,
            lastRow - 1,
            12
          )
          .clearContent();

      }


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


      const rows =
        values.map(
          (item, index) => [

            index + 1,

            item.shift || "",

            item.pic || "",

            item.workArea || "",

            item.rackJis || "",

            item.stampDate || "",

            item.area || "",

            item.fullCode || "",

            item.result || "OK",

            item.detailProblem || "",

            item.createdAt || "",

            item.id || ""

          ]
        );


      /*
        Tulis 12 kolom ke Google Sheet
      */

      sheet
        .getRange(
          2,
          1,
          rows.length,
          12
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

function renumberRows() {

  const sheet =
    getSheet();


  const lastRow =
    sheet.getLastRow();


  if (
    lastRow <= 1
  ) {

    return;

  }


  const numbers = [];


  for (
    let i = 1;
    i < lastRow;
    i++
  ) {

    numbers.push([
      i
    ]);

  }


  sheet
    .getRange(
      2,
      1,
      numbers.length,
      1
    )
    .setValues(
      numbers
    );

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