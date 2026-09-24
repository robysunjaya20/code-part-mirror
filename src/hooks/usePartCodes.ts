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
  PartData,
  PartFormData,
} from "@/types/part";

const STORAGE_KEY = "part-code-data";

export function usePartCodes() {

  const [data, setData] =
    useState<PartData[]>([]);

  const [isLoaded, setIsLoaded] =
    useState(false);

  const [form, setForm] =
    useState<PartFormData>({
      area: "SU2ID LH",
      partCode: "",
      result: "OK",
      stampDate: "",
      detailProblem: "",
    });

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [search, setSearch] =
    useState("");

  const [filterArea, setFilterArea] =
    useState("ALL");


  // ========================================
  // LOAD LOCAL STORAGE
  // ========================================

  useEffect(() => {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (saved) {

        const parsed =
          JSON.parse(saved);

        if (Array.isArray(parsed)) {

          const migrated =
            parsed.map((item) => {

              let partCode =
                item.partCode || "";

              // Migrasi data lama:
              // 020 + NB9 -> 020NB9
              if (
                item.color &&
                /^\d{3}$/.test(partCode)
              ) {

                partCode =
                  `${partCode}${item.color}`;

              }

              const result =
                item.result === "NG"
                  ? "NG"
                  : "OK";

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

              };

            });

          setData(migrated);

        }

      }

    } catch (error) {

      console.error(
        "Gagal membaca Local Storage:",
        error
      );

    }

    setIsLoaded(true);

  }, []);


  // ========================================
  // SAVE LOCAL STORAGE
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

  const previewCode = useMemo(() => {

    const selectedArea =
      AREA_OPTIONS.find(
        (item) =>
          item.label === form.area
      );

    if (!selectedArea) {
      return "";
    }

    return (
      selectedArea.prefix +
      (form.partCode || "---")
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

    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

  };


  // ========================================
  // RESET FORM
  // ========================================

  const resetForm = () => {

    setForm({
      area: "SU2ID LH",
      partCode: "",
      result: "OK",
      stampDate: "",
      detailProblem: "",
    });

    setEditingId(null);

  };


  // ========================================
  // SAVE PART
  // ========================================

  const savePart = () => {

    // ----------------------------------------
    // Validasi Kode Part
    // ----------------------------------------

    if (
      !/^\d{3}[A-Z0-9]{3}$/.test(
        form.partCode
      )
    ) {

      return {

        success: false,

        message:
          "Kode Part harus terdiri dari 3 angka + 3 kode warna. Contoh: 020NB9.",

      };

    }


    // ----------------------------------------
    // Validasi Result
    // ----------------------------------------

    if (
      form.result !== "OK" &&
      form.result !== "NG"
    ) {

      return {

        success: false,

        message:
          "Result harus dipilih OK atau NG.",

      };

    }


    // ----------------------------------------
    // Validasi Stamp Date / LOT
    // ----------------------------------------

    if (
      !/^[A-Z]\d{4}$/.test(
        form.stampDate
      )
    ) {

      return {

        success: false,

        message:
          "STAMP DATE / LOT harus terdiri dari 1 huruf dan 4 angka. Contoh: A1234.",

      };

    }


    // ========================================
    // DETAIL PROBLEM TIDAK WAJIB
    // ========================================
    // Tidak ada validasi di sini.
    // Boleh kosong.


    // ----------------------------------------
    // Cari Model
    // ----------------------------------------

    const selectedArea =
      AREA_OPTIONS.find(
        (item) =>
          item.label === form.area
      );

    if (!selectedArea) {

      return {

        success: false,

        message:
          "Model tidak ditemukan.",

      };

    }


    // ----------------------------------------
    // Generate Full Code
    // ----------------------------------------

    const fullCode =
      selectedArea.prefix +
      form.partCode;


    // ========================================
    // UPDATE DATA
    // ========================================

    if (editingId !== null) {

      setData((previous) =>

        previous.map((item) =>

          item.id === editingId

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

              }

            : item

        )

      );


      resetForm();


      return {

        success: true,

        mode:
          "update" as const,

        message:
          "Data berhasil diperbarui.",

      };

    }


    // ========================================
    // CREATE DATA BARU
    // ========================================

    const newPart: PartData = {

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

      createdAt:
        new Date().toISOString(),

    };


    setData((previous) => [

      ...previous,

      newPart,

    ]);


    resetForm();


    return {

      success: true,

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
        part.stampDate || "",

      detailProblem:
        part.detailProblem || "",

    });


    window.scrollTo({

      top: 0,

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

    setData((previous) =>
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

    setData([]);

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
              .includes(keyword) ||

            item.area
              .toLowerCase()
              .includes(keyword) ||

            item.partCode
              .toLowerCase()
              .includes(keyword) ||

            item.result
              .toLowerCase()
              .includes(keyword) ||

            item.stampDate
              .toLowerCase()
              .includes(keyword) ||

            item.detailProblem
              .toLowerCase()
              .includes(keyword);


          const matchesArea =
            filterArea === "ALL" ||
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


  return {

    data,

    filteredData,

    form,

    editingId,

    search,

    filterArea,

    previewCode,

    setSearch,

    setFilterArea,

    updateForm,

    savePart,

    editPart,

    deletePart,

    deleteAll,

    resetForm,

  };

}