const mongoose=require('mongoose');

const cartItemSchema=new mongoose.Schema({
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cart',
        required:true,
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true,
    },
    size:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },

    discountPrice:{
        type:Number,
        required:true,
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    
})

const CartItem=mongoose.model('cartItems',cartItemsSchema);

module.exports= CartItem;