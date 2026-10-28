import { useLanguage } from '../LanguageContext.jsx';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button 
      onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
      style={{ background: 'none', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '15px', cursor: 'pointer' }}
    >
      {lang === 'ru' ? 'English' : 'Русский'}
    </button>
  );
}
