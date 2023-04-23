import { AdminAddForm } from "./AdminAddForm";
import { AdminProducts } from "./AdminProducts";

export const AdminDashboard = () => {
  return (
    <main className="min-h-screen w-full bg-bgcolor2">
      <div className="container mx-auto py-6 px-6 lg:px-16">
        <div className="mt-20 grid grid-cols-3">
          <AdminAddForm />
          <AdminProducts />
        </div>
      </div>
    </main>
  );
};
