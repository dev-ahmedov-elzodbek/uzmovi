import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { MOVIES } from "../data/movies";
import MovieCard from "../components/MovieCard";
import { Input } from "../components/ui/input";

const ALL_GENRES = ["Hammasi", ...new Set(MOVIES.flatMap((m) => m.genre))];
const SORTS = [
  { k: "rating", l: "Reyting ↓" },
  { k: "year",   l: "Yil ↓" },
  { k: "title",  l: "A – Z" },
];

export default function HomePage() {
  const [q,      setQ]      = useState("");
  const [genre,  setGenre]  = useState("Hammasi");
  const [sort,   setSort]   = useState("rating");

  const list = useMemo(() => {
    let r = MOVIES.filter((m) =>
      (m.title.toLowerCase().includes(q.toLowerCase()) || m.genre.some((g) => g.toLowerCase().includes(q.toLowerCase()))) &&
      (genre === "Hammasi" || m.genre.includes(genre))
    );
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    if (sort === "year")   r = [...r].sort((a, b) => b.year   - a.year);
    if (sort === "title")  r = [...r].sort((a, b) => a.title.localeCompare(b.title));
    return r;
  }, [q, genre, sort]);

  return (
    <main className="animate-fade-up">
      {/* hero */}
      <div className="px-10 pt-14 pb-8">
        <h1 className="font-head text-[72px] leading-none tracking-wide">
          KINO <span className="text-brand">DUNYOSI</span>
        </h1>
        <p className="text-slate-500 mt-2 text-[15px]">Eng yaxshi filmlarni kashf eting va sevimlilarga saqlang</p>
      </div>

      {/* search */}
      <div className="px-10 mb-6 flex flex-col gap-3">
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <Input className="pl-10" placeholder="Film nomini yoki janrini qidirish..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>

        {/* genre pills */}
        <div className="flex flex-wrap gap-2">
          {ALL_GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={[
                "px-3.5 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-all duration-150",
                genre === g
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-white/8 bg-surface-3 text-slate-400 hover:border-brand/35 hover:text-brand",
              ].join(" ")}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* section bar */}
      <div className="px-10 mb-5 flex items-center gap-3">
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[2px]">Barcha filmlar</span>
        <span className="text-xs text-slate-500 bg-surface-3 border border-white/8 px-2 py-0.5 rounded-full">{list.length} ta</span>

        <div className="ml-auto flex items-center gap-2">
          <SlidersHorizontal size={12} className="text-slate-500" />
          {SORTS.map((s) => (
            <button
              key={s.k}
              onClick={() => setSort(s.k)}
              className={[
                "px-3 py-1 rounded-lg text-[11px] font-medium border cursor-pointer transition-all",
                sort === s.k
                  ? "border-brand/40 bg-brand/8 text-brand"
                  : "border-white/8 text-slate-500 hover:text-slate-300",
              ].join(" ")}
            >
              {s.l}
            </button>
          ))}
        </div>
      </div>

      {/* grid */}
      {list.length === 0 ? (
        <div className="px-10 py-24 text-center text-slate-600">
          <p className="text-4xl mb-3 opacity-25">🎬</p>
          <p className="text-sm">Film topilmadi</p>
        </div>
      ) : (
        <div className="px-10 pb-24 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(195px,1fr))" }}>
          {list.map((m) => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}
    </main>
  );
}
