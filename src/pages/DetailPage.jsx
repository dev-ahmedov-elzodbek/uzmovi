import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Calendar, Clock, Globe, User } from "lucide-react";
import { MOVIES } from "../data/movies";
import useFavoritesStore from "../store/useFavoritesStore";
import { Button }    from "../components/ui/button";
import { Badge }     from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { useToast }  from "../components/ui/toast";

function Ring({ rating }) {
  const c = 163.4;
  const off = c - ((rating - 6) / 4) * c;
  return (
    <div className="flex items-center gap-3">
      <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(56,189,248,.1)" strokeWidth="4" />
        <circle cx="32" cy="32" r="26" fill="none" stroke="url(#g)" strokeWidth="4"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#34d399" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
      <div>
        <div className="font-head text-4xl text-brand leading-none">{rating}</div>
        <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">IMDb reyting</div>
      </div>
    </div>
  );
}

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const toast = useToast();

  const movie = MOVIES.find((m) => m.id === Number(id));
  if (!movie) return (
    <div className="px-10 py-24 text-center text-slate-500">
      <p className="text-5xl mb-4">🎬</p>
      <p className="mb-5">Film topilmadi</p>
      <Button variant="outline" onClick={() => navigate("/")}>Bosh sahifaga qaytish</Button>
    </div>
  );

  const saved = isFavorite(movie.id);
  const onFav = () => {
    if (saved) { removeFavorite(movie.id); toast({ title: movie.title + " olib tashlandi" }); }
    else        { addFavorite(movie.id);    toast({ title: "⭐  " + movie.title + " saqlandi!" }); }
  };

  return (
    <div className="animate-fade-up">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 mx-10 mt-8 px-4 py-2 rounded-xl bg-surface-3 border border-white/8 text-slate-400 text-sm cursor-pointer hover:text-brand hover:border-brand/30 transition-all"
      >
        <ArrowLeft size={14} /> Orqaga
      </button>

      <div className="grid px-10 py-10 pb-24 gap-12 items-start" style={{ gridTemplateColumns: "260px 1fr" }}>
        {/* poster */}
        <div className="rounded-[14px] border border-white/8 bg-surface-3 aspect-[2/3] flex items-center justify-center text-7xl shadow-[inset_0_0_40px_rgba(56,189,248,.04)] flex-shrink-0">
          {movie.emoji}
        </div>

        {/* content */}
        <div className="pt-1">
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre.map((g) => <Badge key={g}>{g}</Badge>)}
          </div>

          <h1 className="font-head text-[58px] leading-[1.05] tracking-wide mb-5">{movie.title}</h1>
          <Ring rating={movie.rating} />

          <div className="flex flex-wrap gap-5 mt-5 mb-1 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Calendar size={13}/><strong className="text-slate-200">{movie.year}</strong></span>
            <span className="flex items-center gap-1.5"><Clock    size={13}/><strong className="text-slate-200">{movie.duration}</strong></span>
            <span className="flex items-center gap-1.5"><Globe    size={13}/><strong className="text-slate-200">{movie.country}</strong></span>
          </div>

          <Separator className="my-6" />

          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[2px] mb-2">Qisqacha mazmun</p>
          <p className="text-slate-300 text-[15px] leading-7 mb-5">{movie.desc}</p>

          <p className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <User size={13}/> Rejissyor: <strong className="text-slate-200">{movie.director}</strong>
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant={saved ? "danger" : "primary"} onClick={onFav}>
              <Star size={14} fill={saved ? "none" : "currentColor"} />
              {saved ? "Sevimlilardan chiqarish" : "Sevimlilariga qo'sh"}
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>← Katalogga qaytish</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
