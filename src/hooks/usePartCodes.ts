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


const STORAGE_KEY =
  "part-code-data";


export function usePartCodes() {

  const [data, setData] =
    useState<PartData[]>([]);


  const [isLoaded, setIsLoaded] =
    useState(false);

  const [form, setForm] =
    useState<PartFormData>({
      area: "SU2ID LH",
      partCode: "",
      color: "NB9",
    });

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [search, setSearch] =
    useState("");


  const [filterArea, setFilterArea] =
    useState("ALL");


  const [filterColor, setFilterColor] =
    useState("ALL");

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

          setData(parsed);

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
      (form.partCode || "---") +
      form.color
    );

  }, [form]);

  const updateForm = (
    field: keyof PartFormData,
    value: string
  ) => {

    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

  };

  const resetForm = () => {

    setForm({
      area: "SU2ID LH",
      partCode: "",
      color: "NB9",
    });


    setEditingId(null);

  };

  const savePart = () => {

    if (!/^\d{3}$/.test(form.partCode)) {

      return {
        success: false,
        message:
          "Kode part harus tepat 3 angka.",
      };

    }


    const selectedArea =
      AREA_OPTIONS.find(
        (item) =>
          item.label === form.area
      );


    if (!selectedArea) {

      return {
        success: false,
        message:
          "Area tidak ditemukan.",
      };

    }


    const fullCode =
      selectedArea.prefix +
      form.partCode +
      form.color;

    if (editingId !== null) {

      setData((previous) =>

        previous.map((item) =>

          item.id === editingId

            ? {
                ...item,

                area: form.area,

                prefix:
                  selectedArea.prefix,

                partCode:
                  form.partCode,

                color:
                  form.color,

                fullCode,
              }

            : item

        )

      );


      resetForm();


      return {
        success: true,
        mode: "update" as const,
        message:
          "Data berhasil diperbarui.",
      };

    }

    const newPart: PartData = {

      id: Date.now(),

      area: form.area,

      prefix:
        selectedArea.prefix,

      partCode:
        form.partCode,

      color:
        form.color,

      fullCode,

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
      mode: "create" as const,
      message:
        "Data berhasil ditambahkan.",
    };

  };

  const editPart = (
    part: PartData
  ) => {

    setEditingId(part.id);


    setForm({
      area: part.area,
      partCode: part.partCode,
      color: part.color,
    });


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  const deletePart = (
    id: number
  ) => {

    setData((previous) =>
      previous.filter(
        (item) =>
          item.id !== id
      )
    );


    if (editingId === id) {

      resetForm();

    }

  };

  const deleteAll = () => {

    setData([]);

    resetForm();

  };

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
              .includes(keyword);


          const matchesArea =
            filterArea === "ALL" ||
            item.area ===
              filterArea;


          const matchesColor =
            filterColor === "ALL" ||
            item.color ===
              filterColor;


          return (
            matchesSearch &&
            matchesArea &&
            matchesColor
          );

        }
      );

    }, [
      data,
      search,
      filterArea,
      filterColor,
    ]);

  // RETURN

  return {

    data,

    filteredData,

    form,

    editingId,

    search,

    filterArea,

    filterColor,

    previewCode,

    setSearch,

    setFilterArea,

    setFilterColor,

    updateForm,

    savePart,

    editPart,

    deletePart,

    deleteAll,

    resetForm,

  };

}