import { Link, useLocation } from "react-router-dom";
import { Star, Film } from "lucide-react";
import useFavoritesStore from "../store/useFavoritesStore";
import { cn } from "../lib/utils";

export default function Navbar() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const { pathname } = useLocation();

  const link = (to, label, icon) => (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all no-underline",
        pathname === to
          ? "text-brand bg-brand/10"
          : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
      )}
    >
      {icon}
      {label}
      {to === "/favorites" && (
        <span className={cn(
          "min-w-[20px] text-center text-[11px] font-bold px-1.5 py-px rounded-full transition-all",
          favorites.length > 0 ? "bg-brand text-surface-1" : "bg-surface-4 text-slate-500"
        )}>
          {favorites.length}
        </span>
      )}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-10 h-16 bg-surface-1/85 backdrop-blur-2xl border-b border-white/[0.06]">
      <Link to="/" className="flex items-center gap-1.5 no-underline group">
        <Film size={18} className="text-brand" />
        <span className="font-head text-2xl tracking-[3px] text-slate-200 group-hover:text-white transition-colors">
          KINO<span className="text-brand">KATALOGI</span>
        </span>
      </Link>

      <div className="flex gap-1">
        {link("/", "Bosh sahifa", null)}
        {link("/favorites", "Sevimlilar", <Star size={14} />)}
      </div>
    </nav>
  );
}
