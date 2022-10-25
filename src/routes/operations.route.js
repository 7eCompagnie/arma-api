import express from 'express'
import {deleteOperation, getOperation, getOperations, updateOperation} from "../controllers/operations.controller.js";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import {getGroupsOfOperation, createGroup} from "../controllers/groups.controller.js";
import {isSigned} from "../middlewares/auth.middleware.js";

const router = express.Router()

const storage = multer.diskStorage({
    destination: 'uploads/operations',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

const uploadOperation = multer({storage: storage});

router.get('/', isSigned, getOperations)
router.get('/:id', isSigned, getOperation)
router.post('/:id', isSigned, uploadOperation.single("image"), updateOperation)
router.delete('/:id', isSigned, deleteOperation)

router.get('/:id/groups/', isSigned, getGroupsOfOperation)
router.post('/:id/groups/', isSigned, createGroup)

export default router