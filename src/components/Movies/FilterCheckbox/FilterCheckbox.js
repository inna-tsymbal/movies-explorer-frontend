import "./FilterCheckbox.css";

export default function FilterCheckbox({ isCheck, changeShort }) {
  
  return (
    <div className="checkbox">
      <div
        className={`checkbox__click ${
          isCheck ? "checkbox__click_active" : ""
        }`}
        onClick={() => changeShort()}
        
      >
        <span className="checkbox__tumb"></span>
      </div>
      <p className="checkbox__subtitle">Короткометражки</p>
    </div>
  );
}