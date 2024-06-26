const Cart=require("../models/cart.model");
const Product=require("../models/product.model");
const CartItem=require("../models/cartItem.model")
async function createCart(user){
    try{
        const cart=new Cart({user});

        const createdCart=await cart.save();

        return createdCart;
    }
    catch(error)
    {
        throw new Error(error.message);
    }
    
}

async function findUserCart(userID) {
    try {
      let cart = await Cart.findOne({ user: userID });
  
      let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
  
      cart.cartItems = cartItems;
      let totalPrice = 0;
      let totalDiscountedPrice = 0;
      let totalItem = 0;
  
      for (let cartItem of cart.cartItems) {
        totalPrice += cartItem.price;
        totalDiscountedPrice += cartItem.discountedPrice;
        totalItem += cartItem.quantity;
      }
  
      cart.totalPrice = totalPrice;
      cart.totalItem = totalItem;
      cart.discount = totalPrice - totalDiscountedPrice;
  
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function addCartItem(userId, req) {
    try {
        // Ensure req has necessary properties
        if (!req.productId || !req.size) {
            throw new Error('Invalid request data');
        }

        // Find the cart for the user
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        // Find the product by ID
        const product = await Product.findById(req.productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // Check if the product is already in the cart
        const isPresent = await CartItem.findOne({
            cart: cart._id,
            product: product._id,
            userId
        });

        // If the item is not present, add it to the cart
        if (!isPresent) {
            console.log('Before creating cart item');
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                size: req.size,
                discountedPrice:product.discountedPrice
            });

            console.log('Cart item created:', cartItem);
            console.log('Before saving cart item');

            const createdCartItem = await cartItem.save();
            console.log('Cart item saved:', createdCartItem);
            console.log('Before updating cart');

            cart.cartItems.push(createdCartItem);
            await cart.save();

            console.log('Cart updated');

            return 'Item added to cart';
        } else {
            return 'Item already in cart';
        }
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports={createCart,findUserCart,addCartItem};