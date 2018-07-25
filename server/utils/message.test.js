var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage',()=>{
  it('should generate the correct message object',()=>{
    var mess = generateMessage('Misha','nibba');
    expect(mess.from).toBe('Misha');
    expect(mess.text).toBe('nibba');
    expect(mess.createdAt).toBeA('number');
  });
});
