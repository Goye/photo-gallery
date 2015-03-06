/**
 * @author Carlos Goyeneche
 */

var getImages = Backbone.Collection.extend({
	url: '/assets/js/gallery_json.js',
  parse: function(response){
    this.images = response.photos;
    return response.photos;
  }
});

var GalleryList = Backbone.View.extend({
  array: [],
	initialize: function(){
		/** Get images from json */
		this.collection = new getImages();
    this.collection.bind("reset", this.render, this);
    this.collection.bind("destroy", this.render, this);
		this.collection.fetch();
    
	},
	/** Scope from the view */
	el: '#container',
  render: function(){
    array = this.collection.images;
    this.firstPicture();

  },
	events: {
		"click #nextImage":"nextImage",
		"click #previousImage": "previousImage",
    "click #image-thumbnail": "loadImage"
	},
	nextImage: function(event){
    event.preventDefault();
    console.log("here");
		/** Put the class active and moving a position in the array */
	},
	previousImage: function(event){
    event.preventDefault();
		
	},
  loadImage: function(event){
    event.preventDefault();
    console.log("here");
  },
	changeContentImage:function(){
		/** change the current image */
	},
  firstPicture: function (){
    /** load the first time the images */
    var imageObj = array[0];
    $('.first-image').html(
      "<img src='./assets/img/"+imageObj.image+"' alt='img'>"
    );
    $('.description').html(
      "<p>"+
      imageObj.title+ ' '+
      imageObj.date+ ' ' +
      imageObj.location+
      "</p>"
    );
    for (var i in array){
      $('.thumbnails').append("<a id='image-thumbnail' href='#' data-id='"+array[i].id+"'><img src='./assets/img/"+array[i].thumb_url+"' alt='img'></a>");
    }
  }
	
});

var galleryList = new GalleryList();