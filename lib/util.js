// 封装工具类
this.util = (function () {
    const checkIsEmpty = e => {
        if (e === undefined || e.trim() === '' || e === null) {
            return true;
        } else {
            return false;
        }
    };
    /**
     * 通用校验
     * @param postAttributes
     * @returns {*}
     */
    const commonCheck = postAttributes => {
        //console.log(postAttributes);
        check(Meteor.userId(), String);
        for (const attr in postAttributes) {
            if (attr !== "company_url" && checkIsEmpty(postAttributes[attr])) {
                return {emptyExits: true};
            }
        }
        const postWithSameCode = Posts.findOne({
            social_code: postAttributes.social_code,
        });
        if (postWithSameCode) {
            return {
                postExists: true,
                _id: postWithSameCode._id
            }
        } else {
            return null;
        }
    };
    /**
     * @获取
     * @param e
     * @returns {{company_name: (*|jQuery), social_code: (*|jQuery), registered_fund: (*|jQuery), address: (*|jQuery), company_tel: (*|jQuery), legal_name: (*|jQuery), legal_id: (*|jQuery), legal_phone: (*|jQuery), registered_date: (*|jQuery), company_url: (*|jQuery)}}
     */
    const getContext = e => {
        const form = $(e.target).parents('form');
        const post = {
            company_name: $(form).find('#company_name').val(),
            social_code: $(form).find('#social_code').val(),
            registered_fund: $(form).find('#registered_fund').val(),
            address: $(form).find('#address').val(),
            company_tel: $(form).find('#company_tel').val(),
            legal_name: $(form).find('#legal_name').val(),
            legal_id: $(form).find('#legal_id').val(),
            legal_phone: $(form).find('#legal_phone').val(),
            registered_date: $(form).find('#registered_date').val(),
            company_url: $(form).find('#company_url').val()
        };
        return post;
    };
    /**
     * 返回帖子内容
     * @param postAttributes
     * @returns {Object}
     */
    const getPost = postAttributes => {
        const user = Meteor.user();
        const post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        return post;
    };
    return {
        commonCheck: commonCheck,
        post: getPost,
        getContext: getContext,
        checkIsEmpty: checkIsEmpty
    }
})();