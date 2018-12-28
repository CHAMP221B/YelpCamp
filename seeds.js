var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");


var data=[
  {
    name:"Cloud Rest",
    image:"https://media-cdn.tripadvisor.com/media/photo-s/0e/fc/a6/62/camping-la-playa-ibiza.jpg",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    name:"Desert Dune",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMt3EUDl8FiUlc5UXsIgHE17AL8-QapmKhEix70osPpqEfi3a65w",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    name:"Canyon Floor",
    image:"https://s3.amazonaws.com/imagescloud/images/cards/camping/camping-tente.jpg",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
];
function seedDB(){
  Campground.remove({},function(err){
    if(err)
    console.log(error);
    console.log("Removed All");

    data.forEach(function(seed){
      Campground.create(seed,function(err,campground){
        if(err)
        console.log(error);
        else {
          console.log("Added a campground");
          Comment.create(
            {
              text:"This palce is gr8",
              author:"Homer"
            },function(err,comment){
              if(err)
              console.log(error);
              else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment");
              }
            }
          );
          // var comment = new Comment ({
          //   text : "This place is nice!",
          //   author : "Champ"
          // });
          // campground.comments.push(comment);
          // campground.save();
          // console.log("Created new comment");
        }
      });
    });
  });
};

module.exports=seedDB;
