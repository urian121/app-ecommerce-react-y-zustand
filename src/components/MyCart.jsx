const MyCart = ({ toggleOffcanvas, getTotalProducts, balanceo }) => {
  // La clase se agrega dependiendo del valor de balanceo
  const buttonClass = `btn cart-badge position-relative ms-auto me-3 swing-on-hover ${
    balanceo ? "balanceo" : ""
  }`;

  return (
    <button type="button" onClick={toggleOffcanvas} className={buttonClass}>
      <i className="bi bi-bag-heart"></i>
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {getTotalProducts()}
        <span className="visually-hidden">productos en el carrito</span>
      </span>
    </button>
  );
};

export default MyCart;
