"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import StatsCards from "@/components/StatsCards";
import AreaSetting from "@/components/AreaSetting";
import PartForm from "@/components/PartForm";
import PartList from "@/components/PartList";
import GoogleSheetsCard from "@/components/GoogleSheetsCard";
import SyncModal from "@/components/SyncModal";
import DeleteAllModal from "@/components/DeleteAllModal";
import Toast from "@/components/Toast";

import { usePartCodes } from "@/hooks/usePartCodes";
import { saveBatchToGoogleSheets } from "@/lib/api";

export default function Home() {
  const {
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

    workArea,
    rackJis,
    pic,
    shift,

    /* Tanggal kerja */
    workDate,

    updateWorkArea,
    updateRackJis,
    updatePic,
    updateShift,

    /* Update tanggal kerja */
    updateWorkDate,

    saveAreaSetting,

  } = usePartCodes();


  const [showSyncModal, setShowSyncModal] =
    useState(false);

  const [showDeleteAllModal, setShowDeleteAllModal] =
    useState(false);

  const [isSyncing, setIsSyncing] =
    useState(false);

  const [lastSync, setLastSync] =
    useState<string | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);


  const handleSaveAreaSetting = () => {

    const result =
      saveAreaSetting();


    if (!result.success) {

      setToast({
        message:
          result.message,

        type:
          "error",
      });

      return;
    }


    setToast({
      message:
        result.message,

      type:
        "success",
    });

  };

  const handleSavePart = () => {

    const result =
      savePart();


    if (!result.success) {

      setToast({
        message:
          result.message,

        type:
          "error",
      });

      return;
    }


    setToast({
      message:
        result.message,

      type:
        "success",
    });

  };


  const handleDeletePart = (
    id: number
  ) => {

    deletePart(id);


    setToast({
      message:
        "Data berhasil dihapus.",

      type:
        "success",
    });

  };


  const handleDeleteAll = () => {

    deleteAll();


    setShowDeleteAllModal(
      false
    );


    setToast({
      message:
        "Semua data lokal berhasil dihapus.",

      type:
        "success",
    });

  };

  const openSyncModal = () => {

    if (
      data.length === 0
    ) {

      setToast({
        message:
          "Belum ada data lokal yang bisa disimpan.",

        type:
          "info",
      });

      return;
    }


    /*
     * Pastikan tanggal sudah dipilih
     */
    if (!workDate) {

      setToast({
        message:
          "Tanggal kerja belum dipilih. Silakan simpan Setting Area terlebih dahulu.",

        type:
          "error",
      });

      return;
    }


    setShowSyncModal(
      true
    );

  };


  const formatDisplayDate = (
    date: string
  ) => {

    if (!date) {
      return "";
    }


    const parts =
      date.split("-");


    if (
      parts.length !== 3
    ) {
      return date;
    }


    return `${parts[2]}-${parts[1]}-${parts[0]}`;

  };


  const handleSync = async () => {

    try {

      setIsSyncing(
        true
      );


      /*
       * Sekarang tanggal kerja
       * ikut dikirim ke Apps Script.
       */
      const result =
        await saveBatchToGoogleSheets(
          data,
          workDate
        );


      setLastSync(
        new Date().toLocaleString(
          "id-ID"
        )
      );


      setShowSyncModal(
        false
      );


      setToast({
        message:
          `Berhasil menyimpan ${result.count} data baru ke sheet ${formatDisplayDate(workDate)}.`,

        type:
          "success",
      });


    } catch (error) {

      console.error(
        "Gagal menyimpan ke Google Sheets:",
        error
      );


      setShowSyncModal(
        false
      );


      setToast({
        message:
          error instanceof Error
            ? error.message
            : "Gagal menyimpan data ke Google Sheets.",

        type:
          "error",
      });


    } finally {

      setIsSyncing(
        false
      );

    }

  };


  return (

    <div className="min-h-screen bg-slate-100">

      <Header />


      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

        <StatsCards
          data={data}
          displayed={
            filteredData.length
          }
        />

        <AreaSetting

          area={
            workArea
          }

          rackJis={
            rackJis
          }

          pic={
            pic
          }

          shift={
            shift
          }

          /*
           * Tanggal kerja
           */
          workDate={
            workDate
          }

          onChangeArea={
            updateWorkArea
          }

          onChangeRackJis={
            updateRackJis
          }

          onChangePic={
            updatePic
          }

          onChangeShift={
            updateShift
          }

          /*
           * Update tanggal
           */
          onChangeWorkDate={
            updateWorkDate
          }

          onSave={
            handleSaveAreaSetting
          }

        />


        <PartForm
          form={
            form
          }

          editing={
            editingId !== null
          }

          previewCode={
            previewCode
          }

          onChange={
            updateForm
          }

          onSubmit={
            handleSavePart
          }

          onCancel={
            resetForm
          }

        />


        <GoogleSheetsCard

          dataCount={
            data.length
          }

          isSyncing={
            isSyncing
          }

          lastSync={
            lastSync
          }

          onSync={
            openSyncModal
          }

        />


        <PartList

          data={
            filteredData
          }

          search={
            search
          }

          filterArea={
            filterArea
          }

          onSearch={
            setSearch
          }

          onFilterArea={
            setFilterArea
          }

          onEdit={
            editPart
          }

          onDelete={
            handleDeletePart
          }

          onDeleteAll={() =>
            setShowDeleteAllModal(
              true
            )
          }

          onClearFilter={() => {

            setSearch("");

            setFilterArea(
              "ALL"
            );

          }}

        />

      </main>


      <Footer />


      {showSyncModal &&
        !isSyncing && (

          <SyncModal

            dataCount={
              data.length
            }

            onClose={() =>
              setShowSyncModal(
                false
              )
            }

            onConfirm={
              handleSync
            }

          />

        )}

      {isSyncing && (

        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm">

          <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
              ☁️
            </div>


            <div className="mx-auto mt-5 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />


            <h2 className="mt-5 text-lg font-extrabold text-slate-900">
              Menyimpan Data
            </h2>


            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">

              Sedang menyimpan{" "}

              <span className="font-bold text-slate-700">
                {data.length} data
              </span>

              {" "}dari browser ke Google Sheets.

            </p>


            {/* Tampilkan tanggal */}
            <div className="mt-3 rounded-xl bg-emerald-50 px-4 py-3">

              <p className="text-xs font-semibold text-emerald-700">
                Sheet tanggal:
              </p>

              <p className="mt-1 text-sm font-extrabold text-emerald-800">
                {formatDisplayDate(
                  workDate
                )}
              </p>

            </div>


            <div className="mt-5 rounded-xl bg-slate-100 px-4 py-3">

              <p className="text-xs font-semibold text-slate-500">
                Mohon jangan tutup halaman ini.
              </p>

            </div>

          </div>

        </div>

      )}

      {showDeleteAllModal && (

        <DeleteAllModal

          dataCount={
            data.length
          }

          onClose={() =>
            setShowDeleteAllModal(
              false
            )
          }

          onConfirm={
            handleDeleteAll
          }

        />

      )}

      {toast && (

        <Toast

          message={
            toast.message
          }

          type={
            toast.type
          }

          onClose={() =>
            setToast(
              null
            )
          }

        />

      )}

    </div>

  );
}