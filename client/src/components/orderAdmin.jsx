import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { readOrder , orderDone} from "../features/auth/adminAuthSlice";
import { CircularProgress, Pagination } from "@mui/material";
import { CancelOrder } from "../features/auth/customerAuthSlice";

import {DialogTitle,DialogContentText,DialogContent,DialogActions,Dialog,TextField,Button} from '@mui/material';

export const OrderAdmin=()=>{
    const { whatShow,loading, orders, ordersStatus } = useSelector((store) => store.admin);

  const [textConfirm, setTextConfirm] = useState('')
  const [openConfirm, setOpenConfirm] = useState(null);

  const handleClickOpen = (action,key,id) => {
    
    setOpenConfirm({action,key,id});
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(null);
    setTextConfirm('')
  };
  const myDates=(dateString)=>{
    const date=new Date(dateString)
    return [date.getDate(),date.getMonth() + 1, date.getFullYear(), date.getHours()]
  }
  const whatOrder=orders?.isDone ? 'done' : 'new'
  const dispatch = useDispatch()
  const [pags,setPags]=useState(10)
  const page=orders?.page
  const handleChange = (event, value) => {
    orders.isDone 
      ? dispatch(readOrder({page: value, done:true})) 
      : dispatch(readOrder({page: value})) 
    

    
  
  };
  const cancelOrder=(id)=>{
    dispatch(CancelOrder(id))
    window.location.reload(true)
  }
  const markDone=(id)=>{
    
    dispatch(orderDone(id))
    cao()
    //window.location.reload(true)
   //
  }
  const cao=()=>{
    if(!loading){
      dispatch(readOrder())
    }
  }
  
  useEffect(()=>{
  if(orders){
    setPags(Math.ceil(orders.total/orders.limit))

  }
},[orders,loading])
  useEffect(()=>{
    console.log(whatOrder)
    if(whatOrder==='new' && ordersStatus==='idle'){   
      dispatch(readOrder())
      }
  },[whatOrder,whatShow])
    return (
        <section className="grid w-screen mt-20">
        <nav className="flex w-screen justify-center">
          <button 
            className="btn-primary m-4" 
            onClick={()=>{dispatch(readOrder())}}>
                Novas</button>
          <button className="btn-primary m-4" onClick={()=>dispatch(readOrder({done:true}))}>Feitas</button>
        </nav>
          {
            whatOrder=='new' ? (
              <>
                <section className="grid justify-center w-screen">
                  <h2 className="text-center text-2xl font-bold "><span className="text-green-500 bg-slate-900 rounded-full p-5">{orders?.total}</span> Novas Encomendas </h2>
                  <aside className=" bg-slate-900 w-min max-w-[90vw] md:p-4 rounded-lg h-screen overflow-y-auto" >
                    {loading ? <CircularProgress /> : orders?.orderData.map((order,k)=>(
                      <aside key={order._id} className="grid bg-cyan-200 text-center justify-center md:w-96 m-3 md:m-4 p-4 rounded-lg md:text-lg text-semibold">
                        <h2 className="text-3xl text-bold text-green-600">Encomenda {k+1}</h2>
                      <p>Nome: {order.user?.firstName} {order.user?.lastName}</p>
                        <p>Número de telefone: {order.user?.numberPhone}</p>
                    
                        <p>Contacto: {order.contact}</p>
                        <p>E-mail: {order.user?.email}</p>
                        <p>Ponto de Encontro: {order.coordinates[0]} </p>
                      
                      <p>Coordenadas: [ {order.coordinates[1][0]} , {order.coordinates[1][1]} ]</p>
                         
                        <p>Data de Pedido: 
                          {myDates(order.createdAt)
                            .reduce((element,value,key)=>
                            key!=3?` ${element} - ${value}`:`${element} as ${value} horas`)} 
                        </p>
                        <p>Data de entrega: 
                          {myDates(order.orderDate)
                            .reduce((element,value,key)=>
                            key!=3?` ${element} - ${value}`:`${element}`)}</p>
                        <div className="rounded-lg h-30 overflow-y-auto bg-slate-800 text-white">
                          {order.products && order.products.map((product)=>(
                             <>
                             {
                                product.productId && (
                                  <aside className="border-green-800 border-solid border-2">
                                  <p>Produto: {product.productId.name}</p>
                          
                                  <p>{product.productId.price} Kz</p>
                                  <p>Quantidade: {product.quantity}</p>
                              
                                  </aside>
                                )
                              }
                            </>
                          )
                          )}
                        </div>
                        <p>frete: {order.frete} kz</p>
                        <p>Preço Total: {order.prices.priceTotal} Kz</p>
                        
                        <p>Valor Total: {order.prices.priceTotal + order.frete} Kz</p>
                        
                        <div className="flex justify-between w-full">
                          <button className="btn-primary bg-red-400 m-2 hover:bg-red-800 hover:text-white" onClick={()=>handleClickOpen('cancel',k+1,order._id)}>Cancelar</button>
                          <button className="btn-primary bg-green-400 m-2 hover:bg-green-700 hover:text-white" onClick={()=>handleClickOpen('done',k+1,order._id)}>Feito</button>
                        
                        </div>
                      </aside>
                    ))}
                    <div className="bg-white p-4 rounded-sm">
                      <Pagination count={pags} page={page} color="primary" onChange={handleChange}/>
                    </div>
                  </aside>
                </section>
                
              </>
            ) : (
              <>
              <section className="grid justify-center w-screen">
                <h2 className="text-center text-2xl font-bold "><span className="text-green-500 bg-slate-900 rounded-full p-5">{orders?.total}</span> Encomendas feitas </h2>
                <aside className=" bg-slate-900 w-min max-w-[90vw] md:p-4 rounded-lg h-screen overflow-y-auto" >
                   
                  {loading ? <CircularProgress /> : orders?.orderData.map((order)=>(
                  
                  <aside key={order._id} className="grid bg-slate-200 text-center justify-center md:w-96 m-3 md:m-4 p-4 rounded-lg md:text-lg text-semibold">
                   
                   <p>Nome: {order.user.firstName} {order.user.lastName}</p>
                        <p>Número de telefone: {order.user.numberPhone}</p>
                    
                        <p>Contacto: {order.contact}</p>
                        <p>E-mail: {order.user.email}</p>
                        <p>Ponto de Encontro: {order.coordinates[0]} </p>
                      
                        <p>Coordenadas: [ {order.coordinates[1][0]} , {order.coordinates[1][1]} ]</p>
                         
                        <p>Data de Pedido: 
                          {myDates(order.createdAt)
                            .reduce((element,value,key)=>
                            key!=3?` ${element} - ${value}`:`${element} as ${value} horas`)} 
                        </p>
                        <p>Data de entrega: 
                          {myDates(order.orderDate)
                            .reduce((element,value,key)=>
                            key!=3?` ${element} - ${value}`:`${element}`)}</p>
                        <div className="rounded-lg h-30 overflow-y-auto bg-slate-800 text-white">
                          {order.products.map((product)=>(
                          <>
                           {
                              product.productId && (
                                <aside className="border-green-800 border-solid border-2">
                                <p>Produto: {product.productId.name}</p>
                        
                                <p>{product.productId.price} Kz</p>
                                <p>Quantidade: {product.quantity}</p>
                            
                                </aside>
                              )
                            }
                          </>
                           
                           )
                           
                          
                          )
                          }
                        </div>
                        <p>frete: {order.frete} kz</p>
                        <p>Preço Total: {order.prices.priceTotal} Kz</p>
                        
                        <p>Valor Total: {order.prices.priceTotal + order.frete} Kz</p>
                        
                        
                    </aside>
                  ))}
                  <div className="bg-white p-4 rounded-sm">
                    <Pagination count={pags} page={page} color="primary" onChange={handleChange}/>
                  </div>
                </aside>
              </section>
              
            </>
            )
          }
          {(openConfirm!==null) && (
            <div>
            <Dialog open={openConfirm!==null} onClose={handleCloseConfirm}>
              <DialogTitle>{openConfirm.action==='done'?"Concluir":"Cancelar"} Encomenda</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Para {openConfirm.action==='done'?"concluir":"cancelar"}es esta encomenda digite 
                  <strong> {openConfirm.action==='done'?`Encomenda ${openConfirm.key} feita` : `Cancelar encomenda ${openConfirm.key}`} </strong>
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
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button color="warning" onClick={handleCloseConfirm}>Cancelar</Button>
                <Button 
                  disabled={textConfirm!==(openConfirm.action==='done'?`Encomenda ${openConfirm.key} feita` : `Cancelar encomenda ${openConfirm.key}`)}  
           
                  onClick={()=>{
                    openConfirm.action==='done' ? markDone(openConfirm.id) : cancelOrder(openConfirm.id)
                  }}
                  >
                    Confirmar</Button>
              </DialogActions>
            </Dialog>
          </div>
          )}
      </section>  
    )
} 