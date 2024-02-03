import "./NotFound.css";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="error-page">
      <div className="error-page__container">
        <div>
          <h1 className="error-page__title">404</h1>
          <p className="error-page__text">Страница не найдена</p>
        </div>
        <Link className="error-page__link" onClick={() => navigate(-1)}>Назад</Link>
      </div>
    </section>
  );
};