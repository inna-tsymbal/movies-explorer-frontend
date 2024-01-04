import './BurgerOpened.css';
import NavPanelRegistered from '../NavPanelRegistered/NavPanelRegistered';

const BurgerOpened = ({ burgerOpened, onCloseBurger }) => {
  return (
    <div className={burgerOpened ? "burger burger_opened" : "burger"}>
      <div className="burger__overlay" onClick={onCloseBurger}>
        <div className="burger__content" onClick={(evt) => evt.stopPropagation()}>
          <button className="burger__btn-close" onClick={onCloseBurger} type="button"/>
          <NavPanelRegistered />
        </div>
      </div>
    </div>
  );
};

export default BurgerOpened;
