import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { UpadateOrderPending } from "../../auth/customerAuthSlice";


const initialState = {
  myOrderStatus: false,
  checkCartStatus: false,
  cartState: false,
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
  testQuant: 1,
  contact:'whatsapp',  
  central:{
    name:'Sequele',
    coordinates:[-8.889359001463491, 13.484934588357318]
  },  
  frete:null,
  selectedPlace:null,
  municipio:null,
  distrito:null,
  municipiosData:[
    ['Luanda',[-8.81325111124297, 13.221118923737603]],
    ['Icolo e Bengo',[-9.134046086451265, 13.85180583998985]],
    ['Quissama',[-9.80221127503039, 13.785082749208081]],
    ['Belas',[-9.08460689167123, 13.127493808981736]],
    ['Cacuaco',[-8.769686413771812, 13.374024727091367]],
    ['Cazenga',[-8.834847447077802, 13.295358763072393]],
    ['Viana',[-8.895269268278861, 13.349961594590395]],
    ['Kilamba Kiaxy',[-8.874350825594194, 13.25014362289606]],
    ['Talatona',[-8.90449613098244, 13.190319414290986]]
  ]
};

export const createOrder = createAsyncThunk(
  "cart/createOrder",
   async (dataobj,thunkAPI) => {
    let {customer}=thunkAPI.getState().customer
    let base_url='https://shop-backend-zejv.onrender.com/api/orders/create'
    console.log(dataobj)
    try {
      const response = await fetch(base_url,{
        method: "POST",
        body: JSON.stringify(dataobj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customer.token}`
        }
      }) 
      const data = response.json()
      if(response.ok){
        return true
      } else {
        return thunkAPI.rejectWithValue({
          error: data.error,
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
      
    }
   }
)


export const checkProductsCart = createAsyncThunk(
  "cart/checkProductsCart",
  async (dataObj, thunkAPI) => {
     const dataStr=dataObj.ids.reduce((total,value)=>`${total},${value}`)

     let base_url = "https://shop-backend-zejv.onrender.com/api/products/checkProducts?ids=";

   // let base_url = "https://goodal-mern.onrender.com/api/products";

    try {
  


      console.log(base_url + dataStr);
      console.log(dataStr)
      const response = await fetch(base_url + dataStr,{
        method:'GET'
      });
      const data = await response.json();
      console.log(data)

      if (response.ok) {
    
        return  data
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const distanceToCenter = (coordinates,state ) => {
  return ((state.central.coordinates[0]-coordinates[0])**2+(state.central.coordinates[1]-coordinates[1])**2)**1/2
 }

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setMunicipioAndDistrito: (state, action)=>{
      if (action.payload.municipio){
        state.municipio = action.payload.municipio;
      }
      if (action.payload.distrito){
        state.distrito = action.payload.distrito;
      }
    },
    setContact:(state, action) =>{
      state.contact=action.payload.contact
    },
    setPlaceAndfrete: (state, action) =>{
      state.selectedPlace=action.payload.selectedPlace
      let num= distanceToCenter(action.payload.selectedPlace.coordinates,state)
      let add=0

      //calculo maluco e aleatorio (gambiarra) do frete
      num=(Math.log10(num+1)*10**5).toFixed(0)
      num=num/100
      num = num.toFixed(0)
      add=num*100 
      if(add < 300){
        add=300
      }
      if(add > 1000){
        add=((5*10**3)*Math.log(add/500)-1000)/(Math.log10(3*add))
        add=add/100
        add=add.toFixed(0)
        if(add % 2 !== 0){
          add--
        }
        add*=100
        
            }
      state.frete=add

    },
    deleteDistrito:(state)=>{
     state.distrito=null
    },
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setAddItemToCartTwo: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        if (state.testQuant > 0) {
          if(state.cartItems[itemIndex].quantity < state.cartItems[itemIndex].stock){
          
            state.cartItems[itemIndex].quantity += state.testQuant;;
            toast.success("Carrinho atualizado");;
            }else{
                  
                state.cartItems[itemIndex].quantity = state.cartItems[itemIndex].stock;
                toast.error("Não há mais em estoque");
            }
        }

        
      } else {
        const temp = { ...action.payload, quantity: state.testQuant };
        state.cartItems.push(temp);

      toast.success(`${action.payload.name} Adicionado ao seu carrinho`);
      }

      state.testQuant = 1;

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setPreAdd: (state, action) => {
      const { stock } = action.payload
      if(state.testQuant < stock){
        
        state.testQuant += 1;
        toast.success("Quantidade do Item Aumentada");

      }else{
                  
        state.testQuant = stock;
        toast.error("Não há mais em estoque");
      }
    
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setPreDecrease: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].quantity > 1) {
        state.testQuant -= 1;
        toast.success("Quantidade do Item Diminuida");
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setAddItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      // -1 more than or equal 0
      if (itemIndex >= 0) {
        if(state.cartItems[itemIndex].quantity < state.cartItems[itemIndex].stock){
          
        state.cartItems[itemIndex].quantity += 1;
        toast.success("Quantidade do Item Aumentada");
        }else{
              
            state.cartItems[itemIndex].quantity = state.cartItems[itemIndex].stock;
            toast.error("Não há mais em estoque");
        }
      } else {
        const temp = { ...action.payload, quantity: 1 };
        state.cartItems.push(temp);

        toast.success(`${action.payload.name} adcionado ao seu carrinho`);
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setIncreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
        );

      if (itemIndex >= 0) {
        if(state.cartItems[itemIndex].quantity < state.cartItems[itemIndex].stock){
          
          state.cartItems[itemIndex].quantity += 1;
          toast.success("Quantidade do Item Aumentada");
          }else{
                
              state.cartItems[itemIndex].quantity = state.cartItems[itemIndex].stock;
              toast.error("Não há mais em estoque");
          }
     
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setDecreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        toast.success("Quantidade do Item Diminuida");
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.cartItems = removeItem;

      toast.success(`${action.payload.name} removido do seu carrinho`);

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setMyOrderStatusFalse: (state) => {
      state.myOrderStatus=false


    },
    setClearCart: (state) => {
      state.cartItems = [];

      toast.success("Carrinho Apagado");

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setGetTotals: (state) => {
      let { totalAmount, totalQuantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          cartTotal.totalAmount += cartItem.price * cartItem.quantity;
          cartTotal.totalQuantity += cartItem.quantity;

          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQuantity: 0,
        }
      );

      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQuantity;

      ////////////////////////////////////////////////////////

      // let totalAmount = 0;
      // let totalQuantity = 0;

      // state.cartItems.forEach((cartItem) => {
      //   totalAmount += cartItem.quantity * cartItem.price;
      //   totalQuantity += cartItem.quantity;
      // });

      // state.cartTotalAmount = totalAmount;
      // state.cartTotalQuantity = totalQuantity;
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(createOrder.pending, (state) => {
        state.myOrderStatus = false
  
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.myOrderStatus = true
        state.cartState = false
        state.cartItems = [];
        toast.success("Encomenda feita com sucesso");
  
        localStorage.setItem("cart", JSON.stringify(state.cartItems));

        })
      .addCase(createOrder.rejected, (state, action) => {
        state.myOrderStatus = false
      })
      .addCase(checkProductsCart.fulfilled, (state, action) => {
          const { products, stock } = action.payload
          state.checkCartStatus = true //chamando para checKar o carrinho apenas uma no inicio e quando produtos são atualizados
        //se não estiver em stock remove e atualiza
         const removeItems  = state.cartItems.every((item)=>products.includes(item._id))
         if(!removeItems){
          state.cartItems = state.cartItems.filter((item) => products.includes(item._id))
          localStorage.setItem("cart", JSON.stringify(state.cartItems))
         }
         //se o stock mudar, mude é atualize
         const changeStock = state.cartItems.every((item)=>{
          
          const positionIndex = products.indexOf(item._id)
          if(positionIndex != -1){
            return stock[positionIndex] === item.stock
          }
          return true
        })
        if(!changeStock){

          state.cartItems=state.cartItems.map((item)=>{
            const positionIndex = products.indexOf(item._id)
              if(positionIndex != -1){
                if(stock[positionIndex] !== item.stock){
                  item.stock=stock[positionIndex]
                  if(item.quantity > stock[positionIndex]){
                
                    item.quantity=stock[positionIndex] 
                  }
                }
              }
              return item
            })
            
          localStorage.setItem("cart", JSON.stringify(state.cartItems))
    
        }
        
      })
      .addCase(checkProductsCart.rejected, (state, action) => {
        console.log(action.payload)
      });
    }
 })
export const {
  setOpenCart,
  setCloseCart,
  setAddItemToCart,
  setRemoveItemFromCart,
  setClearCart,
  setIncreaseItemQTY,
  setDecreaseItemQTY,
  setGetTotals,
  setPreAdd,
  setMyOrderStatusFalse,
  setPreDecrease,
  setAddItemToCartTwo,
  setMunicipioAndDistrito,
  deleteDistrito,
  setPlaceAndfrete,
  setContact
} = cartSlice.actions;
export default cartSlice.reducer;
