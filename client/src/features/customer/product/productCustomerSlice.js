import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  sortOrder: "",
  search: "",
  filterPrice:null,
  filterCategory: "All",
  page: 1,
  categoryStatic:[
    [
      "Perfumes",
      [
      "Perfumes masculinos",
      "Perfumes femininos",
      "Perfumes unissex",
      "Perfumes infantis",
      "Perfumes de luxo",
      "Perfumes com fragrâncias naturais",
      "Perfumes em miniatura"
      
      ]
    ],
    [
      "Cuidados com a pele",
      [
        "Limpeza facial",
        "Hidratantes faciais",
        "Cremes anti-idade",
        "Máscaras faciais",
        "Protetores solares",
        "Produtos para acne",
        "Óleos faciais",
        "Esfoliantes"
      ]
      
    ],
    [
      "Maquiagem",
      [
      "Base e corretivo",
      "Pó facial",
      "Blush e bronzer",
      "Sombras",
      "Máscaras de cílios",
      "Batons e gloss",
      "Delineadores",
      "Pincéis e acessórios de maquiagem"
    
      ]
      ],
    [   
    "Cuidados com o corpo",
    [
    "Loções corporais",
    "Óleos corporais",
    "Cremes hidratantes",
    "Esfoliantes corporais",
    "Gel de banho",
    "Desodorantes",
    "Produtos para banho", 
    "Produtos para depilação"
    
    ]
    ],
    [
    "Cabelos",
    [
      "Shampoos",
      "Condicionadores",
      "Máscaras capilares",
      "Óleos e séruns para cabelo",
      "Produtos para estilização", 
      "Tinturas e colorações capilares",
      "Escovas e pentes",
      "Produtos para cuidados específicos" 
      
    ]
    ],
    [
    "Fragrâncias para ambiente",
    [
      "Velas perfumadas",
      "Difusores de ambiente",
      "Sprays aromáticos",
      "Sachês perfumados",
      "Óleos essenciais"
      
    ]
    ],
    [
    "Acessórios",
    [
      "Necessaires",
      "Organizadores de maquiagem",
      "Espelhos",
      "Pincéis de maquiagem",
      "Aplicadores de perfume",
      "Borrifadores",
      "Acessórios para cabelo"
      
    ]
    ]
  ],
  productsStatus: "idle",
  products: {},
  error: null, // for errors
};

// READ products
export const readCustomerProducts = createAsyncThunk(
  "productsCustomer/readCustomerProducts",
  async (_, thunkAPI) => {
   
    const { sortOrder, search,filterPrice, filterCategory, page } =
      thunkAPI.getState().productsCustomer;

     let base_url = "https://shop-backend-zejv.onrender.com/api/products";

   // let base_url = "https://goodal-mern.onrender.com/api/products";

    try {
  
      const price= `&maxPrice=${filterPrice}`

      base_url = `${base_url}?page=${page}&sort=${sortOrder}${filterPrice ? price :''}&category=${filterCategory.toString()}&search=${search}`;

      console.log(base_url);

      const response = await fetch(base_url);
      const data = await response.json();



      if (response.ok) {
    
        return  data//.productsData.filter((product)=>product.stock >= 0);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const productCustomerSlice = createSlice({
  initialState,
  name: "productsCustomer",
  reducers: {
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFilterPrice:(state, action) =>{
      state.filterPrice=action.payload
    },
    setFilterCategory: (state, action) => {
      //processo de retirada do pai quando o filho existe
      let listCat=action.payload
      state.categoryStatic.map((element)=>{
        const fatherExist = listCat.includes(element[0])
        const sonExist=element[1].some((v)=>listCat.includes(v))
        if(fatherExist && sonExist){
          //eliminando o pai
          listCat=listCat.filter((value)=>value!==element[0])
        }
      }) 
      state.filterCategory = listCat;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // READ products
      .addCase(readCustomerProducts.pending, (state) => {
        state.productsStatus = "loading";
      })
      .addCase(readCustomerProducts.fulfilled, (state, action) => {
          state.productsStatus = "succeeded";
          state.products = action.payload;
          state.error = null;
    
      })
      .addCase(readCustomerProducts.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.error = action.payload.error;
      })
     
  },
});

export const { setSortOrder, setSearch,setFilterPrice,setFilterCategory, setPage } =
  productCustomerSlice.actions;
export default productCustomerSlice.reducer;
