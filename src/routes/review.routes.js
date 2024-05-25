const express=require("express")
const router=express.Router();

const reviewController=require("../controller/review.controller");
const authenticate=require("../middleWare/authenticate")

router.post("/create",authenticate,reviewController.createReview);
router.get("/product/:productId",authenticate,reviewController.getAllReview);

module.exports=router;