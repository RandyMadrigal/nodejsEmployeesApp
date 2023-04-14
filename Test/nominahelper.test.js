const {
    SueldoAnual,
    AFP,
    SFS,
    ISR,
    SueldoNeto
  } = require('../util/helpers/nomina');
  
  describe('SueldoAnual', () => {
    it('calcula correctamente el sueldo anual', () => {
      expect(SueldoAnual('1000')).toEqual('$12,000.00');
    });
  });
  
  describe('AFP', () => {
    it('calcula correctamente el aporte a la AFP', () => {
      expect(AFP('1000')).toEqual('$28.70');
    });
  });
  
  describe('SFS', () => {
    it('calcula correctamente el aporte a la SFS', () => {
      expect(SFS('1000')).toEqual('$30.40');
    });
  });
  
  describe('ISR', () => {
    it('calcula correctamente el impuesto sobre la renta', () => {
      expect(ISR('10000')).toEqual('$1,069.20');
    });
  
    it('no aplica impuesto si el sueldo anual es menor o igual a 416,220', () => {
      expect(ISR('1000')).toEqual(0);
    });
  });
  
  describe('SueldoNeto', () => {
    it('calcula correctamente el sueldo neto sin ISR', () => {
      expect(SueldoNeto('1000')).toEqual('$941.90');
    });
  
    it('calcula correctamente el sueldo neto con ISR', () => {
      expect(SueldoNeto('10000')).toEqual('$7,807.20');
    });
  });
  