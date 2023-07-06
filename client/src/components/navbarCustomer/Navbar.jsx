import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

//materials
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import {DialogTitle,DialogContentText,DialogContent,DialogActions,Dialog,TextField,Button,Fade,} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import Popover from '@mui/material/Popover';

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
import DeleteIcon from '@mui/icons-material/Delete';

import { Cart } from "../../pages/customer/cart/index.js";
import { CancelOrder, UpadateOrderPending, changeData, customerLogOut } from "../../features/auth/customerAuthSlice";
import {
  setFilterCategory,
  setSearch,
  setSortOrder,
} from "../../features/customer/product/productCustomerSlice";

const Navbar = () => {
  const location = useLocation();
  //modal confirm
  const [textConfirm, setTextConfirm] = useState('')
  const [openConfirm, setOpenConfirm] = useState(null);

  const handleClickOpen = (key,OrderId) => {
    
    setOpenConfirm({key,OrderId});
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(null);
    setTextConfirm('')
  };
  //modal pending order
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOrder = () => {
    setAnchorEl(null);
  };

  const openOrder = Boolean(anchorEl);
  const id = openOrder ? 'simple-popover' : undefined;
  
  // Check if the user is on the products page
  const isProductsPage = location.pathname === "/products";

  const [navColor, setNavColor] = useState(false);

  const [mobileNav, setMobileNav] = useState(false);
  const [sortNav, setSortNav] = useState(false);
  const [filterNav, setFilterNav] = useState(false);
  const [searchNav, setSearchNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();
  const { cartState, cartTotalQuantity } = useSelector((store) => store.cart);
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
  // cancelar encomenda
  const cancelOrder=(idOrder) => {
    setOpenConfirm(null);
    setTextConfirm('')
    dispatch(CancelOrder(idOrder))
    window.location.reload(true);
    
    
  }

  useEffect(()=>{
    if(ordersStatus=='idle'){
      
      dispatch(UpadateOrderPending())
    }
  },[ordersStatus,dispatch])
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
                              className="block w-full px-6 py-2 text-left transition duration-200 ease-in-out hover:text-primary"
                            >
                              <NavLink
                                to="/customer/signup"
                                className={({ isActive }) =>
                                  isActive ? "text-primary" : null
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
                {(orderPending && orderPending.length!==0) && 
                (
                <>
                  <IconButton
                      aria-describedby={id} 
                      variant="contained" 
                      onClick={handleClick}
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit">
                      <Badge badgeContent={orderPending.length} color="success">
                        <NotificationsIcon />
                      </Badge>
                 </IconButton>
                 <Popover
                    classes='w-96'
                    id={id}
                    open={openOrder}
                    anchorEl={anchorEl}
                    onClose={handleCloseOrder}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    
                  <div className="w-96 h-auto">
                    {orderPending.map((oneOrder,k)=>( 
                    
                  <div key={`${oneOrder._Id} ${k}`} className="relative m-5 mt-10 bg-slate-200 rounded-md p-2
                  ">
                    
                    <div className="relative">
                      <span className="absolute -top-3 right-4 z-20">
                        <IconButton
                          onClick={() => handleClickOpen(k,oneOrder._Id)}
                          aria-label="delete" 
                          color="error">
                          <DeleteIcon fontSize='large' />
                        </IconButton>
                      </span>
                      <h1 className=" text-center font-semibold text-lg m-2 text-gray-600">Encomenda {k+1}</h1>
                      
                    
                      

                    </div>
                          
                        <span className="absolute opacity-70 top-0 left-4 bg-gray-800  rounded-md p-2 m-2 text-lg text-white text-bold z-20">{oneOrder.prices.priceTotal} Kz</span>
                        <div className=" m-2 p-2 h-32 overflow-y-auto border-solid border-{0.2} border-gray-400 shadow-inner shadow-gray-400 rounded-md" >
                        
                          {oneOrder.products.map((product,key)=>(
                       
                       
                        <div key={Math.log10(key)} className="flex justify-between m-4 font-semibold pr-2">
                       
                          <span>
                            {product.productId.name}
                          </span>
                          <span>
                            {product.quantity}
                          </span>
                          </div>
                      
                        ))}
                        </div>
                     </div>
                     
                    )
                  )}

                  </div>
                  </Popover>
                  {(openConfirm!==null) && (
                    <div>
                    <Dialog open={openConfirm!==null} onClose={handleCloseConfirm}>
                      <DialogTitle>Cancelar encomenda</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Para cancelares esta encomenda digite <strong>Encomenda {openConfirm.key + 1}</strong>
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          value={textConfirm}
                          onChange={(e)=>setTextConfirm(e.target.value)}
                          label="Digite aqui"
                          type="text"
                          fullWidth
                          color="error"
                          variant="standard"
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button color="warning" onClick={handleCloseConfirm}>Cancelar</Button>
                        <Button disabled={textConfirm!==`Encomenda ${openConfirm.key + 1}`} color="warning" onClick={()=>cancelOrder(openConfirm.OrderId)}>Confirmar</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  )}
                  
                </>
                  
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
                <p>Filter</p>
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
                Newest
              </button>
              <button
                onClick={() => {
                  dispatch(setSortOrder("oldest"));

                  handleSortNav();
                }}
              >
                Oldest
              </button>
            </div>
          </div>
        )}

        {/* mobile filter */}
        {filterNav && (
          <div className="container mx-auto border-t border-zinc-200 py-3 px-6 md:hidden lg:px-16">
            <div className="flex flex-col space-y-3">
              <button onClick={() => onClickCat("All")}>All</button>
       
         
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
                  About
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
                  Products
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
                      <span className="text-base">Customer</span>
                      <span className="text-sm font-medium">
                        {customer.email}
                      </span>
                    </div>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
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
                      Signup
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
                      Login
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
