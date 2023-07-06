
import { AdminAddForm } from "./AdminAddForm";
import { AdminProducts } from "./AdminProducts";
import { useSelector } from "react-redux";

//materials


import { OrderAdmin } from "../../components/orderAdmin";
import { MarksAdmin } from "../../components/marksAdim";

export const AdminDashboard = () => {
  const { whatShow } = useSelector((store) => store.admin);


 
  return (
    <main className="flex w-full bg-bgcolor md:min-h-screen items-center">
     
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
              <div className="container mx-auto py-16 px-6 lg:px-16">
                <div className="mt-10 grid grid-cols-3 gap-8">
                    <AdminAddForm />
                    <AdminProducts />       
                </div>
              </div>
            )
          }
      
    </main>
  );
};
