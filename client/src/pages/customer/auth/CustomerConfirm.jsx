import { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelConfirm } from "../../../features/auth/customerAuthSlice";
// image
import loginphoto from "../../../assets/loginphoto.jpg";
import { NavLink } from "react-router-dom";

export const CustomerConfirm = () => {
  const [codeConfirm, setcodeConfirm] = useState("");
  
  const dispatch = useDispatch();
  const { loading, errorSignUp, customerPending } = useSelector(
    (store) => store.customer
  );
  const handleCancel = async()=>{

    dispatch(cancelConfirm())
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(customerConfirm({email:customerPending.email,confirmationCode:codeConfirm}));
  };

  return (
    <main className="flex min-h-screen w-full items-center bg-bgcolor2">
      <div className="container mx-auto py-6 px-6 lg:px-16">
        <div className="mt-16 flex flex-col-reverse items-center justify-center gap-5 md:flex-row">
          <form
            className="flex w-full flex-col items-center gap-5 md:mr-20 md:w-1/3"
            onSubmit={handleSubmit}
          >
            <h3 className="mb-3 font-urbanist text-xl font-bold text-primary md:text-3xl">
              Confirme o seu e-mail
            </h3>
            <p className="text-center">Um código de confirmação foi enviado para o e-mail <strong>{customerPending.email}</strong></p>
            <input
              type="text"
              name="codeConfirm"
              value={codeConfirm}
              onChange={(e) => setcodeConfirm(e.target.value)}
              placeholder="Digite o código"
              className="w-full border border-gray-300 py-3 px-5 shadow-md focus:outline-none md:py-4 md:px-6 md:text-lg"
            />
            <button
              disabled={loading}
              className="w-full rounded-md bg-[#c6f6f8] py-2 px-5 font-urbanist font-extrabold text-secondary shadow-md ring-2 ring-[#abecee] transition duration-300 ease-in hover:bg-[#abecee] hover:text-primary md:py-3 md:px-6"
            >Confirmar
            </button>
            <input
              onClick={(e)=>handleCancel()}
              type="button"
              value='cancelar'
              disabled={loading}
              className="w-full rounded-md bg-red-400 py-2 px-5 font-urbanist font-extrabold text-secondary shadow-md ring-2 ring-red-600 transition duration-300 ease-in hover:bg-red-500 hover:text-primary md:py-3 md:px-6"
            />
            

            <div className="flex items-center justify-center space-x-2 font-urbanist text-base font-semibold text-gray-600">
              <h4>Voçê já tem uma conta?</h4>

              <NavLink
                to="/customer/login"
                className="underline transition duration-300 ease-in hover:text-primary"
              >
                Entrar
              </NavLink>
            </div>

            {errorSignUp && <div className="error">{errorSignUp}</div>}
          </form>

          <img
            className="h-64 w-64 object-cover md:h-[490px] md:w-[384px] md:border-l md:border-gray-300 md:pl-20"
            src={loginphoto}
            alt="/"
          />
        </div>
      </div>
    </main>
  );
};
