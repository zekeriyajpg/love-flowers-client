import { useEffect, useState } from "react";
import "./App.css";

// __define-ocg__
export default function App() {
  const [cicekler, setCicekler] = useState([]);
  const [sayac, setSayac] = useState(0);

  const renkler = ["#FFD1DC", "#CDEAFF", "#D7F9D0", "#FFF3B0", "#EBD4FF"];
  const varOcg = "kasımpatı"; // Türkçe değişken

  const tikla = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const yeni = {
      id: Date.now() + Math.random(),
      x,
      y,
      renk: renkler[Math.floor(Math.random() * renkler.length)],
      tur: varOcg,
    };

    setCicekler((once) => {
      const next = [...once, yeni];
      return next.length > 120 ? next.slice(next.length - 120) : next;
    });
    setSayac((s) => s + 1);
  };

  // 12 saniye sonra silinsin
  useEffect(() => {
    if (cicekler.length === 0) return;
    const son = cicekler[cicekler.length - 1];

    const timer = setTimeout(() => {
      setCicekler((once) => once.filter((c) => c.id !== son.id));
    }, 12000);

    return () => clearTimeout(timer);
  }, [cicekler]);

  return (
    <div className="ekran" onClick={tikla}>
      <div className="ust">
        <div className="sayac">Açan çiçek: {sayac}</div>
      </div>

      {cicekler.map((c) => (
        <div
          key={c.id}
          className="cicek"
          style={{ left: c.x, top: c.y, "--renk": c.renk }}
        >
          <div className="merkez" />
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="yaprak" style={{ "--i": i }} />
          ))}
        </div>
      ))}
    </div>
  );
}