const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{
  var users;
  beforeEach(()=>{
     users = new Users();
    users.users = [
      {
        id:'1',
        name: 'Misha',
        room: 'Naruto'
      },
      {
        id: '2',
        name: 'Bueno',
        room: 'Bleach'
      },
      {
        id: '3',
        name: 'Nigga',
        room: 'Bleach'
      }];
  });


  it('Should add a new user',()=>{
    var users = new Users();
    var user = {
      id:123,
      name:'Misha',
      room:'ziga'
    };
    var resUser = users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);
  });


  it('Should return Bueno and Nigga',()=>{
    var foundUsers = users.getUserList('Bleach');
    expect(foundUsers).toEqual(['Bueno','Nigga']);
  });

  it('Should delete Misha',()=>{
    expect(users.removeUser('1')).toEqual(
      {
        id:'1',
        name: 'Misha',
        room: 'Naruto'
      }
    );
  });

  it('Should get Bueno user',()=>{
    expect(users.getUser('2')).toEqual({
      id: '2',
      name: 'Bueno',
      room: 'Bleach'
    });
  });
});
