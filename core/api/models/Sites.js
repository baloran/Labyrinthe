/**
 * Site
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

  	'title':{
  		type:'string',
  		defaultsTo:'Your name website',
  		required:true,
  	},

  	'description':{
  		type:'text',
  		defaultsTo:'Une description',
  		required:true,
  	},

      'identification':{
          type:'string',
          defaultsTo:'site'
      }



  }

};
