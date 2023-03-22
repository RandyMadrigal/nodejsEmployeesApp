const round = (num) => {
  const numero = Math.round(num * 100) / 100;
  return numero;
};

exports.AFP = (Sueldo) => {
  const AFP = parseInt(Sueldo) * (2.87 / 100);
  return round(AFP);
};

exports.SFS = (Sueldo) => {
  const SFS = parseInt(Sueldo) * (3.04 / 100);
  return round(SFS);
};

exports.SueldoAnual = (Sueldo) => {
  const Anual = parseInt(Sueldo) * parseInt(12);
  return round(Anual);
};

exports.TotalDescuento = (Sueldo) => {
  const AFP = this.AFP(Sueldo);
  const SFS = this.SFS(Sueldo);
  const total = AFP + SFS;

  return round(total);
};

exports.SueldoNeto = (Sueldo) => {
  const TotalDescuento = this.TotalDescuento(Sueldo);

  let total = Sueldo - TotalDescuento;

  return round(total);
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

  const SueldoAnual = (Sueldo - this.TotalDescuento(Sueldo)) * 12;

  if (SueldoAnual <= 416220) {
    return round(EXENTO);
  }

  if (SueldoAnual >= 416220.01 && SueldoAnual <= 624329) {
    ISR = (SueldoAnual - ESCALA_MINIMA) * PORCENTAJE_MINIMA;
    total = (ISR + VALOR_ESCALA_MINIMA) / 12;
    return round(total);
  }

  if (SueldoAnual >= 624329.01 && SueldoAnual <= 867123) {
    ISR = (SueldoAnual - ESCALA_MEDIA) * PORCENTAJE_MEDIA;
    total = (ISR + VALOR_ESCALA_MEDIA) / 12;
    return round(total);
  }

  if (SueldoAnual > 867123.01) {
    ISR = (SueldoAnual - ESCALA_MAXIMA) * PORCENTAJE_MAXIMA;
    total = (ISR + VALOR_ESCALA_MAXIMA) / 12;
    return round(total);
  }
};
