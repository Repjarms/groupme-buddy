'use strict';

// add functions to map json structure and clean it up
module.exports = {

	// map user list
	mapUsers: function(data) {
		return {
			user: data[0].name
		};
	},

	// map posts
	mapPosts: function(data) {

	},

	// map likes
	mapLikes: function(data) {

	}

}