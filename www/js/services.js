angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: '2018 06 01 SVC 002',
    lastText: 'Pendiente - No Crítico',
    face: 'img/a1.png'
  }, {
    id: 1,
    name: '2018 05 24 SVC 018',
    lastText: 'Pendiente - No Crítico',
    face: 'img/a1.png'
  }, {
    id: 2,
    name: '2018 04 05 SVC 03',
    lastText: 'Levantada - Crítico',
    face: 'img/a1.png'
  }, {
    id: 3,
    name: '2018 03 18 SVC 19',
    lastText: 'Levantada - No Crítico',
    face: 'img/a1.png'
  }, {
    id: 4,
    name: '2018 02 18 SVM 02',
    lastText: 'Levantada - Crítico',
    face: 'img/a1.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
