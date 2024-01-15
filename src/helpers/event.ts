const convertToRp = (value: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value).slice(0, -3)
};

const convertToNominal = (value: string) => {
  if (value.includes(".")) {
    const numberSplitted = value.split(".");
    return numberSplitted[0].replace(/,/g, "") + "." + numberSplitted[1];
  }
  if (value.includes(",")) {
    return parseInt(value.replace(/,/g, ""));
  }
  if (value === "") {
    return 0;
  }
  if (isNaN(parseInt(value))) {
    return 0;
  }
  return parseInt(value);
}

const splitNumber = (value: string) => {
  if(isNaN(parseInt(value))) {
    return value.slice(0, -1);
  }
  const nominal = value.replace(/,/g, ""); 
  if (nominal.includes(".")) {
    const numberSplitted = nominal.split(".");
    return numberSplitted[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + numberSplitted[1];
  }
  if (nominal.length > 3) {
    return nominal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return nominal;
}

const onlyNumber = (value: string) => {
  return value.replace(/[^0-9]/g, "");
}

export {
  convertToRp,
  convertToNominal,
  splitNumber,
  onlyNumber
}
