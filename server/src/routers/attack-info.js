const express = require("express");
const { readFileSync } = require("fs");

const {
  responseByTypeSourceAttack
} = require("../business-logic/responseByTypeSourceAttack");

const {
  responseCyberAttackOptions
} = require("../business-logic/responseCyberAttackOptions");

const AttackSourceTypes = require("../models/attackSourceTypes");

const NodeCache = require("node-cache");
const myCache = new NodeCache();
const router = new express.Router();

const apiURL = "/attack-info";

router.get(`${apiURL}`, async (req, res) => {
  try {
    const data = await readData();
    const response = responseCyberAttackOptions(data);
    res.status(200).send(response);
  } catch (e) {
    res.status(404).send({
      errorMessage: `Cannot access ${apiURL}`,
    });
  }
});

router.get(`${apiURL}/:type`, async (req, res) => {
  try {
    const data = await readData();
    const response = responseByTypeSourceAttack(data, req.params.type);

    res.status(200).send(response);
  } catch (e) {
    res.status(404).send({
      errorMessage: `Cannot access ${apiURL}/type`,
    });
  }
});


async function readData() {
const cacheDataKey = "attackTypesResource";
  if (myCache.has(cacheDataKey)) {
    return myCache.get(cacheDataKey);
  }
  const dataFromDB = JSON.parse(readFileSync("assets/data.json"));
  myCache.set(cacheDataKey, dataFromDB);
  return dataFromDB;
}

/*  
==> Bounos <==
*/

/*
const readData = async () => {
  const cacheDataKey = "attackTypesResource";
  if (myCache.has(cacheDataKey)) {
    const dataFromDB = myCache.get(cacheDataKey);
    return dataFromDB;
  }
  const attackTypesResource = await AttackSourceTypes.find();
  myCache.set(cacheDataKey, attackTypesResource);
  return attackTypesResource;
}
*/

module.exports = router;
