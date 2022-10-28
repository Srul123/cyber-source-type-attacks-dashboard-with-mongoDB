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

module.exports = {
  calculateSeverityStrength,
  calculateTypeStrength,
  calculateRisksMeterAverage,
};
