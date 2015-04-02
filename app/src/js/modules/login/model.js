'use strict';

var Login = function () {
	this.onChanges = [];
};

Login.prototype.subscribe = function (onChange) {
	this.onChanges.push(onChange);
};

Login.prototype.inform = function () {
	this.onChanges.forEach(function (cb) { cb(); });
};

Login.prototype.doLogin = function (user, pswd) {
	var that = this;
    var pswd = this.do_encrypt(pswd);
	$.ajax({
        url: "/login/doLogin",
        data: {
            user: user,
            pswd: pswd
        },
        type: "GET",
        success: function (data) {
            var temp = eval( "(" + data + ")");
            if (temp.code == 0) {
                window.location.replace("templateMerge.html");
            } else {
                that.logErr = temp.msg || '登陆失败';
                that._inform();
            }
        }
    });
};

Login.prototype.saveUser = function (user, pswd) {
	var that = this;
    var pswd = this.do_encrypt(pswd);
	$.ajax({
        url: "/login/saveUser",
        data: {
            user: user,
            pswd: pswd
        },
        type: "GET",
        success: function (json) {
            if (json.code == 100000) {
                console.log('ok');
            } else {
                
            }
        }
    });
};

Login.prototype.checkLogin = function () {
    $.ajax({
        url: "/login/checkLogin",
        type: "GET",
        success: function (data) {
            var temp = eval( "(" + data + ")");
            if (temp.code == 0) {
                window.location.replace("templateMerge.html");
            }
        }
    });
};

Login.prototype.do_encrypt = function (value) {
    return $.md5(value);
};


module.exports = Login;