import express from "express"
import { addAdmin, adminLogin, getAdmin } from "../controllers/admin-con.js";

const adminRouter = express.Router();

// adminRouter.get("/", getAllUsers)
adminRouter.post("/signup", addAdmin)
adminRouter.post("/login", adminLogin)
adminRouter.get("/", getAdmin)

export default adminRouter;