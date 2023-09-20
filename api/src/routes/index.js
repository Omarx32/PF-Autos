const express = require("express");
const router = express.Router();

const mpRoutes = require("./MpRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const productCreate = require("./productCreateRoute");
const usersRoutes = require("./usersRoutes");
const brandHandler = require("./brandRoutes");
const filterCatRoutes = require("./filterCatRoutes");
const filterBrandsRouter = require("./filterBrandsRouter");
const reviewRoutes=require("./reviewRoutes")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/product", productRoutes);
router.use("/create", productCreate);
router.use("/category", categoryRoutes);
router.use("/users", usersRoutes);
router.use("/brand", brandHandler);
router.use("/filt", filterCatRoutes);
router.use("/filt/brand", filterBrandsRouter);
router.use("/mp", mpRoutes);
router.use("/create/review", reviewRoutes)

module.exports = router;
