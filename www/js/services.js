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
})

.factory('Routes', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'ANDACHUPA - TICTIRUMI',
    archive: 'PE-3N_ANDACHUPA–TICTIRUMI',
    face: 'img/map1.png'
  }, {
    id: 1,
    name: 'ANTAMINA - CATAC',
    archive: 'PE-3N_ANTAMINA_CATAC',
    face: 'img/map1.png'
  }, {
    id: 2,
    name: 'CASMA - HUARAZ',
    archive: 'PE-14_CASMA_HUARAZ',
    face: 'img/map1.png'
  }, {
    id: 3,
    name: 'CONOCOCHA - HUARAZ',
    archive: 'PE-3N_CONOCOCHA_HUARAZ',
    face: 'img/map1.png'
  }, {
    id: 4,
    name: 'CONOCOCHA - LA UNION',
    archive: 'PE-3N_CONOCOCHA_LA_UNION',
    face: 'img/map1.png'
  }, {
    id: 5,
    name: 'CONOCOCHA - MINA',
    archive: 'PE-3N_CONOCOCHA_MINA',
    face: 'img/map1.png'
  }, {
    id: 6,
    name: 'HUANUCO - OROYA',
    archive: 'PE-3N_HUANUCO_OROYA',
    face: 'img/map1.png'
  }, {
    id: 7,
    name: 'LA UNION - HUANUCO',
    archive: 'PE-3N_LAUNION_HUANUCO',
    face: 'img/map1.png'
  }, {
    id: 8,
    name: 'LIMA - PATIVILCA',
    archive: 'PE-1N_LIMA_PATIVILCA',
    face: 'img/map1.png'
  }, {
    id: 9,
    name: 'LLATA - ANTAMINA',
    archive: 'PE-3N_LLATA_ANTAMINA',
    face: 'img/map1.png'
  }, {
    id: 10,
    name: 'OROYA - LIMA',
    archive: 'PE-22_OROYA_LIMA',
    face: 'img/map1.png'
  }, {
    id: 11,
    name: 'PATIVILCA - CASMA',
    archive: 'PE-1N_PATIVILCA_CASMA',
    face: 'img/map1.png'
  }, {
    id: 12,
    name: 'PATIVILCA - CONOCOCHA',
    archive: 'PE-16_PATIVILCA_CONOCOCHA',
    face: 'img/map1.png'
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