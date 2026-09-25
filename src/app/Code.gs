const SHEET_NAME = "data";

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  return spreadsheet.getSheetByName(SHEET_NAME);
}

function doGet() {
  try {
    const sheet = getSheet();

    if (!sheet) {
      return jsonResponse({
        success: false,
        message: "Sheet data tidak ditemukan"
      });
    }

    const values = sheet.getDataRange().getValues();

    if (values.length <= 1) {
      return jsonResponse({
        success: true,
        data: []
      });
    }

    const headers = values[0];

    const data = values
      .slice(1)
      .map((row) => {
        const item = {};

        headers.forEach((header, index) => {
          item[header] = row[index];
        });

        return item;
      });

    return jsonResponse({
      success: true,
      data
    });

  } catch (error) {
    return jsonResponse({
      success: false,
      message: error.message
    });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = getSheet();

    if (!sheet) {
      return jsonResponse({
        success: false,
        message: "Sheet data tidak ditemukan"
      });
    }

    const action = data.action;

    /*
    =========================================================
    CREATE
    =========================================================
    */

    if (action === "create") {

      const newId = Date.now();

      const no = getNextNumber(sheet);

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
        data.createdAt || new Date(),

        // L = ID
        newId
      ]);

      return jsonResponse({
        success: true,
        message: "Data berhasil ditambahkan",
        id: newId
      });
    }

    /*
    =========================================================
    UPDATE
    =========================================================
    */

    if (action === "update") {

      const values = sheet.getDataRange().getValues();

      for (let i = 1; i < values.length; i++) {

        // Kolom L = ID
        const rowId = String(values[i][11]);

        if (rowId === String(data.id)) {

          sheet
            .getRange(i + 1, 2, 1, 10)
            .setValues([
              [
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
                values[i][10]
              ]
            ]);

          return jsonResponse({
            success: true,
            message: "Data berhasil diperbarui"
          });
        }
      }

      return jsonResponse({
        success: false,
        message: "Data tidak ditemukan"
      });
    }

    /*
    =========================================================
    DELETE
    =========================================================
    */

    if (action === "delete") {

      const values = sheet.getDataRange().getValues();

      for (let i = 1; i < values.length; i++) {

        // Kolom L = ID
        const rowId = String(values[i][11]);

        if (rowId === String(data.id)) {

          sheet.deleteRow(i + 1);

          renumberRows();

          return jsonResponse({
            success: true,
            message: "Data berhasil dihapus"
          });
        }
      }

      return jsonResponse({
        success: false,
        message: "Data tidak ditemukan"
      });
    }

    /*
    =========================================================
    SAVE BATCH
    =========================================================

    Data dari localStorage akan DITAMBAHKAN
    ke Google Sheets.

    Data lama TIDAK dihapus.
    */

    if (action === "saveBatch") {

      const values = data.data || [];

      if (!Array.isArray(values)) {
        return jsonResponse({
          success: false,
          message: "Format data tidak valid."
        });
      }

      if (values.length === 0) {
        return jsonResponse({
          success: true,
          message: "Tidak ada data lokal untuk disimpan.",
          count: 0
        });
      }

      /*
      ---------------------------------------------------------
      Cek ID yang sudah ada di Google Sheets
      ---------------------------------------------------------
      */

      const existingValues = sheet.getDataRange().getValues();

      const existingIds = new Set();

      if (existingValues.length > 1) {

        for (let i = 1; i < existingValues.length; i++) {

          const existingId = String(
            existingValues[i][11] || ""
          );

          if (existingId) {
            existingIds.add(existingId);
          }
        }
      }

      /*
      ---------------------------------------------------------
      Buat data baru saja
      ---------------------------------------------------------
      */

      const rows = [];

      let nextNumber = getNextNumber(sheet);

      for (let i = 0; i < values.length; i++) {

        const item = values[i];

        const itemId = String(item.id || "");

        /*
        Jika ID sudah pernah tersimpan,
        jangan masukkan lagi.
        */

        if (itemId && existingIds.has(itemId)) {
          continue;
        }

        rows.push([
          // A = No
          nextNumber,

          // B = Shift
          item.shift || "",

          // C = PIC
          item.pic || "",

          // D = Area
          item.workArea || "",

          // E = No Rakjis
          item.rackJis || "",

          // F = Stamp Date
          item.stampDate || "",

          // G = Model
          item.area || "",

          // H = Full Code
          item.fullCode || "",

          // I = Result
          item.result || "OK",

          // J = Detail Problem
          item.detailProblem || "",

          // K = Created At
          item.createdAt || new Date(),

          // L = ID
          item.id || ""
        ]);

        nextNumber++;
      }

      /*
      ---------------------------------------------------------
      Tidak ada data baru
      ---------------------------------------------------------
      */

      if (rows.length === 0) {

        return jsonResponse({
          success: true,
          message: "Semua data sudah tersimpan di Google Sheets.",
          count: 0
        });
      }

      /*
      ---------------------------------------------------------
      APPEND ke Google Sheets
      ---------------------------------------------------------
      */

      const startRow = sheet.getLastRow() + 1;

      sheet
        .getRange(
          startRow,
          1,
          rows.length,
          12
        )
        .setValues(rows);

      return jsonResponse({
        success: true,
        message: "Data berhasil ditambahkan ke Google Sheets.",
        count: rows.length
      });
    }

    /*
    =========================================================
    SYNC ALL
    =========================================================

    Dipertahankan hanya untuk kompatibilitas.
    Tidak lagi menghapus data Google Sheets.

    */

    if (action === "syncAll") {

      const values = data.data || [];

      if (!Array.isArray(values)) {

        return jsonResponse({
          success: false,
          message: "Format data tidak valid."
        });
      }

      if (values.length === 0) {

        return jsonResponse({
          success: true,
          message: "Tidak ada data lokal.",
          count: 0
        });
      }

      const existingValues =
        sheet.getDataRange().getValues();

      const existingIds = new Set();

      if (existingValues.length > 1) {

        for (let i = 1; i < existingValues.length; i++) {

          const existingId =
            String(
              existingValues[i][11] || ""
            );

          if (existingId) {
            existingIds.add(existingId);
          }
        }
      }

      const rows = [];

      let nextNumber =
        getNextNumber(sheet);

      values.forEach((item) => {

        const itemId =
          String(item.id || "");

        if (
          itemId &&
          existingIds.has(itemId)
        ) {
          return;
        }

        rows.push([
          nextNumber++,

          item.shift || "",

          item.pic || "",

          item.workArea || "",

          item.rackJis || "",

          item.stampDate || "",

          item.area || "",

          item.fullCode || "",

          item.result || "OK",

          item.detailProblem || "",

          item.createdAt || new Date(),

          item.id || ""
        ]);

      });

      if (rows.length === 0) {

        return jsonResponse({
          success: true,
          message:
            "Semua data sudah tersimpan di Google Sheets.",
          count: 0
        });
      }

      sheet
        .getRange(
          sheet.getLastRow() + 1,
          1,
          rows.length,
          12
        )
        .setValues(rows);

      return jsonResponse({
        success: true,
        message:
          "Data berhasil ditambahkan ke Google Sheets.",
        count: rows.length
      });
    }

    /*
    =========================================================
    ACTION TIDAK DIKENAL
    =========================================================
    */

    return jsonResponse({
      success: false,
      message: "Action tidak dikenal"
    });

  } catch (error) {

    return jsonResponse({
      success: false,
      message: error.message
    });
  }
}


/*
=========================================================
MENCARI NOMOR BERIKUTNYA
=========================================================
*/

function getNextNumber(sheet) {

  const lastRow =
    sheet.getLastRow();

  if (lastRow <= 1) {
    return 1;
  }

  const values =
    sheet
      .getRange(
        2,
        1,
        lastRow - 1,
        1
      )
      .getValues();

  let maxNumber = 0;

  values.forEach((row) => {

    const number =
      Number(row[0]);

    if (
      !isNaN(number) &&
      number > maxNumber
    ) {
      maxNumber = number;
    }

  });

  return maxNumber + 1;
}


/*
=========================================================
RENUMBER ROWS
=========================================================
*/

function renumberRows() {

  const sheet =
    getSheet();

  const lastRow =
    sheet.getLastRow();

  if (lastRow <= 1) {
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