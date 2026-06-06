
const LanguageSelector = ({ selectedLangExt, availableLanguages, setSelectedLangExt, isLoadingLanguages }) => {

  const languageChangeHandler = (e) => {
    setSelectedLangExt(e.target.value);
  }

  if (isLoadingLanguages) {
    return (
      <div className="mb-3">
        <div className="h-10 bg-gray-300 rounded-lg animate-pulse w-32"></div>
      </div>
    );
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
        className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white shadow-md focus:outline-none focus:ring-0 focus:ring-grey-400"
      >
        {Object.entries(availableLanguages).map(([ext, lang]) => (   // convert the object into Arrays 
          <option key={ext} value={ext} >
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
