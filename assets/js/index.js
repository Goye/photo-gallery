/**
 * @author Carlos Goyeneche
 */

var getImages = Backbone.Collection.extend({
	url: '',
	parse: function(response){
		return response;
	}
	
});

var GalleryList = Backbone.View.extend({
	initialize: function(){
		/** Get images from json */
		this.array = new getImages();
	},
	/** Scope from the view */
	el: '#',
	events: {
		"click #":"nextImage",
		"click #": "previousImage"
	},
	nextImage: function(event){
		/** Put the class active and moving a position in the array */
	},
	previousImage: function(event){
		
	},
	changeContentImage:function(){
		/** change the current image */
	}
	
});

var galleryList = new GalleryList();