
const LanguageSelector = ({ selectedLangExt, availableLanguages, setSelectedLangExt }) => {

  const languageChangeHandler = (e) => {
    setSelectedLangExt(e.target.value);
  }

  if (availableLanguages == null) {
    return (
      <div>
        <h1>No languages Available</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-start mb-3">
      <select
        value={selectedLangExt}
        onChange={languageChangeHandler}
        className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        {Object.entries(availableLanguages).map(([ext, lang]) => (   // convert the object into Arrays 
          <option key={ext} value={ext}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
