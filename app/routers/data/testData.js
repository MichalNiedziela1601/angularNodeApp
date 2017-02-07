'use strict';

var Promise = require('bluebird');
var sequenceId = 1;
var db = {
    test: {}
};

module.exports = {
    get: function(type,id){
        var typeDb = db[type];
        if(!typeDb){

            return Promise.reject('Invalid type');
        }

        var item = typeDb[id];
        if(!item){
            return Promise.reject('Entity not found');
        }
        return Promise.resolve(item);
    },

    getAll: function(){
        console.log(db.test[1]);
        if(db.test === {}){
            return Promise.reject('Empty');
        }else{
            return Promise.resolve(db.test);
        }
    },

    save: function(type, entity){
        var typeDb = db[type];
        if(!typeDb){
            return Promise.reject('Invalid  type');
        }

        if(entity.id){
            var existingItem = typeDb[entity.id];
            if(!existingItem){
                return Promise.reject('Entity not found');
            }
        } else {
            var id =sequenceId++;
            entity.id = id;

        }
        typeDb[entity.id] = entity;
        return Promise.resolve(entity);


    }
};

