const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const paymentRoutes = require("../routes/payment.routes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const productCreate = require("./productCreateRoute");
const usersRoutes = require("./usersRoutes");
const brandHandler = require("./brandRoutes");
const filterCatRoutes = require("./filterCatRoutes");
const filterBrandsRouter = require("./filterBrandsRouter");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/product", productRoutes);
router.use("/create", productCreate);
router.use("/category", categoryRoutes);
router.use("/users", usersRoutes);
router.use("/brand", brandHandler);
router.use("/filt", filterCatRoutes);
router.use("/filt/brand", filterBrandsRouter);
router.use("/payment", paymentRoutes);
module.exports = router;
