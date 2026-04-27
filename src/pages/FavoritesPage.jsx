import { useNavigate } from "react-router-dom";
import { Star, Trash2, ArrowRight } from "lucide-react";
import { MOVIES } from "../data/movies";
import useFavoritesStore from "../store/useFavoritesStore";
import { Button }   from "../components/ui/button";
import { Badge }    from "../components/ui/badge";
import { useToast } from "../components/ui/toast";
import { cn } from "../lib/utils";

export default function FavoritesPage() {
  const { favorites, removeFavorite, clearAll } = useFavoritesStore();
  const navigate = useNavigate();
  const toast    = useToast();

  const favMovies = favorites.map((id) => MOVIES.find((m) => m.id === id)).filter(Boolean);

  const onRemove = (movie) => {
    removeFavorite(movie.id);
    toast({ title: movie.title + " olib tashlandi" });
  };
  const onClearAll = () => {
    if (!window.confirm("Barcha sevimlilarni o'chirmoqchimisiz?")) return;
    clearAll();
    toast({ title: "Ro'yxat tozalandi" });
  };

  return (
    <div className="animate-fade-up">
      {/* header */}
      <div className="px-10 pt-14 pb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-head text-[52px] leading-none tracking-wide">
            MENING <span className="text-brand">SEVIMLILARIM</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2">{favMovies.length} ta film saqlangan</p>
        </div>
        {favMovies.length > 0 && (
          <Button variant="outline" size="sm" onClick={onClearAll} className="hover:text-accent-danger hover:border-accent-danger/30">
            <Trash2 size={13}/> Hammasini tozalash
          </Button>
        )}
      </div>

      {/* empty */}
      {favMovies.length === 0 ? (
        <div className="px-10 py-24 flex flex-col items-center gap-4 text-center">
          <Star size={52} className="text-slate-700 opacity-30" />
          <h3 className="font-head text-2xl tracking-widest text-slate-600">SEVIMLILAR BO'SH</h3>
          <p className="text-slate-500 text-sm max-w-xs leading-relaxed">Hali hech qanday film saqlanmagan. Katalogdan filmlar qo'shing.</p>
          <Button className="mt-2" onClick={() => navigate("/")}>
            <ArrowRight size={14}/> Katalogga o'tish
          </Button>
        </div>
      ) : (
        <div className="px-10 pb-24 flex flex-col gap-3">
          {favMovies.map((movie, i) => (
            <div
              key={movie.id}
              onClick={() => navigate("/movie/" + movie.id)}
              className="flex items-center gap-5 bg-surface-2 border border-white/8 rounded-[14px] p-4 cursor-pointer transition-all duration-200 hover:border-brand/20 hover:translate-x-1.5 hover:shadow-[0_4px_20px_rgba(0,0,0,.3)]"
            >
              <span className={cn("font-head text-3xl w-8 text-center flex-shrink-0", i < 3 ? "text-accent-amber" : "text-surface-4")}>
                {i + 1}
              </span>
              <div className="w-14 h-20 rounded-xl bg-surface-3 border border-white/8 flex items-center justify-center text-2xl flex-shrink-0">
                {movie.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[15px] text-slate-100 mb-1">{movie.title}</p>
                <p className="text-xs text-slate-500 mb-2">{movie.year} · {movie.genre.join(" · ")} · {movie.duration}</p>
                <Badge variant="default" className="text-[11px]">★ {movie.rating}</Badge>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(movie); }}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/8 text-slate-500 flex-shrink-0 cursor-pointer transition-all hover:bg-accent-danger/10 hover:text-accent-danger hover:border-accent-danger/30"
              >
                <Trash2 size={14}/>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
