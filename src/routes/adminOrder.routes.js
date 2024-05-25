const express=require("express")
const router=express.Router();

const orderController=require("../controller/adminOrder.controller");
const authenticate=require("../middleWare/authenticate")

router.get("/",authenticate,orderController.getAllOrders);
router.put("/:orderId/confirmed",authenticate,orderController.confirmedOrders);
router.put("/:orderId/ship",authenticate,orderController.shipOrders);
router.put("/:orderId/deliver",authenticate,orderController.delieverOrders);
router.put("/:orderId/cancel",authenticate,orderController.cancelledOrders);
router.put("/:orderId/delete",authenticate,orderController.deleteOrders);

module.exports=router;