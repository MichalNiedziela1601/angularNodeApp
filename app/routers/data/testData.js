'use strict';

var Promise = require('bluebird');
var sequenceId = 1;
var db = {
    test: {}
};

module.exports = {
    get: function(id){


        var item = db.test[id];
        if(!item){
            return Promise.reject('Entity not found');
        }
        return Promise.resolve(item);
    },

    getAll: function(){
        if(db.test === {}){
            return Promise.reject('Empty');
        }else{
            return Promise.resolve(db.test);
        }
    },

    save: function(entity){

        if(entity.id){
            var existingItem = db.test[entity.id];
            if(!existingItem){
                return Promise.reject('Entity not found');
            }
        } else {
            entity.id = sequenceId++;

        }
        db.test[entity.id] = entity;
        return Promise.resolve(entity);


    }
};

