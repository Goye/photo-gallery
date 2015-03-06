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
	el: $('#container'),
  render: function(){
    array = this.collection.images;
    this.initialView();
    return this;
  },
	events: {
		"click #nextImage":"nextImage",
		"click #previousImage": "previousImage",
    "click #image-thumbnail": "loadImage"
	},
	nextImage: function(event){
    event.preventDefault();
    /** Put the class active and moving a position in the array */
    var id = $('.first-image img').data('id');
        id++;
    if(id === array.length){
      id = 0;
    }    
    this.changeContentImage(id);
	},
	previousImage: function(event){
    event.preventDefault();
		var id = $('.first-image img').data('id');
        id--;
    if(id < 0){
      id = array.length -1;
    }
    console.log("id", id);    
    this.changeContentImage(id);
	},
  loadImage: function(event){
    event.preventDefault();
    /** load the new image */
    var id = $(event.currentTarget).data('id');
    this.changeContentImage(id);
  },
	changeContentImage:function(id){
		/** change the current image */
    var imageObj = array[id];
    $('.first-image').html(
      "<img data-id='"+id+"' src='/assets/img/"+imageObj.image+"' alt='img'>"
    );
    $('.description').html(
      "<p>"+
      imageObj.title+ ' '+
      imageObj.date+ ' ' +
      imageObj.location+
      "</p>"
    );
	},
  initialView: function (){
    /** load the first time the images */
    var imageObj = array[0],
        imageId  = 0;
    $('.first-image').html(
      "<img data-id='"+imageId+"' src='/assets/img/"+imageObj.image+"' alt='img'>"
    );
    $('.description').html(
      "<p>"+
      imageObj.title+ ' '+
      imageObj.date+ ' ' +
      imageObj.location+
      "</p>"
    );
    for (var i in array){
      $('.thumbnails').append("<a id='image-thumbnail' href='#' data-id='"+i+"'><img src='/assets/img/"+array[i].thumb_url+"' alt='img'></a>");
    }
  }
	
});

var galleryList = new GalleryList();