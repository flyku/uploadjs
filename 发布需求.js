/**
 * Created by liyanwen on 2016/6/16.
 */
$(function () {
    PublicJs.navConsultHide();
    $('#btn_save').click(function () {
        Validate.editRelease();
        var flag = false;
        if (Validate.editRelease() == flag) {
            $('.previewBox').hide();
            $('.edit').show();
        } else {
            $('.previewBox').show();
            $('.edit').hide();
            Validate.assignment();
        }
    })
    saveJs.saveClick();
})
//验证
var Validate = {
    editRelease: function () {
        var flag = true;
        var form = $('#form1');
        var reg = /^[\u4e00-\u9fa5a-z]{2,10}$/gi,
            reg1 = /^[0-9]+$/gi,
            reg2 = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
        var needName = form.find('.needName').val(),//需求名称
            skillList1 = form.find('.skillList1 option:selected').text(),//技术领域
            teamList = form.find('.teamList option:selected').text(),//合作方式
            content = UE.getEditor('editor').getContentTxt(),//具体介绍
            file = form.find('#File'),//需求附件
            keyword = form.find('#keyword').val(),//关键词
            ripe = form.find('.ripe option:selected').text();//沟通方式
        projectMoney = form.find('.projectMoney').val(),//项目预算费用
            telperson = form.find('.telperson').val(),//联系人
            tel = form.find('.tel').val();//联系人电话
        //需求名称验证
        if (needName == '') {
            $('#txtError1').text('请填写需求名称').show();
            form.find('.needName').focus();
            return false;
        } else {
            $('#txtError1').hide();
            if (!reg.test(needName)) {
                $('#txtError1').text('请输入正确的需求名称 ').show();
                form.find('.needName').focus();
                return false;
            } else {
                $('#txtError1').hide();
            }
        }
        //技术领域验证
        if (skillList1 == '请选择...') {
            $('#txtError2').text('请选择技术领域').show();
            form.find('.skillList1').focus();
            return false;
        } else {
            $('#txtError2').hide();
        }
        //合作方式验证
        if (teamList == '请选择...') {
            $('#txtError3').text('请选择合作方式').show();
            form.find('.teamList').focus();
            return false;
        } else {
            $('#txtError3').hide();
        }
        //具体介绍验证
        if (content == '') {
            $('#txtError4').text('请填写具体介绍内容').show();
            UE.getEditor('editor').focus();
            return false;
        } else {
            $('#txtError4').hide();
        }
        //需求附件验证
        var isIE = /msie/i.test(navigator.userAgent) && !window.opera;

        function fileChange(target, id) {
            //var target = file;
            //console.log(target.value);
            //console.log(target);
            var fileSize = 0;
            var filetypes = [".jpg", ".png", ".rar", ".txt", ".zip", ".doc", ".ppt", ".xls", ".pdf", ".docx", ".xlsx"];
            var filepath = target.value;
            var filemaxsize = 1024 * 5;
            if (filepath) {
                var isnext = false;
                var fileend = filepath.substring(filepath.indexOf("."));
                if (filetypes && filetypes.length > 0) {
                    for (var i = 0; i < filetypes.length; i++) {
                        if (filetypes[i] == fileend) {
                            isnext = true;
                            break;
                        }
                    }
                }
                if (!isnext) {
                    $('#txtError5').text("不接受此文件类型！").show();
                    target.value = "";
                    return false;
                } else {
                    $('#txtError5').hide();
                }
            } else {
                return false;
            }
            if (isIE && !target.files) {
                var filePath = target.value;
                var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
                if (!fileSystem.FileExists(filePath)) {
                    $('#txtError5').text("不接受此文件类型！").show();
                    return false;
                } else {
                    $('#txtError5').hide();
                }
                var file = fileSystem.GetFile(filePath);
                fileSize = file.Size;
            } else {
                fileSize = target.files[0].size;
            }
            var size = fileSize / 1024;
            if (size > filemaxsize) {
                $('#txtError5').text("附件大小不能大于" + filemaxsize / 1024 + "M！").show();
                target.value = "";
                return false;
            } else {
                $('#txtError5').hide();
            }
            if (size <= 0) {
                $('#txtError5').text("附件大小不能为0M！").show();
                target.value = "";
                return false;
            } else {
                $('#txtError5').hide();
            }
            $('#txtError5').text("上传成功").show();
        }

        $("#File").on("change", function () {
            fileChange(this);
        })
        //关键词验证
        if (keyword == '') {
            $('#txtError6').text('请填写关键词').show();
            form.find('#keyword').focus();
            return false;
        } else {
            $('#txtError6').hide();
            var itemVal = keyword.split(',');
            if (itemVal.length > 5) {
                $('#txtError6').text('关键词个数不能超过5个').show();
                form.find('#keyword').focus();
                return false;
            } else {
                $('#txtError6').hide();
                for (var i = 0; i < itemVal.length; i++) {
                    var val = itemVal[i];
                    if (val.length > 20) {
                        $('#txtError6').text('每个关键词字数不能超过20字符').show();
                        form.find('#keyword').focus();
                        return false;
                    } else {
                        $('#txtError6').hide();
                        /*if(reg.test(val)){
                         $('#txtError6').text('请输入正确的关键字').show();
                         form.find('#keyword').focus();
                         return false;
                         }else{
                         $('#txtError6').hide();
                         }*/
                    }
                }
            }
        }
        //沟通方式验证
        if (ripe == '请选择...') {
            $('#txtError7').text('请选择沟通方式').show();
            form.find('.ripe').focus();
            return false;
        } else {
            $('#txtError7').hide();
        }
        //项目预算费用验证
        if (projectMoney == '') {
            $('#txtError8').text('请填写项目预算费用').show();
            form.find('.projectMoney').focus();
            return false;
        } else {
            $('#txtError8').hide();
            if (!reg1.test(projectMoney)) {
                $('#txtError8').text('只能输入数字').show();
                form.find('.projectMoney').focus();
                return false;
            } else {
                $('#txtError8').hide();
            }
        }
        //联系人验证
        if ($.trim(telperson) == '') {
            $('#txtError9').text('请填写联系人姓名').show();
            form.find('.telperson').focus();
            return false;
        } else {
            $('#txtError9').hide()
            if (reg.test(telperson)) {
                $('#txtError9').text('请正确输入联系人姓名').show();
                form.find('.telperson').focus();
                return false;
            } else {
                $('#txtError9').hide();
            }
        }
        //联系人电话验证
        if (tel == '') {
            $('#txtError10').text('请填写联系人电话').show();
            form.find('.tel').focus();
            return false;
        } else {
            $('#txtError10').hide()
            if (!reg2.test(tel)) {
                $('#txtError10').text('请正确输入联系人电话').show();
                form.find('.tel').focus();
                return false;
            } else {
                $('#txtError10').hide();
            }
        }
        return flag;
    },
    assignment: function () {
        var form = $('#form1');
        var tecfieId = form.find('.skillList1 option:selected').val(),
            cooperation = form.find('.teamList option:selected').val(),
            communication = form.find('.ripe option:selected').val();//沟通方式
        var needName = form.find('.needName').val(),//需求名称
            skillList1 = form.find('.skillList1 option:selected').text(),//技术领域
        /*skillListyyy = form.find('.skillList1 option:selected').val(),//技术领域
         alert(skillListyyy);*/
            teamList = form.find('.teamList option:selected').text(),//合作方式
            content = UE.getEditor('editor').getContentTxt(),//具体介绍
            file = form.find('#File'),//需求附件
            keyword = form.find('#keyword').val(),//关键词
            ripe = form.find('.ripe option:selected').text();//沟通方式
        projectMoney = form.find('.projectMoney').val(),//项目预算费用
            telperson = form.find('.telperson').val(),//联系人
            tel = form.find('.tel').val();//联系人电话
        var releaseSure = $('.releaseSure');
        releaseSure.find('.needName').text(needName);
        $("#demname").val(needName);
        releaseSure.find('.skill').text(skillList1);
        $("#tecfieId").val(tecfieId);
        releaseSure.find('.team').text(teamList);
        $("#cooperation").val(cooperation);
        releaseSure.find('.content').text(content);
        $("#introduce").val(content);
        releaseSure.find('.keyword').text(keyword);
        $("#keywords").val(keyword);
        releaseSure.find('.communicate').text(ripe);
        $("#communication").val(communication);
        if (projectMoney == '') {
            releaseSure.find('.money').text('');
        } else {
            releaseSure.find('.money').text(projectMoney + '万元');
            $("#cost").val(projectMoney);
        }
        releaseSure.find('.telperson').text(telperson);
        $("#contact").val(telperson);
        releaseSure.find('.tel').text(tel);
        $("#phonenumber").val(tel);
    }
}
//确认发布
var saveJs = {
    saveClick: function () {
        var save = $("#save");
        save.click(function () {
            layer.open({
                title: '提示',
                content: '<div>确认发布需求？</div>',
                btn: ['确认', '取消'],
                yes: function (index, layero) {
                    layer.close(index);
                    $("#formy2").submit();
                },
                cancel: function (index, layero) {
                    layer.close(index);
                }
            })
        })
    }
}