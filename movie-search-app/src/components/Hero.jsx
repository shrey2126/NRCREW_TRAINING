const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text animate-fade-in">
          🎬 MovieFlix
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 animate-slide-up">
          Discover millions of movies, TV shows & more
        </p>
      </div>
    </div>
  );
};

export default Hero;
