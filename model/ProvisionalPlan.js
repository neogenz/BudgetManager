"use strict";

module.exports = function (sequelize, DataTypes) {
    var ProvisionalPlan = sequelize.define("ProvisionalPlan", {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            valid: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            baseAmount: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            classMethods: {
                associate: function (models) {
                    ProvisionalPlan.hasMany(models.Movement);
                    //ProvisionalPlan.hasMany(models.User);
                    ProvisionalPlan.belongsTo(models.User);
                }
            }
        }
    );
    return ProvisionalPlan;
};


//module.exports = function (mongoose) {
//    var Schema = mongoose.Schema;
//    var ProvisionalPlanSchema = new Schema({
//        name: String,
//        valid: String,
//        baseAmount: String
//    });
//
//
//    var ProvisionalPlan = mongoose.model('ProvisionalPlan', ProvisionalPlanSchema);
//    mongoose.model('ProvisionalPlan');
//
//    var ProvisionalPlanProvider = function(){};
//
////Find all posts
//    ProvisionalPlanProvider.prototype.findAll = function(callback) {
//        ProvisionalPlan.find({}, function (err, provisionalPlans) {
//            callback( null, provisionalPlans )
//        });
//    };
//
////Find post by ID
//    ProvisionalPlanProvider.prototype.findById = function(id, callback) {
//        ProvisionalPlan.findById(id, function (err, post) {
//            if (!err) {
//                callback(null, post);
//            }
//        });
//    };
//
////Update post by ID
//    ProvisionalPlanProvider.prototype.updateById = function(id, body, callback) {
//        ProvisionalPlan.findById(id, function (err, post) {
//            if (!err) {
//                post.title = body.title;
//                post.body = body.body;
//                post.save(function (err) {
//                    callback();
//                });
//            }
//        });
//    };
//
////Create a new post
////    ProvisionalPlanProvider.prototype.save = function(params, callback) {
////        var post = new Post({title: params['title'], body: params['body'], created_at: new Date()});
////        post.save(function (err) {
////            callback();
////        });
////    };
////
//////Add comment to post
////    ProvisionalPlanProvider.prototype.addCommentToPost = function(postId, comment, callback) {
////        this.findById(postId, function(error, post) {
////            if(error){
////                callback(error)
////            }
////            else {
////                post.comments.push(comment);
////                post.save(function (err) {
////                    if(!err){
////                        callback();
////                    }
////                });
////            }
////        });
////    };
//
//
//    return ProvisionalPlanProvider;
//};

//function ProvisionalPlan() {
//    this.name = '';
//    this.valid = '';
//    this.baseAmount = 0;
//    this.UserId = 0;
//}