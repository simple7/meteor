Template.postPage.helpers({
    getDate:function(e){
        const gerSlice=function(num){
            num = '00'+num;
            return num.substring(num.length-2,num.length);
        };
        if(e){
            console.log(e);
            return `${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()} ${gerSlice(e.getHours())}:${gerSlice(e.getMinutes())}:${gerSlice(e.getSeconds())}`;
        }else{
            return null;
        }
    }
})