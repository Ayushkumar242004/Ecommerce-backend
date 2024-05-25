const productService=require("../services/product.service")

const createProduct=async(req,res)=>{
    try{
        const product=await productService.createProduct(req.body);
        return res.status(200).send(product);
    }
    catch{  
        return res.staatus(500).send({error:error.message});
    }
}

const deleteProduct=async(req,res)=>{
    try{
        const product=await productService.deleteProduct(req.body);
        return res.status(200).send(product);
    }
    catch{  
        return res.staatus(500).send({error:error.message});
    }
}

const updateProduct=async(req,res)=>{
    try{
        const product=await productService.updateProduct(productId,req.body);
        return res.status(200).send(product);
    }
    catch{  
        return res.staatus(500).send({error:error.message});
    }
}

const findProductById=async(req,res)=>{
    const productId=req.params.id;
    try{
        const product=await productService.findProductById(productId);
        return res.status(200).send(product);
    }
    catch{  
        return res.staatus(500).send({error:error.message});
    }
}

const getAllProducts=async(req,res)=>{
    const productId=req.params.id;
    try{
        const product=await productService.getAllProducts(req.query);
        return res.status(200).send(products);
    }
    catch{  
        return res.staatus(500).send({error:error.message});
    }
}

const createMultipleProducts=async(req,res)=>{
    const productId=req.params.id;
    try{
        const product=await productService.createMutltipleProducts(req.body);
        return res.status(200).send({message:"Products are created successfully"});
    }
    catch{  
        return res.staatus(500).send({error:error.message});
    }
}

module.exports={
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts,
    createMultipleProducts,
    createProduct
}