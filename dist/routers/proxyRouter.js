"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proxyController_1 = require("../controllers/proxyController");
const router = (0, express_1.Router)();
router.get('/score', proxyController_1.proxyScoreController);
exports.default = router;
