import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar        from "./components/Navbar";
import HomePage      from "./pages/HomePage";
import DetailPage    from "./pages/DetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import { ToastProvider } from "./components/ui/toast";

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        {/* ambient blobs */}
        <div className="fixed -top-32 -left-20 w-[480px] h-[480px] rounded-full bg-brand/[0.04] blur-[100px] pointer-events-none" />
        <div className="fixed -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-accent-violet/[0.04] blur-[100px] pointer-events-none" />

        <div className="relative z-10 min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/"          element={<HomePage />}      />
            <Route path="/movie/:id" element={<DetailPage />}    />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}
