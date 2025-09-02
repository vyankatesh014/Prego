import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";


const ProductCard = ({product}) => {
    const {currency, addToCart, removeFromCart, cartItems, navigate} = useAppContext();
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAddToCart = (e, productId) => {
        e.stopPropagation();
        if (isAnimating) return;
        
        setIsAnimating(true);
        const productImage = e.currentTarget.closest('.product-card').querySelector('.product-image');
        const cartIcon = document.querySelector('.nav-cart-icon');
        
        if (productImage && cartIcon) {
            const productRect = productImage.getBoundingClientRect();
            const cartRect = cartIcon.getBoundingClientRect();
            
            const flyingImage = productImage.cloneNode(true);
            Object.assign(flyingImage.style, {
                position: 'fixed',
                top: `${productRect.top}px`,
                left: `${productRect.left}px`,
                width: `${productRect.width}px`,
                height: `${productRect.height}px`,
                transition: 'all 0.5s ease-in-out',
                zIndex: '9999',
                pointerEvents: 'none'
            });
            
            document.body.appendChild(flyingImage);
            
            requestAnimationFrame(() => {
                Object.assign(flyingImage.style, {
                    top: `${cartRect.top}px`,
                    left: `${cartRect.left}px`,
                    width: '20px',
                    height: '20px',
                    opacity: '0',
                    transform: 'scale(0.2)'
                });
            });
            
            setTimeout(() => {
                document.body.removeChild(flyingImage);
                addToCart(productId);
                setIsAnimating(false);
            }, 500);
        } else {
            // If elements not found, just add to cart
            addToCart(productId);
            setIsAnimating(false);
        }
    };

    return product && (
        <div onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}} className="product-card border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="product-image group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                           <img key={i} className="md:w-3.5 w3" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt=""/>
                    ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                        {currency}{product.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price}</span>
                    </p>
                    <div onClick={(e) => { e.stopPropagation(); }} className="text-primary">
                        {!cartItems[product._id] ? (
                            <button 
                                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer" 
                                onClick={(e) => handleAddToCart(e, product._id)}
                                disabled={isAnimating}
                            >
                                <img src={assets.cart_icon} alt="cart_icon"/>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                <button onClick={() => {removeFromCart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => {addToCart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;