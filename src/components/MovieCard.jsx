import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import useFavoritesStore from "../store/useFavoritesStore";
import { Card } from "./ui/card";
import { cn } from "../lib/utils";
import { useToast } from "./ui/toast";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const toast = useToast();
  const saved = isFavorite(movie.id);
  const pct   = ((movie.rating - 6) / 4) * 100;

  const onFav = (e) => {
    e.stopPropagation();
    if (saved) {
      removeFavorite(movie.id);
      toast({ title: movie.title + " olib tashlandi" });
    } else {
      addFavorite(movie.id);
      toast({ title: "⭐  " + movie.title + " saqlandi!" });
    }
  };

  return (
    <Card
      onClick={() => navigate("/movie/" + movie.id)}
      className="cursor-pointer overflow-hidden group hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-[0_16px_48px_rgba(0,0,0,.55),0_0_28px_rgba(56,189,248,.08)]"
    >
      {/* poster area */}
      <div className="h-60 relative overflow-hidden bg-surface-3 flex items-center justify-center text-5xl select-none">
        <span className="transition-transform duration-300 group-hover:scale-110">{movie.emoji}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-2/80 via-transparent to-transparent pointer-events-none" />

        {/* rating chip */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-brand/20 text-brand-light text-[11px] font-bold">
          <Star size={9} fill="currentColor" /> {movie.rating}
        </div>

        {/* fav button */}
        <button
          onClick={onFav}
          className={cn(
            "absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-200",
            saved
              ? "bg-brand/20 border-brand text-brand"
              : "bg-black/50 border-white/8 text-slate-400 hover:bg-brand/15 hover:border-brand hover:text-brand hover:scale-110"
          )}
        >
          <Star size={12} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* info */}
      <div className="px-4 pt-3 pb-4">
        <p className="font-semibold text-sm text-slate-100 truncate">{movie.title}</p>
        <p className="text-xs text-slate-500 mt-0.5 mb-1">{movie.year} · {movie.duration}</p>
        <p className="text-[11px] text-slate-600 truncate mb-3">{movie.genre.join(" · ")}</p>
        <div className="h-0.5 rounded-full bg-surface-4 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-accent-mint to-brand" style={{ width: pct + "%" }} />
        </div>
      </div>
    </Card>
  );
}
