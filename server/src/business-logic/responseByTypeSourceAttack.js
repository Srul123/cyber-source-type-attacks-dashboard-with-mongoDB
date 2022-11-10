function responseByTypeSourceAttack(data = Array, type = String) {
  const filterByClearWeb = "ClearWeb";
  const filterByDarkWeb = "DarkWeb";

  const category = prepareData(data, type);

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

  const riskMeter = calculateAverageFactor(
    [
      clearSeverities.severityStrength,
      clearTypes.typeStrength,
      darkSeverities.severityStrength,
      darkTypes.typeStrength,
    ],
    4
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

const SEVERITY_STRENGTH_INDICATORS = {
  high: 100,
  medium: 70,
  low: 40,
};

const TYPE_STRENGTH_INDICATORS = {
  vip: 100,
  attackIndication: 80,
  exploitableData: 60,
  brandSecurity: 40,
  dataLeakage: 20,
  phishing: 10,
};

function prepareData(data = Array, type = String) {
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
  return category;
}

const calculateSeverityStrength = (data = Array) => {
  const filterBySeverity = "severity";
  const highSpec = calculateSpecByType(
    data,
    filterBySeverity,
    "high",
    SEVERITY_STRENGTH_INDICATORS
  );
  const mediumSpec = calculateSpecByType(
    data,
    filterBySeverity,
    "medium",
    SEVERITY_STRENGTH_INDICATORS
  );
  const lowSpec = calculateSpecByType(
    data,
    filterBySeverity,
    "low",
    SEVERITY_STRENGTH_INDICATORS
  );
  const severityStrength = calculateAverageFactor(
    [highSpec, mediumSpec, lowSpec],
    data.length
  );

  return { highSpec, mediumSpec, lowSpec, severityStrength };
};

function calculateSpecByType(
  data = Array,
  filterBy = String,
  keyType = String,
  objectMapType = Object
) {
  const categoryByType = data.filter(
    (item) => item[filterBy].toLowerCase() === keyType.toLowerCase()
  );
  const spec = categoryByType.length * objectMapType[keyType];

  return spec;
}

const calculateTypeStrength = (data = Array) => {
  const filterByType = "type";

  const vipSpec = calculateSpecByType(
    data,
    filterByType,
    "vip",
    TYPE_STRENGTH_INDICATORS
  );
  const attackIndicationSpec = calculateSpecByType(
    data,
    filterByType,
    "attackIndication",
    TYPE_STRENGTH_INDICATORS
  );
  const exploitableDataSpec = calculateSpecByType(
    data,
    filterByType,
    "exploitableData",
    TYPE_STRENGTH_INDICATORS
  );
  const brandSecuritySpec = calculateSpecByType(
    data,
    filterByType,
    "brandSecurity",
    TYPE_STRENGTH_INDICATORS
  );
  const dataLeakageSpec = calculateSpecByType(
    data,
    filterByType,
    "dataLeakage",
    TYPE_STRENGTH_INDICATORS
  );
  const phishingSpec = calculateSpecByType(
    data,
    filterByType,
    "phishing",
    TYPE_STRENGTH_INDICATORS
  );

  const typeStrength = calculateAverageFactor(
    [
      vipSpec,
      attackIndicationSpec,
      exploitableDataSpec,
      brandSecuritySpec,
      dataLeakageSpec,
      phishingSpec,
    ],
    data.length
  );

  return {
    vipSpec,
    attackIndicationSpec,
    exploitableDataSpec,
    brandSecuritySpec,
    dataLeakageSpec,
    phishingSpec,
    typeStrength,
  };
};

function calculateAverageFactor(arr = Array, factor = Number) {
  const sum = arr.reduce((cur, acc) => cur + acc);
  return parseInt(sum / factor);
}

const calculateRisksMeterAverage = (
  clearSeverityGradeStrength = Number,
  clearTypeGradeStrength = Number,
  darkSeverityGradeStrength = Number,
  darkTypeGradeStrength = Number) => {
  return parseInt((clearSeverityGradeStrength + clearTypeGradeStrength + darkSeverityGradeStrength + darkTypeGradeStrength) / 4);
};



module.exports = {
  responseByTypeSourceAttack,
};
