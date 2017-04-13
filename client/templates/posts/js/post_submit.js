// 新建帖子提交
Template.postSubmit.events({
    'click #add_new': function (e) {
        e.preventDefault(); //防止浏览器重复提交表单
        const post = util.getContext(e);
        //console.log(post);
        Meteor.call('postInsert', post, function (error, result) {
            // 显示错误信息并退出
            if (error) {
                sAlert.error(error.reason);
                return;
            }
            if (result.emptyExits) {
                sAlert.error('请全部录入带*的字段！');
                return;
            }
            if (result.postExists) {
                sAlert.info('该公司已经注册过');
                setTimeout(function () {
                    Router.go('postPage', {_id: result._id})
                }, 1000);
            } else {
                Router.go('postPage', {_id: result._id});
            }

        });
    },
    'click #update': function (e) {
        e.preventDefault(); //防止浏览器重复提交表单
        const post = util.getContext(e);
        const currentPostId = this._id;
        //console.log(post);
        Meteor.call('postUpdate', currentPostId, post, function (error, result) {
            if (error) {
                // 向用户显示错误信息
                alert(error.reason);
            } else if (result && result.postExists) {
                alert('该公司已经注册过！');
                setTimeout(function () {
                    Router.go('postPage', {_id: result._id})
                }, 1000);
            } else {
                Router.go('postPage', {_id: currentPostId});
            }
        });
        //Router.go('postsList');
    },
    'click #go_back': function () {
        Router.go('postsList');
    }
});

