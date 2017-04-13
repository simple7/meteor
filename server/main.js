import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
  // code to run on server at startup
    if (Posts.find().count() === 0) {
        for(let i=1;i<=10;i++){
            Posts.insert({
                company_name: '上海承泰信息技术有限公司 #'+ i,
                social_code: '30030120170411',
                registered_fund: 200+i,
                address: `张江伯克利${i}号`,
                company_tel: '021-8883333',
                legal_name: `张江${i}号`,
                legal_id: '429001198708012378',
                legal_phone: '13888888888',
                registered_date: '2017-04-11',
                company_url:'http://allflux.com',
                userId: 'system',
                author: '系统',
                submitted: new Date()
            });
        }

    }
    //发布首页列表
    Meteor.publish('posts', function(options) {
        check(options, {
            sort: Object,
            limit: Number
        });
        return Posts.find({}, options);
    });
    Meteor.publish('allPosts', function() {
        return Posts.find();
    });
    // 发布详细注册资料
    /*Meteor.publish('comments', function(postId) {
        check(postId, String);
        return Posts.find({postId: postId});
    });*/
});
