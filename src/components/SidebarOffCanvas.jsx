const SidebarOffCanvas = ({ isVisible, toggleOffcanvas }) => {
  return (
    <div
      className={`offcanvas offcanvas-end px-1 ${
        isVisible ? "show offcanvas-open" : ""
      }`}
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      style={{ marginTop: "60px" }}
    >
      <div className="offcanvas-header">
        <h5
          className="offcanvas-title text-capitalize text-center fw-bold"
          id="offcanvasRightLabel"
        >
          Mi carrito de compras
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={toggleOffcanvas}
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="row align-items-center border-bottom">
          <div className="col-3">
            <img
              src="/public/img-product.png"
              alt="Apple iPad Mini 2 16GB"
              className="img-fluid"
            />
          </div>
          <div className="col-6">
            <h4 className="mb-1 title-product">Apple iPad Mini 2 16GB</h4>
            <p className="mb-0 detalles-product">
              An iPad like no other. 16GB, WiFi, 4G.
            </p>
          </div>
          <div className="col-3 text-end">
            <span className="h4 fw-bold">
              <span className="fs-6">2x</span>
              <strong className="fs-5">$458</strong>
            </span>
            <button className="btn btn-danger mt-2">
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="offcanvas-footer mt-3 px-2">
        <div className="d-flex justify-content-between align-items-center">
          <h5>
            <strong>SUBTOTAL:</strong>
            <span className="fw-bold">$2,930.00</span>
          </h5>
        </div>
        <button className="btn btn-comprar w-100">Finalizar compra</button>
      </div>
    </div>
  );
};

export default SidebarOffCanvas;
