var table,form,layer;
$(function(){
    layui.use(['table','form','layer'], function() {
        table = layui.table;
        form =layui.form;
        layer=layui.layer;

        form.on('radio(r)', function(data){
            /*console.log(data.elem); //得到radio原始DOM对象
            console.log(data.value); //被点击的radio的value值*/
            var value = data.value;
            $("#jsfs").val(value);
            if('jt'==value){
                document.getElementById("jt").style.display="";
            }else{
                document.getElementById("jt").style.display="none";
            }
        });
        form.on('select(aihao)', function(data){
            /*console.log(data.elem); //得到select原始DOM对象
            console.log(data.value); //得到被选中的值
            console.log(data.othis); //得到美化后的DOM对象*/
            var value=data.value;
            if('syl'==value){
                document.getElementById("zs").style.display="";
            }else{
                document.getElementById("zs").style.display="none";
                document.getElementById("jt").style.display="none";
            }

        });
        $("#close").click(function(){
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭    var index = layer.open();
            return false;
        });


        initDict();
    });

});
function addCgfx(){
    $("#costPeriod").removeAttr("disabled");
    var da=$("#f").serialize();
    console.log(da);
    $.ajax({
        url:"fx/addCgFx",
        data:da,
        dataType:"json",
        type:"post",
        async:true,
        success:function(data){
            alert(data.message);
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭    var index = layer.open();
            parent.location.reload();


        }
    });
}

function initDict() {
    $.ajax({
        url:"dict/queryDict",
        data:{"dictType":"FX"},
        dataType:"json",
        type:"post",
        async:true,
        success:function(data){
            var optionType = "<option value=\"0\">请选择收费方式</option>";
            $.each(data, function(i, x) {
                optionType += "<option value='" + x.dictValue + "'>"
                    + x.dictItem + "</option>"
            });
            $("select[name=costToll]").html(optionType);
            form.render('select');
        }
    });
}