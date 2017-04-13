Posts = new Mongo.Collection('posts');
Posts.allow({
    update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); }
});
/*Posts.deny({
    update: function(userId, post, fieldNames) {
        // 只能更改如下两个字段：
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});*/
/*
 Posts.allow({
 insert: (userId, doc)=> !! userId// 只允许登录用户添加
 });*/
Meteor.methods({
    //使用postInsert内置方法替代allow来限制权限
    postInsert: function(postAttributes) {
        var checkResult = util.commonCheck(postAttributes);
        if(checkResult !== null){
            return checkResult;
        }else{
            var post = util.post(postAttributes);
            // 插入帖子内容到Posts
            var postId = Posts.insert(post);
            // 返回_id
            return {
                _id: postId
            };
        }
        // 延时补偿--客户端模拟服务端操作
        /*if (Meteor.isServer) {
            postAttributes.title += "(server)";
            // wait for 5 seconds
            Meteor._sleepForMs(5000);
        } else {
            postAttributes.title += "(client)";
        }*/
    },
   postUpdate: function(currentPostId,postAttributes){
       /*var checkResult = util.commonCheck(postAttributes);
       if(checkResult !== null){
           return checkResult;
       }else{*/
           const post = util.post(postAttributes);
           // 插入帖子内容到Posts
           Posts.update(currentPostId,{$set:post});
       //}
   }
});
