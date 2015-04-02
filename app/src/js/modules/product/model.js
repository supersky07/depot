'use strict';

var product = function () {
	this.name = 'wudi3';
	this.pageType = 'add';
	this.onChanges = [];
	this.data = {};
	this.getDataById();
};

product.prototype.subscribe = function (onChange) {
	this.onChanges.push(onChange);
};

product.prototype.inform = function () {
	this.onChanges.forEach(function (cb) { cb(); });
};

product.prototype.save = function (data) {
	var url = '/product/add';

	if (data['_id']) {
		url = '/product/edit';
	}

	$.ajax({
		type: 'POST',
		url: url,
		data: data,
		success: function (json) {
			if (json.code == 100000) {
				alert('保存成功');
			} else {
				alert(json.msg);
			}
		},
		error: function () {
			alert('error');
		}
	});
};

product.prototype.getDataById = function () {
	var that = this;
	var _id = window.location.href.indexOf('id=') > -1 ? window.location.href.split('id=')[1] : '';
	if (_id != '') {
		this.pageType = 'edit';
		$.ajax({
			type: 'POST',
			url: '/product/getProductById',
			data: {id: _id},
			success: function (json) {
				if (json.code == 100000) {
					that.data = json.data;
					that.inform();
				} else {
					alert(json.msg);
				}
			},
			error: function () {
				alert('error');
			}
		});
	}
};


module.exports = product;