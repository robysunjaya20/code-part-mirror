import type { PartData } from "@/types/part";

type Props = {
  data: PartData[];
  displayed: number;
};

export default function StatsCards({
  data,
  displayed,
}: Props) {

  const su2id =
    data.filter((item) =>
      item.area.startsWith("SU2ID")
    ).length;


  const ks =
    data.filter((item) =>
      item.area.startsWith("KS")
    ).length;


  const cards = [
    {
      title: "Total Data",
      value: data.length,
      className:
        "border-slate-200 bg-white text-slate-900",
      labelClass:
        "text-slate-500",
    },

    {
      title: "SU2ID",
      value: su2id,
      className:
        "border-blue-200 bg-blue-50 text-blue-800",
      labelClass:
        "text-blue-700",
    },

    {
      title: "KS",
      value: ks,
      className:
        "border-purple-200 bg-purple-50 text-purple-800",
      labelClass:
        "text-purple-700",
    },

    {
      title: "Ditampilkan",
      value: displayed,
      className:
        "border-amber-200 bg-amber-50 text-amber-800",
      labelClass:
        "text-amber-700",
    },
  ];


  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`rounded-2xl border p-4 shadow-sm ${card.className}`}
        >

          <p
            className={`text-xs font-bold uppercase tracking-wide ${card.labelClass}`}
          >
            {card.title}
          </p>

          <p className="mt-1 text-2xl font-extrabold">
            {card.value}
          </p>

        </div>

      ))}

    </div>
  );
}