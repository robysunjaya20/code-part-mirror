"use client";

import {
  useState,
} from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import StatsCards from "@/components/StatsCards";

import PartForm from "@/components/PartForm";

import PartList from "@/components/PartList";

import GoogleSheetsCard from "@/components/GoogleSheetsCard";

import SyncModal from "@/components/SyncModal";

import DeleteAllModal from "@/components/DeleteAllModal";

import Toast from "@/components/Toast";

import {
  usePartCodes,
} from "@/hooks/usePartCodes";

import {
  syncAllToGoogleSheets,
} from "@/lib/api";


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

  } = usePartCodes();


  const [
    showSyncModal,
    setShowSyncModal,
  ] = useState(false);


  const [
    showDeleteAllModal,
    setShowDeleteAllModal,
  ] = useState(false);


  const [
    isSyncing,
    setIsSyncing,
  ] = useState(false);


  const [
    lastSync,
    setLastSync,
  ] = useState<string | null>(null);


  const [
    toast,
    setToast,
  ] = useState<{
    message: string;
    type:
      | "success"
      | "error"
      | "info";
  } | null>(null);

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
        "Semua data berhasil dihapus.",

      type:
        "success",
    });

  };

  const openSyncModal = () => {

    if (data.length === 0) {

      setToast({
        message:
          "Belum ada data lokal yang bisa disimpan.",

        type:
          "info",
      });

      return;

    }

    setShowSyncModal(true);

  };

  const handleSync = async () => {

    try {
      setIsSyncing(true);

      const result =
        await syncAllToGoogleSheets(
          data
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
          `Berhasil menyimpan ${result.count} data ke Google Sheets.`,

        type:
          "success",
      });


    } catch (error) {

      console.error(error);


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

      setIsSyncing(false);

    }

  };


  return (

    <div className="min-h-screen bg-slate-100">

      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

        <StatsCards
          data={
            data
          }

          displayed={
            filteredData.length
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

              Sedang menyinkronkan{" "}

              <span className="font-bold text-slate-700">
                {data.length} data
              </span>

              {" "}ke Google Sheets.

            </p>


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
            setToast(null)
          }

        />

      )}

    </div>

  );
}