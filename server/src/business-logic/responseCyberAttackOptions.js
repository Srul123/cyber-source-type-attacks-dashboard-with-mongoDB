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
  

  module.exports = {
    responseCyberAttackOptions
  };