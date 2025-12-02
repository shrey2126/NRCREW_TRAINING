const FilterBar = ({ filters, onFilterChange }) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year -= 10) {
    years.push(year);
  }

  return (
    <div className="mb-8 flex flex-wrap gap-4 justify-center items-center">
      <div className="flex items-center gap-2">
        <label className="text-gray-400 text-sm font-semibold">Type:</label>
        <select
          value={filters.type}
          onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
          className="px-4 py-2 bg-slate-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 cursor-pointer hover:bg-slate-700"
        >
          <option value="">All</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-gray-400 text-sm font-semibold">Year:</label>
        <select
          value={filters.year}
          onChange={(e) => onFilterChange({ ...filters, year: e.target.value })}
          className="px-4 py-2 bg-slate-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 cursor-pointer hover:bg-slate-700"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}s
            </option>
          ))}
        </select>
      </div>

      {(filters.type || filters.year) && (
        <button
          onClick={() => onFilterChange({ type: '', year: '' })}
          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-all duration-300 text-sm font-semibold flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;
