/* eslint-disable jsx-a11y/anchor-is-valid */
import './ErrorPage.css';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <section className="error-page">
      <div className="error-page__container">
        <div>
          <h1 className="error-page__title">404</h1>
          <p className="error-page__text">Страница не найдена</p>
        </div>
        <a className="error-page__link" onClick={handleGoBack}>Назад</a>
      </div>
    </section>
  );
};