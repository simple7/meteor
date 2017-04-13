/**
 * 路由分发配置
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() { return Meteor.subscribe('allPosts'); }
});
// 首页分页路由控制器 避免硬编码
PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: {submitted: -1}, limit: this.postsLimit()};
    },
    waitOn: function() {
        return Meteor.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    allPostCounts:function(){
        return Posts.find().count();
    },
    data: function() {
        const hasMore = this.allPostCounts()>this.posts().count();
        const nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
        return {
            posts: this.posts(),
            nextPath: hasMore ? nextPath : null
        };
    }
});
// 默认路由
Router.route('/:postsLimit?', {
    name: 'postsList'
});

// 定位路由
Router.route('/posts/:_id', {
    name: 'postPage',
    data: function() { return Posts.findOne(this.params._id); }
});
// 查询路由
Router.route('/posts/search/:searchText',{
    name:'postsSearch',
    template:'postsSearch',
    data: function(){
        const searchText = this.params.searchText;
        const query = {
            $or:[{
                    company_name: new RegExp("^.*"+searchText+".*$")}
                ,
                {
                    social_code:searchText
                },
                {
                    legal_name:searchText
                }
            ]
        };
        //console.log(query);
        const counts = Posts.find(query).count();
        if(counts >0){
            return {posts:Posts.find(query)};
        }else{
            return {posts:false};
        }

    }
});
// 编辑路由
Router.route('/edit/:_id',{
    name: 'postEdit',
    template:'postSubmit',
    data: function(){
        console.log(Posts.findOne(this.params._id));
        return Posts.findOne(this.params._id);
    }
});

// 新建注册公司路由
Router.route('/addNew/add', {
    name: 'addNew',
    template:'postSubmit'
});
//判断用户是否登录
 const requireLogin = function(){
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};


// 解决合法路由但data返回false情况下显示404页面
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});