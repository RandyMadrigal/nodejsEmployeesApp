//dar formato de dinero al valor introducido
const convertMoney = (numero) => {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
  }).format(numero);
};

exports.SueldoAnual = (Sueldo) => {
  const Anual = parseInt(Sueldo) * parseInt(12);

  return convertMoney(Anual);
};

exports.AFP = (Sueldo) => {
  const AFP = parseFloat(Sueldo) * (2.87 / 100);
  return convertMoney(AFP);
};

exports.SFS = (Sueldo) => {
  const SFS = parseFloat(Sueldo) * (3.04 / 100);
  return convertMoney(SFS);
};

exports.ISR = (Sueldo) => {
  const EXENTO = 0;
  const PORCENTAJE_MINIMA = 15 / 100;
  const PORCENTAJE_MEDIA = 20 / 100;
  const PORCENTAJE_MAXIMA = 25 / 100;

  const ESCALA_MINIMA = 416220;
  const ESCALA_MEDIA = 624329.01;
  const ESCALA_MAXIMA = 867123.01;

  const VALOR_ESCALA_MINIMA = 0;
  const VALOR_ESCALA_MEDIA = 31216;
  const VALOR_ESCALA_MAXIMA = 79776;

  let ISR = 0;
  let total = 0;

  const SueldoAnual = this.SueldoAnual(Sueldo).replace(/,/g, "");

  if (SueldoAnual <= 416220) {
    return EXENTO;
  }

  if (SueldoAnual >= 416220.01 && SueldoAnual <= 624329) {
    ISR = (SueldoAnual - ESCALA_MINIMA) * PORCENTAJE_MINIMA;
    total = (ISR + VALOR_ESCALA_MINIMA) / 12;
    return convertMoney(total);
  }

  if (SueldoAnual >= 624329.01 && SueldoAnual <= 867123) {
    ISR = (SueldoAnual - ESCALA_MEDIA) * PORCENTAJE_MEDIA;
    total = (ISR + VALOR_ESCALA_MEDIA) / 12;
    return convertMoney(total);
  }

  if (SueldoAnual > 867123.01) {
    ISR = (SueldoAnual - ESCALA_MAXIMA) * PORCENTAJE_MAXIMA;
    total = (ISR + VALOR_ESCALA_MAXIMA) / 12;
    return convertMoney(total);
  }
};

exports.SueldoNeto = (Sueldo) => {
  let total;
  const AFP = this.AFP(Sueldo);
  const SFS = this.SFS(Sueldo);
  const ISR = this.ISR(Sueldo);

  console.log(ISR + "********" + typeof ISR);

  if (ISR == 0 || ISR == null || ISR == undefined) {
    total =
      parseFloat(Sueldo) -
      (parseFloat(AFP.replace(/,/g, "")) + parseFloat(SFS.replace(/,/g, "")));
  } else {
    total =
      parseFloat(Sueldo) -
      (parseFloat(AFP.replace(/,/g, "")) +
        parseFloat(SFS.replace(/,/g, "")) +
        parseFloat(ISR.replace(/,/g, "")));
  }

  return convertMoney(total);
};
