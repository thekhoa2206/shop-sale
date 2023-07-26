const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, sellerCheck } = require("../middlewares/auth");

// controller
const {
    create,
    listAll,
    remove,
    read,
    update,
    list,
    productsCount,
    productStar,
    listRelated,
    searchFilters,
    listCurrentUserProducts
  } = require("../controllers/product");

// routes
router.post("/product", authCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, update);
router.get("/products-created/:count", authCheck, sellerCheck, listCurrentUserProducts);

router.post("/products", list);

// rating
router.put("/product/star/:productId", authCheck, productStar);

// related
router.get("/product/related/:productId", listRelated);

// search
router.post("/search/filters", searchFilters);


module.exports = router;
