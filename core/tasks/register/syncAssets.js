module.exports = function(grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'less:dev',
		// 'compass:dev',
		'sync:dev',
		'coffee:dev'
	]);
};