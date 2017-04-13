Template.header.events({
    // 点击查询按钮触发事件
    'click .search-btn':function(e){
        e.preventDefault();
        var searchText = $(e.target).parent().siblings('input').val();
        //console.log(Posts.findOne({title:searchText})._id);
        if(!searchText){
            sAlert.warning('请输入搜索内容！',{position:'top-right',timeout:3000});
            $(e.target).parent().siblings('input').focus()
            return;
        }
        const query = {searchText:searchText};
        //console.log(searchText);
        Router.go('postsSearch',query)
        //Router.go('postPage',{_id:Posts.findOne({title:searchText})._id})
    },
    'click .search-reset':function(e){
        e.preventDefault();
        $(e.target).parent().siblings('input').val('');
        Router.go('postsList')
    }
});
document.onkeyup=function(e){
if($('#search_input').is(':focus') && e.keyCode === 13){
            $('.search-btn').click();
    }
};