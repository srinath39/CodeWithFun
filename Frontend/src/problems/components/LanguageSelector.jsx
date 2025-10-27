
const LanguageSelector = ({ selected, setSelected }) => {
  const languages = ["C++", "Python", "JavaScript", "Java"];

  return (
    <div className="flex justify-end mb-3">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        {languages.map((lang) => (
          <option key={lang}>{lang}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
