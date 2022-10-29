const SEVERITY_STRENGTH_INDICATORS = {
  high: 100,
  medium: 70,
  low: 40,
};

const SEVERITY_STRENGTH = {
  high: "high",
  medium: "medium",
  low: "low",
};

const calculateSeverityStrength = (data = []) => {
  const highCategoryList = data.filter(
    (item) => item.severity.toLowerCase() === SEVERITY_STRENGTH.high
  );
  const highSpec = highCategoryList.length * SEVERITY_STRENGTH_INDICATORS.high;

  const mediumCategoryList = data.filter(
    (item) => item.severity.toLowerCase() === SEVERITY_STRENGTH.medium
  );
  const mediumSpec = mediumCategoryList.length * SEVERITY_STRENGTH_INDICATORS.medium;

  const lowCategoryList = data.filter(
    (item) => item.severity.toLowerCase() === SEVERITY_STRENGTH.low
  );
  const lowSpec = lowCategoryList.length * SEVERITY_STRENGTH_INDICATORS.low;

  const severityStrength = parseInt((highSpec + mediumSpec + lowSpec) / data.length);

  return { highSpec, mediumSpec, lowSpec, severityStrength };
};

const TYPE_STRENGTH_INDICATORS = {
  vip: 100,
  attackIndication: 80,
  exploitableData: 60,
  brandSecurity: 40,
  dataLeakage: 20,
  phishing: 10,
};

const TYPE_STRENGTH = {
  vip: "vip",
  attackIndication: "attackIndication",
  exploitableData: "exploitableData",
  brandSecurity: "brandSecurity",
  dataLeakage: "dataLeakage",
  phishing: "phishing",
};

const calculateTypeStrength = (data = []) => {
  const vipCategory = data.filter(
    (item) => item.type.toLowerCase() === TYPE_STRENGTH.vip.toLowerCase()
  );
  const vipSpec = vipCategory.length * TYPE_STRENGTH_INDICATORS.vip;

  const attackIndicationCategory = data.filter(
    (item) => item.type.toLowerCase() === TYPE_STRENGTH.attackIndication.toLowerCase()
  );
  const attackIndicationSpec =
    attackIndicationCategory.length * TYPE_STRENGTH_INDICATORS.attackIndication;

  const exploitableDataCategory = data.filter(
    (item) => item.type.toLowerCase() === TYPE_STRENGTH.exploitableData.toLowerCase()
  );
  const exploitableDataSpec =
    exploitableDataCategory.length * TYPE_STRENGTH_INDICATORS.exploitableData;

  const brandSecurityCategory = data.filter(
    (item) => item.type.toLowerCase() === TYPE_STRENGTH.brandSecurity.toLowerCase()
  );
  const brandSecuritySpec =
    brandSecurityCategory.length * TYPE_STRENGTH_INDICATORS.brandSecurity;

  const dataLeakageCategory = data.filter(
    (item) => item.type.toLowerCase() === TYPE_STRENGTH.dataLeakage.toLowerCase()
  );
  const dataLeakageSpec =
  dataLeakageCategory.length * TYPE_STRENGTH_INDICATORS.brandSecurity;

  const phishingCategory = data.filter(
    (item) => item.type.toLowerCase() === TYPE_STRENGTH.phishing.toLowerCase()
  );
  const phishingSpec =
    phishingCategory.length * TYPE_STRENGTH_INDICATORS.phishing;

  const typeStrength =
  parseInt((vipSpec +
    attackIndicationSpec +
    exploitableDataSpec +
    brandSecuritySpec +
    dataLeakageSpec +
    phishingSpec) / data.length);

  return {vipSpec, attackIndicationSpec,exploitableDataSpec,brandSecuritySpec, dataLeakageSpec, phishingSpec ,typeStrength};
};

const calculateRisksMeterAverage = (
  clearSeverityGradeStrength = Number,
  clearTypeGradeStrength = Number,
  darkSeverityGradeStrength = Number,
  darkTypeGradeStrength = Number) => {
  return parseInt((clearSeverityGradeStrength + clearTypeGradeStrength + darkSeverityGradeStrength + darkTypeGradeStrength) / 4);
};


function responseCyberAttackOptions(data=[]) {
  const set = new Set();
  for (let item of data) {
    set.add(item.sourceType);
  }
  const response = Array.from(set)
    .map((value) => {
      const parsedName = value.replace(/([A-Z])/g, " $1");
      const name = parsedName.charAt(0).toUpperCase() + parsedName.slice(1);
      return { name: name.trim(), value };
    })
    .sort((a, b) => a.value.localeCompare(b.value));

    return response;
}


function responseByTypeSourceAttack(data=[], type="") {
  const filterByClearWeb = "ClearWeb";
  const filterByDarkWeb = "DarkWeb";
  const typeCatagories = data.filter((itemType) => {
    return itemType.sourceType === type;
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
  return response;
}

module.exports = {
  responseCyberAttackOptions,
  responseByTypeSourceAttack
};
