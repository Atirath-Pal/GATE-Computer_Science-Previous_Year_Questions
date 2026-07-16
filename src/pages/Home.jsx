import { Link } from 'react-router-dom';

function Home() {
  const gateYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans relative overflow-hidden flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Immersive Background Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Full-Screen Layout Wrapper */}
      <div className="w-full h-full px-6 py-8 md:px-12 md:py-12 flex flex-col gap-8 relative z-10 flex-1">
        
        {/* Top Navigation / Brand Bar */}
        <nav className="w-full flex items-center justify-between border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 font-black text-xl tracking-tighter text-white">
              G
            </div>
            <span className="text-xl font-black tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Gate<span className="text-indigo-500">CS</span>.io
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold tracking-wider uppercase text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Database Active
            </span>
          </div>
        </nav>

        {/* Immersive Dashboard Header */}
        <header className="w-full bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col gap-2 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              CRACK THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">GATE CS</span> GATEWAY
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
              Don't just read old PDFs. Interact with them. Experience full 65-question mock testing environments with integrated dynamic step-by-step logic sheets.
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-1 text-right">
            <span className="text-5xl font-extrabold text-indigo-400 tracking-tight">455+</span>
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Total Curated Questions</span>
          </div>
        </header>

        {/* Year Grid Section - EXPLODING ACROSS THE SCREEN */}
        <main className="flex flex-col gap-4 flex-1">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Select Archive Year
            </h2>
          </div>
          
          {/* Fully Responsive dynamic screen stretching layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-1 auto-rows-fr">
            {gateYears.map((year) => (
              <Link 
                key={year}
                to={`/gate/${year}`}
                className="group relative bg-slate-900/60 hover:bg-slate-950 border border-slate-800/80 hover:border-indigo-500 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl overflow-hidden active:scale-[0.98]"
              >
                {/* Neon Accent Glow on Hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="flex justify-between items-start z-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">
                      Interactive Simulator
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1 group-hover:text-indigo-400 transition-colors">
                      GATE {year}
                    </h3>
                  </div>
                  <div className="h-7 px-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-slate-400 flex items-center justify-center group-hover:border-indigo-500/30 group-hover:text-white transition-all">
                    65 Qs
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors z-10">
                  <span>Launch Workspace</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 text-indigo-400 text-base">
                    ➔
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>

      {/* Cyberpunk Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/80 backdrop-blur-md px-6 py-4 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 z-20">
        <div>&copy; 2026 GATE CS PYQ Hub. Built for absolute speed.</div>
        <div className="flex gap-4 font-semibold">
          <span className="hover:text-indigo-400 cursor-pointer transition-colors">Syllabus Breakdown</span>
          <span className="text-slate-800">|</span>
          <span className="hover:text-indigo-400 cursor-pointer transition-colors">Documentation</span>
        </div>
      </footer>

    </div>
  );
}

export default Home;