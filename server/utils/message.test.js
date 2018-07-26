var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
  it('should generate the correct message object',()=>{
    var mess = generateMessage('Misha','nibba');
    expect(mess.from).toBe('Misha');
    expect(mess.text).toBe('nibba');
    expect(mess.createdAt).toBeA('number');
  });
});

describe('generate location message', ()=>{
  it('should generate correct location object',()=>{
    var from = 'Misha';
    var lat = 1337;
    var long = 228;
    var mess = generateLocationMessage(from,lat, long);
    expect(mess.from).toBe(from);
    expect(mess.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
    expect(mess.createdAt).toBeA('number');
  });
});
