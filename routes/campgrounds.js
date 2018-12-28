var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");

// INDEX-> Show all campgrounds
router.get("/",function(req,res){
// GET ALL CAMPGROUNDS FROM DATABASE
  Campground.find({},function(err,allCampgrounds){
    if(err)
    console.log(error);
    else {
           res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds,page:'campgrounds'});
    }
  });


});
// CREATE-> Add campgrounds to database
router.post("/",middleware.isLoggedIn,function(req,res){
  var name=req.body.name;
  var price=req.body.price;
  var image=req.body.image;
  var desc=req.body.description;
  var author={
    id:req.user._id,
    username:req.user.username
  };
  var newCampground={name:name,price:price, image:image, description:desc,author:author};
  Campground.create(newCampground,function(err,newlyCreated){
    if(err)
    console.log(error);
    else {
      res.redirect("/campgrounds");
    }
  });

});

//NEW-> Provides form for campgrounds
router.get("/new",middleware.isLoggedIn,function(req,res){
  res.render("campgrounds/new");
});


// SHOW-> Shows more information about campgrounds
router.get("/:id",function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    if(err)
    console.log(error);
    else {
      console.log(foundCampground);
      res.render("campgrounds/show",{campground:foundCampground});
    }
  });

});


//EDIT Campground
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
  //IS user logged in

    Campground.findById(req.params.id,function(err,foundCampground){

          res.render("campgrounds/edit",{campground:foundCampground});

    });



});

//UPDATE CAMPGROUNDS
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
    if(err)
    {
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});


//DELETE CAMPGROUNDS
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndRemove(req.params.id,function(err){
    if(err)
    res.redirect("/campgrounds");
    else {
    res.redirect("/campgrounds");
    }
  });
});






module.exports=router;
