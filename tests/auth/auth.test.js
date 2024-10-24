const { checkDataFields } = require("../../src/services/adminServices");

describe('checkDataFields', () => {
    test('should throw a error when the name is not given', () => {
      expect(() => checkDataFields()).toThrow(HandlerError);   
      expect(() => checkDataFields()).toThrow("Os campos são obrigatórios");  
    });
    test('should return the name when its given', () => {
      const name = 'Gabriel';
      const result = checkDataFields(name);
      expect(result).toBe(name);  
    });
  });