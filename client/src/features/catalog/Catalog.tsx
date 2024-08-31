// import { Fragment } from "react/jsx-runtime";
import ProductList from "./ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent.tsx";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore.ts";
import { fetchProductsAsync, productSelectors } from "./catalogSlice.ts";


export default function Catalog() {
  const products=useAppSelector(productSelectors.selectAll);
  const dispatch=useAppDispatch();
  const {productsLoaded,status}=useAppSelector(state=>state.catalog);

  useEffect(() => {
    if(!productsLoaded)
      dispatch(fetchProductsAsync());
  }, [productsLoaded,dispatch]);

  if(status.includes('pending')) return <LoadingComponent message='Loading products...'/>
 
  
  return (
    <>
     <ProductList products={products}/>
    </>
  );
}