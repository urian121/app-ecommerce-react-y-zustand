import { useEffect, useMemo, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import useCartStore from "./store/cartStore";
import useOffcanvasStore from "./store/offcanvasStore";
import useTotalStore from "./store/totalProductStore";
import useBalanceStore from "./store/balanceStore";
import useSizeFilterStore from "./store/sizeFilterStore";

import ProductsList from "./components/ProductsList";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import SidebarOffCanvas from "./components/SidebarOffCanvas";
import SizeFilter from "./components/SizeFilter";
import useFetch from "./hooks/useFetch"; // Importar el custom hook
import TitleTypeWriter from "./components/TitleTypeWriter";

const App = () => {
  // Llama a `useCartStore` para acceder al estado del carrito y las funciones
  const { cart } = useCartStore();
  const { getTotalProducts } = useTotalStore();
  const { toggleBalanceo } = useBalanceStore();
  const { isVisible, toggleOffcanvas } = useOffcanvasStore();

  // Referencia para usar con react-top-loading-bar
  const ref = useRef(null);
  const { selectedSizes } = useSizeFilterStore();

  // Usar el hook useFetch para obtener los productos
  const { data: products, loading, error } = useFetch("/json/products.json");

  // UseEffect para manejar el estado de balanceo
  useEffect(() => {
    if (cart.length > 0) {
      const totalProductsBalanceo = getTotalProducts(cart); // Calcula los productos únicos
      console.log("Se esta ejecutando");
      // Si no está visible el carrito, lo abre y activa la animación de balanceo
      if (!isVisible) {
        toggleOffcanvas(true);
      }

      if (totalProductsBalanceo > 0) {
        toggleBalanceo(true); // Activa la animación
      }
    }
  }, [cart, getTotalProducts, toggleBalanceo, toggleOffcanvas]); // Escucha cambios en el carrito

  // Filtrar productos por talla seleccionada
  const filteredProducts = useMemo(() => {
    if (!selectedSizes.length) return products; // Si no hay tallas seleccionadas, devolver todos los productos

    return products.filter(
      (product) =>
        selectedSizes.some((size) => product.availableSizes.includes(size)) // Filtrar si el producto tiene alguna talla seleccionada
    );
  }, [selectedSizes, products]); // Dependemos tanto de `selectedSizes` como de `products`

  // Obtener el total de productos filtrados usando useMemo
  const totalFiltered = useMemo(() => {
    // Si no hay filtros aplicados, mostrar el total de productos
    if (selectedSizes.length === 0) {
      return products?.length || 0; // Devuelve 0 si no hay productos
    }
    // Si hay filtros, mostrar el total de productos filtrados
    return filteredProducts.length;
  }, [selectedSizes, filteredProducts, products]);

  return (
    <>
      <Nav />

      <div className="container mt-5 mb-5">
        <TitleTypeWriter />

        <div className="row">
          {/* Columna del Filtro */}
          <div className="col-md-2">
            <SizeFilter products={products} totalFiltered={totalFiltered} />
          </div>

          {/* Columna de Productos */}
          <div className="col-md-10">
            <LoadingBar color="#ff9c08" ref={ref} shadow={true} />
            {loading ? (
              <h2 className="text-center">Cargando productos...</h2>
            ) : error ? (
              <h2 className="text-center">
                Error cargando productos: {error.message}
              </h2>
            ) : filteredProducts.length > 0 ? (
              <ProductsList products={filteredProducts} />
            ) : (
              <p className="text-center">No hay productos.</p>
            )}
          </div>
        </div>
      </div>

      {/* Mostrar el SidebarOffCanvas, carrito de compras */}
      {isVisible && <SidebarOffCanvas />}

      <Footer />
    </>
  );
};

export default App;
