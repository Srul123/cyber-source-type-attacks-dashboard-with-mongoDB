const express = require("express");
const { readFileSync } = require("fs");

const {
  calculateSeverityStrength,
  calculateTypeStrength,
  calculateRisksMeterAverage,
} = require("../utils/calculations");

const AttackSourceTypes = require("../models/attackSourceTypes");

const NodeCache = require("node-cache");
const cacheDataKey = "attackTypesResource";
const myCache = new NodeCache();
const router = new express.Router();

const apiURL = "/attack-info";

router.get(`${apiURL}`, async (req, res) => {
  try {
    const data = await readData();
    const set = new Set();
    for (let item of data) {
      set.add(item.sourceType);
    }
    const response = Array.from(set).map((value) => {
      const parsedName = value.replace(/([A-Z])/g, " $1");
      const name = parsedName.charAt(0).toUpperCase() + parsedName.slice(1);
      return { name: name.trim(), value };
    });
    res.status(200).send(JSON.stringify(response));
  } catch (e) {
    res.status(404).send({
      errorMessage: `Cannot access ${apiURL}`,
    });
  }
});

router.get(`${apiURL}/:type`, async (req, res) => {
  const filterByClearWeb = "ClearWeb";
  const filterByDarkWeb = "DarkWeb";
  try {
    const data = await readData();
    const typeCatagories = data.filter((itemType) => {
      return itemType.sourceType === req.params.type;
    });
    let category;
    if (typeCatagories.length > 300) {
      category = typeCatagories
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 300);
    } else {
      category = typeCatagories.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }
    const networkTypeClearWebList = category.filter(
      (item) => item.networkType === filterByClearWeb
    );
    const clearSeverities = calculateSeverityStrength(networkTypeClearWebList);
    const clearTypes = calculateTypeStrength(networkTypeClearWebList);

    const networkTypeDarkWebList = category.filter(
      (item) => item.networkType === filterByDarkWeb
    );
    const darkSeverities = calculateSeverityStrength(networkTypeDarkWebList);
    const darkTypes = calculateTypeStrength(networkTypeDarkWebList);

    const riskMeter = calculateRisksMeterAverage(
      clearSeverities.severityStrength,
      clearTypes.typeStrength,
      darkSeverities.severityStrength,
      darkTypes.typeStrength
    );

    const response = {
      clearSeverities,
      clearTypes,
      darkSeverities,
      darkTypes,
      riskMeter,
    };

    res.status(200).send(response);
  } catch (e) {
    res.status(404).send({
      errorMessage: `Cannot access ${apiURL}/type`,
    });
  }
});

router.post(`${apiURL}`, async (req, res) => {
  try {
    const data = await loadResourcesAttacksTypesFromDB();
    res.status(200).send(data);
  } catch (e) {
    res.status(404).send({
      errorMessage: `Cannot access POST ${apiURL}`,
    });
  }
});

async function readData() {
  if (myCache.has(cacheDataKey)) {
    const timeCache = myCache.get(cacheDataKey);
    return timeCache;
  }
  const attackTypesResource = await AttackSourceTypes.find();
  myCache.set(cacheDataKey, attackTypesResource);
  return attackTypesResource;
}

module.exports = router;
