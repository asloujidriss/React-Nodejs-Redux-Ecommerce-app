import {createSlice} from '@reduxjs/toolkit'

const stateProducts = JSON.parse(localStorage.getItem('state')) 
	? JSON.parse(localStorage.getItem('state')).products
:[];
const stateTotalPrice = JSON.parse(localStorage.getItem('state'))
	? JSON.parse(localStorage.getItem('state')).pricetotal
	: 0;
const stateTotalQuantity = JSON.parse(localStorage.getItem('state'))
	? JSON.parse(localStorage.getItem('state')).quantitytotal
	: 0;


const cartSlice = createSlice({
    name:"cart",
    initialState: {
      products: [],
      pricetotal: 0,
      quantitytotal: 0,
      
    },
    reducers:{
      
        addToCart: (state, action)=>{
            if(state.products.findIndex((item)=> item.product._id === action.payload.product._id) !== -1){
                  const idx = state.products.findIndex(el=> el.product._id === action.payload.product._id )
                  if(state.products[idx].product.qte < 0) {
                    alert("stock finish");
                   } else {
                     state.products[idx].product.qte--;
                     state.products[idx].quantity=state.products[idx].quantity+ +action.payload.quantity ;
                     state.products[idx].price = state.products[idx].product.price * state.products[idx].quantity;
                   }
           
           
                } else  {
            state.products.push({
              
              product:action.payload.product,
              quantity :action.payload.quantity,
              price :action.payload.product.price * action.payload.quantity,
              size:action.payload.size,
              color:action.payload.color
            })
          }
        action.payload.product.qte = action.payload.product.qte - action.payload.quantity 
        state.quantitytotal += action.payload.quantity 
        state.pricetotal += action.payload.product.price * action.payload.quantity

        // localStorage.setItem("state", JSON.stringify(state));
        },
        deleteFromCart:(state,action)=>{
         
          state.products.map((p) => {
            if (p.product._id === action.payload.product._id) {
              const newProducts = state.products.filter((item) => item.product._id !== p.product._id);
               
              state.pricetotal = state.pricetotal - action.payload.price
              state.quantitytotal =  state.quantitytotal - action.payload.quantity

              state.products = newProducts;
              
            }
            // localStorage.setItem("state", JSON.stringify(state.state));
            // return state;
          });      
        },
        incrementQuantity: (state, action) => {

            const index = state.products.findIndex((item) => item.product._id === action.payload.product._id);
            if (state.products[index].product.qte === 0) {
              return alert("sorry stock of this product finished")
            }
           
            state.products[index].product.qte--;
            state.products[index].quantity++;
            state.products[index].price = state.products[index].product.price * state.products[index].quantity
      
             state.pricetotal = state.pricetotal+ +action.payload.product.price
              state.quantitytotal ++;
          // localStorage.setItem('state', JSON.stringify(state));

          },
          decrementQuantity: (state, action) => {
           
            const index = state.products.findIndex((item) => item.product._id === action.payload.product._id);
    
            if (state.products[index].quantity > 0) {
              state.products[index].product.qte++
              state.products[index].quantity -= 1;
              state.products[index].price = state.products[index].product.price * state.products[index].quantity

              state.pricetotal = state.pricetotal - action.payload.product.price
              state.quantitytotal --;

            } else if (state.products[index].quantity === 1) {
              const Newproducts = state.products.filter((item) => item.product._id !== action.payload.product._id);
              state.products = Newproducts;
    
            }
            // localStorage.setItem("state", JSON.stringify(state));
                  
          }, 
          clearCart:(state)=>{
            state.products=[]
            state.pricetotal=0
            state.quantitytotal=0
          }    
    }
    
})

export const {addToCart, deleteFromCart,incrementQuantity,decrementQuantity,clearCart} = cartSlice.actions

 export default cartSlice.reducer