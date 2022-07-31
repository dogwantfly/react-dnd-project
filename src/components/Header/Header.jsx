


function Header({ item }) {
  return (
      <header>
        <div className="container">
          <div className="tabs">
            <input type="radio" id="radio-1" name="tabs" />
            <label className="tab" htmlFor="radio-1">Dashboard</label>
            <input type="radio" id="radio-2" name="tabs" />
            <label className="tab" htmlFor="radio-2">Stacking</label>
            <input type="radio" id="radio-3" name="tabs" />
            <label className="tab" htmlFor="radio-3">Marketplace</label>
            <span className="glider"></span>
          </div>
        </div>
      </header>
  );
}

export default Header;
