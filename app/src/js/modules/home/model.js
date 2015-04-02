'use strict';

var home = function () {
	this.name = 'wudi3';
	this.onChanges = [];
	// this.data = [
	// 	{seq: 1, name: '阿斯顿框架和', num: 123, id: '1'},
	// 	{seq: 2, name: '2', num: 321, id: '2'},
	// 	{seq: 3, name: '3', num: 321, id: '3'},
	// 	{seq: 4, name: '4', num: 321, id: '4'},
	// 	{seq: 5, name: '5', num: 321, id: '5'},
	// 	{seq: 6, name: '6', num: 321, id: '6'},
	// 	{seq: 7, name: '7', num: 321, id: '7'}
	// ];
	this.data = [];
	this.getAllData();
};

home.prototype.subscribe = function (onChange) {
	this.onChanges.push(onChange);
};

home.prototype.inform = function () {
	this.onChanges.forEach(function (cb) { cb(); });
};

home.prototype.getAllData = function () {
	var that = this;
	$.ajax({
		type: 'get',
		url: '/home/getProducts',
		data: {},
		success: function (json) {
			if (json.code == 100000) {
				that.data = json.data;
				for(var i = 0; i < that.data.length; i++) {
					that.data[i]['seq'] = i + 1;
				}
				that.inform();
			} else {
				alert(json.msg);
			}
		},
		error: function () {
			alert('error');
		}
	});
};


module.exports = home;