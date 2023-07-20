import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

//materials
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import {Button,Fade,} from '@mui/material';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from "react-redux";
import {
  setCloseCart,
  setOpenCart,
} from "../../features/customer/cart/cartSlice";

import Logo from "../../assets/logo.jpg";

// icons
import { HiMenuAlt2, HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";

import { Cart } from "../../pages/customer/cart/index.js";
import {  UpadateOrderPending, changeData, customerLogOut } from "../../features/auth/customerAuthSlice";
import {
  setFilterCategory,
  setSearch,
  setSortOrder,
} from "../../features/customer/product/productCustomerSlice";
import CancelMyOrder from "../deleteCustomerOrder";

const Navbar = () => {
  const location = useLocation();
 
  
  // Check if the user is on the products page
  const isProductsPage = location.pathname === "/products";

  const [navColor, setNavColor] = useState(false);

  const [mobileNav, setMobileNav] = useState(false);
  const [sortNav, setSortNav] = useState(false);
  const [filterNav, setFilterNav] = useState(false);
  const [searchNav, setSearchNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();
  const { cartState, cartTotalQuantity,myOrderStatus } = useSelector((store) => store.cart);
  const { customer, orderPending, ordersStatus} = useSelector((store) => store.customer);
  const { products, search, categoryStatic } = useSelector((store) => store.productsCustomer);
  //change data
  const [showInput,setShowInput]= useState(null)
  let [number, setNumber] = useState(customer?.numberPhone)
  const [firstName, setFirstName] = useState(customer?.firstName)
  const [lastName, setLastName]=useState(customer?.lastName)
  //modal user
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputStyle='bg-gray-300 outline-indigo-300 p-2 m-3 rounded-sm'
  const [isValidPhoneNumber,setIsValidatorNumber]=useState(true) 
  const Update=()=>{
    if(showInput==='name'){
      console.log('oi')
      dispatch(changeData({
        firstName,
        lastName
      }))
      //setShowInput(null)

    }
    if(showInput==='number'){
      if(number.toString().length===9){
          dispatch(changeData({
        numberPhone:Number(number)
      }))
      }else{setIsValidatorNumber(false)}
     
      //setShowInput(null)
   
    }
   
  }
  // mobile dropdown
  const handleDropdown = () => {
    setDropdown(!dropdown);

    setMobileNav(false); // hide mobile nav when filter nav is shown
    setSearchNav(false);
    setFilterNav(false); // hide filter nav when mobile nav is shown
    setSortNav(false); // hide sort nav when mobile nav is shown
  };

  // mobile nav
  const handleMobileNav = () => {
    setMobileNav(!mobileNav);

    setSearchNav(false);
    setFilterNav(false); // hide filter nav when mobile nav is shown
    setSortNav(false); // hide sort nav when mobile nav is shown
    setDropdown(false);
  };

  // mobile filterNav
  const handleFilterNav = () => {
    setFilterNav(!filterNav);

    setMobileNav(false); // hide mobile nav when filter nav is shown
    setSearchNav(false);
    setSortNav(false); // hide sort nav when filter nav is shown
    setDropdown(false);
  };

  // mobile sortNav
  const handleSortNav = () => {
    setSortNav(!sortNav);

    setMobileNav(false); // hide mobile nav when sort nav is shown
    setSearchNav(false);
    setFilterNav(false); // hide filter nav when sort nav is shown
    setDropdown(false);
  };
  const changeNumber=(event)=>{
    const numberPhone=event.target.value
    const IsValidPhone=/^\d+$/.test(numberPhone);
    let phoneOnly=numberPhone.replace('+244','')
    if(IsValidPhone){
      setNumber(phoneOnly)
    }
    

  }
  // mobile searchNav
  const handleSearchNav = () => {
    setSearchNav(!searchNav);

    setMobileNav(false);
    setFilterNav(false);
    setSortNav(false);
    setDropdown(false);
  };

  const onClickCat = (cat) => {
    dispatch(setFilterCategory(cat));

    handleFilterNav();
  };

  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  // cart nav
  const handleCartNav = () => {
    if (cartState) {
      dispatch(
        setCloseCart({
          cartState: false,
        })
      );

      // document.body.style.overflow = "unset";
    } else {
      dispatch(
        setOpenCart({
          cartState: true,
        })
      );

      // if (typeof window != "undefined" && window.document) {
      //   document.body.style.overflow = "hidden";
      // }

      setMobileNav(false);
      setSearchNav(false);
      setFilterNav(false);
      setSortNav(false);
      setDropdown(false); 
    }
  };

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };
  


  useEffect(()=>{
    if((ordersStatus=='idle' && customer)|| myOrderStatus){
      
      dispatch(UpadateOrderPending())
    }
  },[ordersStatus,dispatch,customer,myOrderStatus])
  useEffect(() => {
    
    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const handleLogout = () => {
    dispatch(customerLogOut());
  };

  return (
    <>
      <header
        className={`${
          navColor ? "border-b border-zinc-200 bg-bgcolor" : "bg-bgcolor2"
        } fixed z-40 w-full transition duration-200 ease-in-out`}
      >
        <nav className="container mx-auto ">
          <div className="flex items-center justify-between  py-4 px-6 lg:px-16">
            <div className="flex items-center justify-center space-x-3 md:hidden">
              {/* mobile nav logo*/}
              <div
                onClick={handleMobileNav}
                className="cursor-pointer text-2xl"
              >
                <HiMenuAlt2 />
              </div>

              {/* mobile search logo*/}
              <div onClick={handleSearchNav} className="cursor-pointer text-xl">
                <FiSearch />
              </div>
            </div>

            {/* website logo */}
            <div>
              <NavLink
                onClick={() => {
                  if (dropdown) {
                    handleDropdown();
                  }

                  setMobileNav(false);
                  setSearchNav(false);
                  setFilterNav(false);
                  setSortNav(false);
                }}
                to="/"
              >
                <img className="w-20" src={Logo} alt="logo" />
              </NavLink>
            </div>

            {/* nav links + cart logo */}
            <div className="flex items-center md:space-x-3">
              {/* about and products */}
              <ul className="hidden space-x-3 md:flex">
                {customer ? (
                  <li className="font-urbanist font-bold text-zinc-600">
                    <button
                      onClick={handleDropdown}
                      className="flex items-center space-x-0.5 transition duration-200 ease-in-out hover:text-primary"
                    >
                      <span>{customer.firstName}</span>
                      <IoIosArrowDown />
                    </button>

                    {dropdown && (
                      <div
                        className={`absolute z-10 mt-6 rounded-md shadow-md bg-${
                          navColor ? "bgcolor2" : "bgcolor"
                        } ring-1 ring-slate-400 transition duration-200 ease-in-out`}
                      >
                        <div className="py-1">
                          <div className="flex flex-col border-b border-slate-400 px-6 py-2">
                            <span className="text-base">Usuário</span>
                            <span 
                              className="text-sm font-medium">

                              {customer.email}
                            </span>
                            <button onClick={handleOpen} className="btn-secondary">Detalhes</button>
                            <Modal
                                  aria-labelledby="transition-modal-title"
                                  aria-describedby="transition-modal-description"
                                  open={open}
                                  onClose={handleClose}
                                  closeAfterTransition
                                  slots={{ backdrop: Backdrop }}
                                  slotProps={{
                                    backdrop: {
                                      timeout: 500,
                                    },
                                  }}
                                >
                                  <Fade in={open}>
                                    <div className='w-screen h-screen grid justify-center absolute content-center'>
                                      <div className='grid p-6 bg-white border-black border-solid border-2 h-min max-w-2xl rounded-md justify-center'>
                                      <button onClick={handleClose} className='justify-self-end'><CloseIcon /></button>
                                      <h2 className='text-2xl m-2 text-center font-bold text-white bg-gray-800 rounded-md'>
                                        PERFIL
                                      </h2>
                                      <div className="text-lg p-3">Nome: <strong>{customer.firstName} {customer.lastName}</strong> </div>
                                      {showInput==='name' && (
                                        <>
                                        <label 
                                          className="text-center"
                                          htmlFor="firstName">
                                            Primeiro:  
                                            <input 
                                              onChange={
                                                (e)=>setFirstName(e.target.value)
                                                }   
                                              type="text" 
                                              name="firstName"
                                              className={inputStyle} 
                                              value={firstName} /> 
                                        </label>
                                        <label htmlFor="lastName"  className="text-center margin-auto">
                                          Último:  
                                          <input onChange={
                                            (e)=>setLastName(e.target.value)
                                            } 
                                            type="text" 
                                            name="lastName" 
                                            value={lastName}
                                            className={inputStyle} 
                                            /> 
                                        </label>
                                        <div className="flex justify-around">
                                          <button className="btn-secondary bg-red-300" onClick={()=>setShowInput(null)}>Cancelar</button>
                                          <button className="btn-secondary " onClick={Update}>Confirmar</button>
                                          
                                        </div>
                                        </>
                                      )}
                                      <Button onClick={()=>setShowInput('name')}>Alterar Nome</Button>
                                      <div className='text-lg p-3'>Número de telefone: <strong>{customer.numberPhone}</strong></div>
                                      {showInput==='number' && (
                                        <>
                                        <input className={inputStyle} type="tel" pattern="(\+244)?9\d{8}"  value={number} onChange={changeNumber} />
                                        {!isValidPhoneNumber && (
                                          <small className="text-red-400">Número de telefone invalido </small>
                                        )}
                                        <div className="flex justify-around">
                                          <button className="btn-secondary bg-red-300" onClick={()=>setShowInput(null)}>Cancelar</button>
                                          <button className="btn-secondary" onClick={Update}>Confirmar</button>
                                          
                                        </div>
                                        </>
                                      )}
                                      <Button onClick={()=>setShowInput('number')} >Alterar Número</Button>
                                      <div className='text-lg p-3'>E-mail: <strong>{customer.email}</strong></div>

                                    
                                      </div>
                                    </div>
                                  
                                  </Fade>
                            </Modal>

                          </div>

                          {/* <NavLink
                            to="/customer/settings"
                            className="block px-6 py-2 transition duration-200 ease-in-out hover:text-primary"
                          >
                            Settings
                          </NavLink> */}

                          <button
                            onClick={handleLogout}
                            className="block w-full px-6 py-2 text-left transition duration-200 ease-in-out hover:text-primary"
                          >
                            Sair da conta
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ) : (
                  <>
                  
                    <li className="space-x-2 font-urbanist font-bold text-zinc-600">
                   
                      <button
                        onClick={handleDropdown}
                        className={`${
                          location.pathname === "/customer/signup" ||
                          location.pathname === "/customer/login"
                            ? "text-primary"
                            : null
                        } flex items-center space-x-0.5 transition duration-200 ease-in-out hover:text-primary`}
                      >
                        <span>Conta</span>
                        <IoIosArrowDown />
                      </button>

                      {dropdown && (
                        <div
                          className={`absolute z-10 mt-6 rounded-md shadow-md bg-${
                            navColor ? "bgcolor2" : "bgcolor"
                          } ring-1 ring-slate-400 transition duration-200 ease-in-out`}
                        >
                          <div className="py-1">
                         
                            <button
                              onClick={() => {
                                if (dropdown) {
                                  handleDropdown();
                                }
                              }}
                              className="block w-full text-center transition duration-200 ease-in-out hover:text-primary"
                            >
                              <NavLink
                                to="/customer/signup"
                                className={({ isActive }) =>
                                  isActive ? "text-primary px-6 py-2" : null
                                }
                              >
                                Cadastrar
                              </NavLink>
                            </button>

                            <button
                              onClick={() => {
                                if (dropdown) {
                                  handleDropdown();
                                }
                              }}
                              className="block w-full px-6 py-2 text-left transition duration-200 ease-in-out hover:text-primary"
                            >
                              <NavLink
                                to="/customer/login"
                                className={({ isActive }) =>
                                  isActive ? "text-primary" : null
                                }
                              >
                                Entrar
                              </NavLink>
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  
                  </>
                )}

                <li className="font-urbanist font-bold text-zinc-600 transition duration-200 ease-in-out hover:text-primary">
                  <NavLink
                    onClick={() => {
                      if (dropdown) {
                        handleDropdown();
                      }
                    }}
                    className={({ isActive }) =>
                      isActive ? "text-primary" : null
                    }
                    to="/about"
                  >
                     Sobre Nós
                  </NavLink>
                </li>
                <li className="font-urbanist font-bold text-zinc-600 transition duration-200 ease-in-out hover:text-primary">
                  <NavLink
                    onClick={() => {
                      if (dropdown) {
                        handleDropdown();
                      }
                    }}
                    className={({ isActive }) =>
                      isActive ? "text-primary" : null
                    }
                    to="/products"
                  >
                     Produtos
                  </NavLink>
                </li>
                
              </ul>
           
              <div className="flex items-center justify-center space-x-3 md:space-x-0">
                {/* mobile account logo*/}
                <div
                  onClick={handleDropdown}
                  className="cursor-pointer text-2xl md:hidden"
                >
                  <MdOutlineAccountCircle />
                </div>

                {/* mobile cart logo */}
                <div
                  onClick={handleCartNav}
                  className="relative flex cursor-pointer items-center justify-end text-xl text-zinc-600 hover:text-primary"
                >
                  <Badge badgeContent={cartTotalQuantity} color="primary">
                     <HiOutlineShoppingBag size={25} />

                  </Badge>
                  
                </div>
                {(orderPending && orderPending.length!==0 && customer) && 
                (
                <CancelMyOrder />
                  
                )
                }
                </div>
            </div>
          </div>

          {/* filter and sort nav */}
          {isProductsPage && (
            <div className="flex border-t border-zinc-200 text-sm md:hidden">
              <button
                onClick={handleFilterNav}
                className="flex w-full items-center justify-center space-x-2 border-r border-zinc-200 py-4 px-6 lg:px-16"
              >
                <RiFilterOffFill />
                <p>Filtro</p>
              </button>

              <button
                onClick={handleSortNav}
                className="flex w-full items-center justify-center space-x-2 py-4 px-6 lg:px-16"
              >
                <p>Sort by</p>
                <FaSort />
              </button>
            </div>
          )}
        </nav>

        {/* mobile search */}
        {searchNav && (
          <div className="container mx-auto border-t border-b border-zinc-200 py-3 px-6 md:hidden lg:px-16">
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-11 text-sm text-gray-900 focus:outline-none"
                placeholder="Search Products, etc..."
              />
            </div>
          </div>
        )}

        {/* mobile sort */}
        {sortNav && (
          <div className="container mx-auto border-t border-zinc-200 py-3 px-6 md:hidden lg:px-16">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  dispatch(setSortOrder("newest"));

                  handleSortNav();
                }}
              >
                Recente
              </button>
              <button
                onClick={() => {
                  dispatch(setSortOrder("oldest"));

                  handleSortNav();
                }}
              >
                Antigo
              </button>
            </div>
          </div>
        )}

        {/* mobile filter */}
        {filterNav && (
          <div className="container mx-auto border-t border-zinc-200 py-3 px-6 md:hidden lg:px-16">
            <div className="flex flex-col space-y-3">
              <button onClick={() => onClickCat("All")}>Todos</button>
       
         
              {products.categories?.map((cat) => (
                <button key={cat} onClick={() => onClickCat(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* mobile menu */}
        {mobileNav && (
          <div className="container mx-auto border-t border-b border-zinc-200 py-3 px-6 md:hidden lg:px-16">
            <ul className="font-urbanist font-bold text-zinc-600 transition duration-200 ease-in-out hover:text-primary">
              <li>
                <NavLink
                  onClick={handleMobileNav}
                  className={({ isActive }) =>
                    isActive ? "text-primary" : null
                  }
                  to="/about"
                >
                  Sobre Nós
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={handleMobileNav}
                  className={({ isActive }) =>
                    isActive ? "text-primary" : null
                  }
                  to="/products"
                >
                  Produtos
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {/* mobile account */}
        {customer ? (
          <>
            {dropdown && (
              <div className="container mx-auto border-t border-b border-zinc-200 py-3 px-6 md:hidden lg:px-16">
                <ul className="font-urbanist font-bold text-zinc-600 transition duration-200 ease-in-out hover:text-primary">
                  <li>
                    <div className="flex flex-col">
                      <span className="text-base">Cliente</span>
                      <span className="text-sm font-medium">
                        {customer.email}
                      </span>
                    </div>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Sair</button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            {dropdown && (
              <div className="container mx-auto border-t border-b border-zinc-200 py-3 px-6 md:hidden lg:px-16">
                <ul className="font-urbanist font-bold text-zinc-600 transition duration-200 ease-in-out hover:text-primary">
                  <li>
                    <NavLink
                      onClick={() => {
                        if (dropdown) {
                          handleDropdown();
                        }
                      }}
                      className={({ isActive }) =>
                        isActive ? "text-primary" : null
                      }
                      to="/customer/signup"
                    >
                      Cadastrar
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => {
                        if (dropdown) {
                          handleDropdown();
                        }
                      }}
                      className={({ isActive }) =>
                        isActive ? "text-primary" : null
                      }
                      to="/customer/login"
                    >
                      Entrar
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </header>

      <Cart handleCartNav={handleCartNav} />
    </>
  );
};

export default Navbar;
