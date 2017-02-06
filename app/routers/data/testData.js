'use strict';

var Promise = require('bluebird');
var db = {
    test: {}
};
var sequenceId = 1;
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

    save: function(type, entity){
        console.log(entity);
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
            entity.id = sequenceId++;
            typeDb[entity.id] = entity;
            return Promise.resolve(entity);
        }


    }
};

