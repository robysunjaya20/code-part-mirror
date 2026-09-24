"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AREA_OPTIONS,
} from "@/data/partConfig";

import type {
  AreaSetting,
  PartData,
  PartFormData,
  RackJisType,
  ShiftType,
} from "@/types/part";


// ========================================
// STORAGE KEY
// ========================================

const STORAGE_KEY =
  "part-code-data";

const SETTING_STORAGE_KEY =
  "part-area-setting";


// ========================================
// HOOK
// ========================================

export function usePartCodes() {


  // ======================================
  // DATA
  // ======================================

  const [data, setData] =
    useState<PartData[]>([]);

  const [isLoaded, setIsLoaded] =
    useState(false);


  // ======================================
  // SETTING AREA KERJA
  // ======================================

  const [workArea, setWorkArea] =
    useState<AreaSetting>(
      "RAK JIS"
    );


  const [rackJis, setRackJis] =
    useState<RackJisType | "">(
      "RAK JIS 1"
    );


  const [pic, setPic] =
    useState("");


  const [shift, setShift] =
    useState<ShiftType>(
      "SHIFT 1"
    );


  // ======================================
  // FORM
  // ======================================

  const [form, setForm] =
    useState<PartFormData>({

      area:
        "SU2ID LH",

      partCode:
        "",

      result:
        "OK",

      stampDate:
        "",

      detailProblem:
        "",

      workArea:
        "RAK JIS",

      rackJis:
        "RAK JIS 1",

      pic:
        "",

      shift:
        "SHIFT 1",

    });


  // ======================================
  // EDITING
  // ======================================

  const [editingId, setEditingId] =
    useState<number | null>(
      null
    );


  // ======================================
  // SEARCH
  // ======================================

  const [search, setSearch] =
    useState("");


  const [filterArea, setFilterArea] =
    useState("ALL");


  // ========================================
  // LOAD LOCAL STORAGE
  // ========================================

  useEffect(() => {

    try {

      // ====================================
      // LOAD DATA
      // ====================================

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );


      if (saved) {

        const parsed =
          JSON.parse(saved);


        if (
          Array.isArray(parsed)
        ) {

          const migrated =
            parsed.map(
              (item) => {

                // --------------------------
                // Migrasi Part Code lama
                // --------------------------

                let partCode =
                  item.partCode || "";


                // Data lama:
                // 020 + NB9 = 020NB9

                if (
                  item.color &&
                  /^\d{3}$/.test(
                    partCode
                  )
                ) {

                  partCode =
                    `${partCode}${item.color}`;

                }


                // --------------------------
                // Result
                // --------------------------

                const result =
                  item.result === "NG"
                    ? "NG"
                    : "OK";


                // --------------------------
                // Work Area
                // --------------------------

                const migratedWorkArea:
                  AreaSetting =
                  item.workArea ===
                  "DOORSUB"
                    ? "DOORSUB"
                    : "RAK JIS";


                // --------------------------
                // Rack JIS
                // --------------------------

                const migratedRack =
                  item.rackJis || "";


                // --------------------------
                // Shift
                // --------------------------

                const migratedShift:
                  ShiftType =
                  item.shift === "SHIFT 2"
                    ? "SHIFT 2"
                    : item.shift === "SHIFT 3"
                      ? "SHIFT 3"
                      : "SHIFT 1";


                return {

                  ...item,

                  partCode,

                  fullCode:
                    `${item.prefix || ""}${partCode}`,

                  result,

                  stampDate:
                    item.stampDate || "",

                  detailProblem:
                    item.detailProblem || "",

                  workArea:
                    migratedWorkArea,

                  rackJis:
                    migratedRack,

                  pic:
                    item.pic || "",

                  shift:
                    migratedShift,

                };

              }
            );


          setData(
            migrated
          );

        }

      }


      // ====================================
      // LOAD SETTING
      // ====================================

      const savedSetting =
        localStorage.getItem(
          SETTING_STORAGE_KEY
        );


      if (savedSetting) {

        const setting =
          JSON.parse(
            savedSetting
          );


        // --------------------------
        // Area
        // --------------------------

        const loadedArea:
          AreaSetting =
          setting.workArea ===
          "DOORSUB"
            ? "DOORSUB"
            : "RAK JIS";


        // --------------------------
        // Rack JIS
        // --------------------------

        const loadedRack:
          RackJisType | "" =
          setting.rackJis ||
          "RAK JIS 1";


        // --------------------------
        // PIC
        // --------------------------

        const loadedPic =
          setting.pic || "";


        // --------------------------
        // Shift
        // --------------------------

        const loadedShift:
          ShiftType =
          setting.shift === "SHIFT 2"
            ? "SHIFT 2"
            : setting.shift === "SHIFT 3"
              ? "SHIFT 3"
              : "SHIFT 1";


        // --------------------------
        // Set state
        // --------------------------

        setWorkArea(
          loadedArea
        );


        setRackJis(
          loadedRack
        );


        setPic(
          loadedPic
        );


        setShift(
          loadedShift
        );


        // --------------------------
        // Update form
        // --------------------------

        setForm(
          (previous) => ({

            ...previous,

            workArea:
              loadedArea,

            rackJis:
              loadedRack,

            pic:
              loadedPic,

            shift:
              loadedShift,

          })
        );

      }

    } catch (error) {

      console.error(
        "Gagal membaca Local Storage:",
        error
      );

    }


    setIsLoaded(
      true
    );

  }, []);


  // ========================================
  // SAVE DATA TO LOCAL STORAGE
  // ========================================

  useEffect(() => {

    if (!isLoaded) {
      return;
    }


    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

    } catch (error) {

      console.error(
        "Gagal menyimpan Local Storage:",
        error
      );

    }

  }, [
    data,
    isLoaded,
  ]);


  // ========================================
  // PREVIEW FULL CODE
  // ========================================

  const previewCode =
    useMemo(() => {

      const selectedArea =
        AREA_OPTIONS.find(
          (item) =>
            item.label ===
            form.area
        );


      if (!selectedArea) {
        return "";
      }


      return (
        selectedArea.prefix +
        (
          form.partCode ||
          "---"
        )
      );

    }, [
      form.area,
      form.partCode,
    ]);


  // ========================================
  // UPDATE FORM
  // ========================================

  const updateForm = (
    field: keyof PartFormData,
    value: string
  ) => {

    setForm(
      (previous) => ({

        ...previous,

        [field]:
          value,

      })
    );

  };


  // ========================================
  // UPDATE WORK AREA
  // ========================================

  const updateWorkArea = (
    value: AreaSetting
  ) => {

    setWorkArea(
      value
    );


    /*
      RAK JIS dan DOORSUB
      sama-sama menggunakan
      Rak JIS 1-8.

      Jadi ketika Area diganti,
      Rak JIS TIDAK dikosongkan.
    */

    const selectedRack:
      RackJisType =
      rackJis ||
      "RAK JIS 1";


    setRackJis(
      selectedRack
    );


    setForm(
      (previous) => ({

        ...previous,

        workArea:
          value,

        rackJis:
          selectedRack,

      })
    );

  };


  // ========================================
  // UPDATE RACK JIS
  // ========================================

  const updateRackJis = (
    value: RackJisType | ""
  ) => {

    setRackJis(
      value
    );


    setForm(
      (previous) => ({

        ...previous,

        rackJis:
          value,

      })
    );

  };


  // ========================================
  // UPDATE PIC
  // ========================================

  const updatePic = (
    value: string
  ) => {

    setPic(
      value
    );


    setForm(
      (previous) => ({

        ...previous,

        pic:
          value,

      })
    );

  };


  // ========================================
  // UPDATE SHIFT
  // ========================================

  const updateShift = (
    value: ShiftType
  ) => {

    setShift(
      value
    );


    setForm(
      (previous) => ({

        ...previous,

        shift:
          value,

      })
    );

  };


  // ========================================
  // SAVE AREA SETTING
  // ========================================

  const saveAreaSetting = () => {


    // --------------------------------------
    // Rak JIS WAJIB dipilih
    // untuk RAK JIS maupun DOORSUB
    // --------------------------------------

    const finalRack =
      rackJis;


    if (!finalRack) {

      return {

        success:
          false,

        message:
          "Silakan pilih Rak JIS terlebih dahulu.",

      };

    }


    // --------------------------------------
    // PIC
    // --------------------------------------

    if (
      !pic.trim()
    ) {

      return {

        success:
          false,

        message:
          "PIC harus diisi.",

      };

    }


    // --------------------------------------
    // SHIFT
    // --------------------------------------

    if (!shift) {

      return {

        success:
          false,

        message:
          "Silakan pilih Shift.",

      };

    }


    // --------------------------------------
    // Setting
    // --------------------------------------

    const setting = {

      workArea,

      rackJis:
        finalRack,

      pic:
        pic.trim(),

      shift,

    };


    // --------------------------------------
    // Save Local Storage
    // --------------------------------------

    localStorage.setItem(
      SETTING_STORAGE_KEY,
      JSON.stringify(
        setting
      )
    );


    // --------------------------------------
    // Update Form
    // --------------------------------------

    setForm(
      (previous) => ({

        ...previous,

        workArea,

        rackJis:
          finalRack,

        pic:
          pic.trim(),

        shift,

      })
    );


    return {

      success:
        true,

      message:
        "Setting Area berhasil disimpan.",

    };

  };


  // ========================================
  // RESET FORM
  // ========================================

  const resetForm = () => {

    setForm(
      (previous) => ({

        ...previous,

        area:
          "SU2ID LH",

        partCode:
          "",

        result:
          "OK",

        stampDate:
          "",

        detailProblem:
          "",

        // Setting terakhir
        workArea,

        rackJis,

        pic,

        shift,

      })
    );


    setEditingId(
      null
    );

  };


  // ========================================
  // SAVE PART
  // ========================================

  const savePart = () => {


    // --------------------------------------
    // VALIDASI KODE PART
    // --------------------------------------

    if (
      !/^\d{3}[A-Z0-9]{3}$/.test(
        form.partCode
      )
    ) {

      return {

        success:
          false,

        message:
          "Kode Part harus terdiri dari 3 angka + 3 karakter. Contoh: 020NB9.",

      };

    }


    // --------------------------------------
    // VALIDASI RESULT
    // --------------------------------------

    if (
      form.result !== "OK" &&
      form.result !== "NG"
    ) {

      return {

        success:
          false,

        message:
          "Result harus dipilih OK atau NG.",

      };

    }


    // --------------------------------------
    // VALIDASI STAMP DATE / LOT
    // --------------------------------------

    if (
      !/^[A-Z]\d{4}$/.test(
        form.stampDate
      )
    ) {

      return {

        success:
          false,

        message:
          "STAMP DATE / LOT harus terdiri dari 1 huruf dan 4 angka. Contoh: A1234.",

      };

    }


    // --------------------------------------
    // VALIDASI AREA KERJA
    // --------------------------------------

    if (
      !form.workArea
    ) {

      return {

        success:
          false,

        message:
          "Area kerja belum dipilih.",

      };

    }


    // --------------------------------------
    // VALIDASI RAK JIS
    // --------------------------------------

    /*
      Berlaku untuk:

      RAK JIS
      DOORSUB
    */

    if (
      !form.rackJis
    ) {

      return {

        success:
          false,

        message:
          "Rak JIS belum dipilih.",

      };

    }


    // --------------------------------------
    // VALIDASI PIC
    // --------------------------------------

    if (
      !form.pic.trim()
    ) {

      return {

        success:
          false,

        message:
          "PIC belum diisi. Silakan simpan Setting Area terlebih dahulu.",

      };

    }


    // --------------------------------------
    // VALIDASI SHIFT
    // --------------------------------------

    if (
      !form.shift
    ) {

      return {

        success:
          false,

        message:
          "Shift belum dipilih.",

      };

    }


    // --------------------------------------
    // CARI MODEL
    // --------------------------------------

    const selectedArea =
      AREA_OPTIONS.find(
        (item) =>
          item.label ===
          form.area
      );


    if (!selectedArea) {

      return {

        success:
          false,

        message:
          "Model tidak ditemukan.",

      };

    }


    // --------------------------------------
    // FULL CODE
    // --------------------------------------

    const fullCode =
      selectedArea.prefix +
      form.partCode;


    // ======================================
    // UPDATE DATA
    // ======================================

    if (
      editingId !== null
    ) {

      setData(
        (previous) =>

          previous.map(
            (item) =>

              item.id ===
              editingId

                ? {

                    ...item,

                    area:
                      form.area,

                    prefix:
                      selectedArea.prefix,

                    partCode:
                      form.partCode,

                    fullCode,

                    result:
                      form.result,

                    stampDate:
                      form.stampDate,

                    detailProblem:
                      form.detailProblem.trim(),

                    workArea:
                      form.workArea,

                    rackJis:
                      form.rackJis,

                    pic:
                      form.pic.trim(),

                    shift:
                      form.shift,

                  }

                : item

          )
      );


      resetForm();


      return {

        success:
          true,

        mode:
          "update" as const,

        message:
          "Data berhasil diperbarui.",

      };

    }


    // ======================================
    // CREATE DATA BARU
    // ======================================

    const newPart:
      PartData = {

      id:
        Date.now(),

      area:
        form.area,

      prefix:
        selectedArea.prefix,

      partCode:
        form.partCode,

      fullCode,

      result:
        form.result,

      stampDate:
        form.stampDate,

      detailProblem:
        form.detailProblem.trim(),

      workArea:
        form.workArea,

      rackJis:
        form.rackJis,

      pic:
        form.pic.trim(),

      shift:
        form.shift,

      createdAt:
        new Date().toISOString(),

    };


    setData(
      (previous) => [

        ...previous,

        newPart,

      ]
    );


    resetForm();


    return {

      success:
        true,

      mode:
        "create" as const,

      message:
        "Data berhasil ditambahkan.",

    };

  };


  // ========================================
  // EDIT PART
  // ========================================

  const editPart = (
    part: PartData
  ) => {

    setEditingId(
      part.id
    );


    setWorkArea(
      part.workArea ||
      "RAK JIS"
    );


    setRackJis(
      part.rackJis ||
      "RAK JIS 1"
    );


    setPic(
      part.pic ||
      ""
    );


    setShift(
      part.shift ||
      "SHIFT 1"
    );


    setForm({

      area:
        part.area,

      partCode:
        part.partCode,

      result:
        part.result === "NG"
          ? "NG"
          : "OK",

      stampDate:
        part.stampDate ||
        "",

      detailProblem:
        part.detailProblem ||
        "",

      workArea:
        part.workArea ||
        "RAK JIS",

      rackJis:
        part.rackJis ||
        "RAK JIS 1",

      pic:
        part.pic ||
        "",

      shift:
        part.shift ||
        "SHIFT 1",

    });


    window.scrollTo({

      top:
        0,

      behavior:
        "smooth",

    });

  };


  // ========================================
  // DELETE PART
  // ========================================

  const deletePart = (
    id: number
  ) => {

    setData(
      (previous) =>
        previous.filter(
          (item) =>
            item.id !== id
        )
    );


    if (
      editingId === id
    ) {

      resetForm();

    }

  };


  // ========================================
  // DELETE ALL
  // ========================================

  const deleteAll = () => {

    setData(
      []
    );

    resetForm();

  };


  // ========================================
  // FILTER DATA
  // ========================================

  const filteredData =
    useMemo(() => {

      const keyword =
        search
          .trim()
          .toLowerCase();


      return data.filter(
        (item) => {

          const matchesSearch =
            keyword === "" ||

            item.fullCode
              .toLowerCase()
              .includes(
                keyword
              ) ||

            item.area
              .toLowerCase()
              .includes(
                keyword
              ) ||

            item.partCode
              .toLowerCase()
              .includes(
                keyword
              ) ||

            item.result
              .toLowerCase()
              .includes(
                keyword
              ) ||

            item.stampDate
              .toLowerCase()
              .includes(
                keyword
              ) ||

            item.detailProblem
              .toLowerCase()
              .includes(
                keyword
              ) ||

            item.workArea
              .toLowerCase()
              .includes(
                keyword
              ) ||

            item.rackJis
              .toLowerCase()
              .includes(
                keyword
              ) ||

            item.pic
              .toLowerCase()
              .includes(
                keyword
              ) ||

            item.shift
              .toLowerCase()
              .includes(
                keyword
              );


          const matchesArea =
            filterArea ===
              "ALL" ||
            item.area ===
              filterArea;


          return (
            matchesSearch &&
            matchesArea
          );

        }
      );

    }, [

      data,

      search,

      filterArea,

    ]);


  // ========================================
  // RETURN
  // ========================================

  return {

    // Data
    data,

    filteredData,

    // Form
    form,

    editingId,

    // Search
    search,

    filterArea,

    // Preview
    previewCode,

    // Setting Area
    workArea,

    rackJis,

    pic,

    shift,

    // Search setter
    setSearch,

    setFilterArea,

    // Form
    updateForm,

    // Setting
    updateWorkArea,

    updateRackJis,

    updatePic,

    updateShift,

    saveAreaSetting,

    // CRUD
    savePart,

    editPart,

    deletePart,

    deleteAll,

    resetForm,

  };

}