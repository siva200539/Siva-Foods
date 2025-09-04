  import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { deleteFromCart,updateQuantity } from '../redux/CartSlice';

const Cartpage = () => {
    const cartitems=useSelector((state)=>state.cart.cartItems);
    console.log(cartitems);
    const dispatch=useDispatch();

    
return (
    <section>
    <div className="BestSelllings">
        <h4 className='BestSellerHeader' >CART PRODUCTS</h4>
        <h6 className='BestSellerDes'>Grab our best products to brighten your day</h6>            
        <div class="container text-center" className='ProductContainer'>
          <div class="row">
            {
                cartitems.map((a)=>{
                    return(
                        <div className="image-item" key={a.id}>
                              <img src={a.img} alt="Noodles" />
                              <div className="cont">
                                <p>{a.title}</p>
                                <h2 className="price">{a.price}</h2>
                                <button className="btn" onClick={()=>dispatch(deleteFromCart(a))}>deleteFromCart +</button>
                                <h4>Quantity</h4>
                                {a.quantity}<span></span>
                                <button onClick={()=>dispatch(updateQuantity({id:a.id,quantity:a.quantity+1}))}>Increment</button>
                              </div>
                            </div>
                    )
                })
            }
          </div>
      </div>
    </div>  
    </section>
  )
}


export default Cartpage


