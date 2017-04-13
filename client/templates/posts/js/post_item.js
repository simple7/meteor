Template.postItem.helpers({
    ownPost: function(){
        return this.userId === Meteor.userId();
    },
    checkIsDetail:function(){
        const url = Router.current().url;
        return url.indexOf('posts/')<0;
    },
    getDate:function(e){
        const gerSlice=function(num){
            num = '00'+num;
            return num.substring(num.length-2,num.length);
        };
        return `${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()} ${gerSlice(e.getHours())}:${gerSlice(e.getMinutes())}:${gerSlice(e.getSeconds())}`;
    },

});
Template.postItem.events({
    // 点击删除事件
    'click .delete':function(e){
        e.preventDefault();
        if(confirm("确定删除当前帖子？")){
            const currentPostId = this._id;
            console.log(currentPostId);
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});