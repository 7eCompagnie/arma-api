import express from 'express'
import {deleteOperation, getOperation, getOperations, updateOperation} from "../controllers/operations.controller.js";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import {getGroupsOfOperation, createGroup} from "../controllers/groups.controller.js";

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

router.get('/', getOperations)
router.get('/:id', getOperation)
router.post('/:id', uploadOperation.single("image"), updateOperation)
router.delete('/:id', deleteOperation)

router.get('/:id/groups/', getGroupsOfOperation)
router.post('/:id/groups/', createGroup)

// TODO: Reworks routes:
/*
* /campaign/:campaignId/operations/ [GET]       -> get operations of specific campaign
* /campaign/:campaignId/operations/ [POST]      -> create operation in operation
* /operations/:id [GET]                         -> get specific operation
* /operations/:id [PATCH]                       -> update operation
* /operations/:id [DELETE]                      -> delete operation
* */

export default router