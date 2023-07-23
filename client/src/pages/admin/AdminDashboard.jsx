
import { AdminAddForm } from "./AdminAddForm";
import { AdminProducts } from "./AdminProducts";
import { useDispatch, useSelector } from "react-redux";

//materials
import { OrderAdmin } from "../../components/orderAdmin";
import { MarksAdmin } from "../../components/marksAdim";
import { setWhatShow } from "../../features/auth/adminAuthSlice";

export const AdminDashboard = () => {
  const { whatShow } = useSelector((store) => store.admin);
  const dispatch= useDispatch()

  
  return (
    <main className="flex w-full bg-bgcolor min-h-screen items-center">
          {
            whatShow==='orders' && (
              <OrderAdmin />
            )
          }
          {
            whatShow==="coordinates" && (
              <MarksAdmin />
            )
          }

          {
            whatShow==='products' && (
              <div className="container mx-auto py-16 lg:px-16">
                <div className="mt-10 grid">
                    <button className="btn-primary absolute right-6 bg-green-300 " onClick={()=>dispatch(setWhatShow('createProduct'))}>Criar novo Produto</button>
                
                    <AdminProducts />       
                </div>
              </div>
            )
          }
          {
            whatShow==='createProduct' && (
              <div className="mt-24">
                
                <button className="btn-primary absolute right-6 bg-green-300 " onClick={()=>dispatch(setWhatShow('products'))}>Lista de produtos</button>
                <AdminAddForm />    
              </div>
            )
          }
      
    </main>
  );
};
