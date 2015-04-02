/** @jsx React.DOM */
'use strict';
var OneItem = React.createClass({
	render: function(){
		return (
			<tr>
          		<td>{this.props.data.seq}</td>
          		<td>{this.props.data.name}</td>
          		<td>{this.props.data.total}</td>
          		<td>{this.props.data.left}</td>
          		<td>{this.props.data.price}</td>
          		<td>{this.props.data.sale}</td>
          		<td className="text-center">
	          		<a href="javascript:;" onClick={this.props.edit.bind(this, this.props.data._id)}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>
	          		<a href="javascript:;" onClick={this.props.del.bind(this, this.props.data._id)} className="T_ML10"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
	          	</td>
        	</tr>
		);
	}
});

var PageZone = React.createClass({
	nextPage: function (spec) {
		if (this.refs.next.getDOMNode().className.indexOf('disabled') > -1) return;
		this.props.nextPage();
	},
	prevPage: function () {
		if (this.refs.prev.getDOMNode().className.indexOf('disabled') > -1) return;
		this.props.prevPage();
	},
	render: function(){
		var prevCss = 'previous disabled';
		var nextCss = 'next disabled';

		if (this.props.page > 1) {
			prevCss = 'previous';
		}

		if (this.props.totalPage > this.props.page) {
			nextCss = 'next';
		}

		return (
			<nav>
			  	<ul className="pager">
			    	<li className={prevCss} ref="prev"><a href="javascript:;" onClick={this.prevPage}><span aria-hidden="true">&larr;</span> 上一页</a></li>
			    	<li className={nextCss} ref="next"><a href="javascript:;" onClick={this.nextPage}>下一页 <span aria-hidden="true">&rarr;</span></a></li>
			  	</ul>
			</nav>
		);
	}
});

var SearchZone = React.createClass({
	change: function () {
		var keyword = this.refs.keyword.getDOMNode().value;
		this.props.change(keyword);
	},
	render: function(){
		return(
			<div className="input-group">
		      	<input type="text" ref="keyword" className="form-control" placeholder="按名称查找" onChange={this.change} />
		    </div>
		);
	}
});

var HomeTable = React.createClass({
	getInitialState: function () {
        return {
            page: 1,
            num: 5,
            filter: ''
        };
    },
    nextPage: function () {
    	this.setState({page: this.state.page + 1});
    },
    prevPage: function () {
    	this.setState({page: this.state.page - 1});
    },
	getDataByState: function(){
		var start = (this.state.page - 1) * this.state.num + 1;
		var end = start + 4;
		var tempData = [];
		var filter_data = [];

		filter_data = this.props.data.filter(function(item){
			var filter = this.state.filter;
			if(item.name.indexOf(filter) > -1){
				return true;
			}else{
				return false;
			}
		}, this);

		for (var i = start - 1; i < end; i++) {
			if (filter_data[i]) {
				var temp = tempData.length;
				tempData[temp] = filter_data[i];
				tempData[temp].seq = i + 1;
			} else {
				break;
			}
		}
		

		return tempData;
	},
	doSearch: function(keyword){
		this.setState({page: 1, filter: keyword});
	},
	edit: function (id) {
		window.location.href = "/product?id=" + id;
	},
	del: function (id) {
		alert(id);
	},
  	render: function() {
  		var tempData = this.getDataByState();
  		var totalPage = Math.ceil(this.props.data.length / this.state.num);

  		var items = tempData.map(function(item){
  			return (
  				<OneItem data={item} edit={this.edit} del={this.del}/>
  			);
  		}, this);

	    return (
	    	<div>
		    	<div className="row">
			  		<div className="col-md-2 pull-right">
			      		<SearchZone change={this.doSearch} />
			      	</div>
			    </div>
			    <table className="table table-bordered table-hover">
		  			<caption></caption>
			      	<colgroup span='7'>
			      		<col className="T_W10P"></col>
			      		<col></col>
			      		<col></col>
			      		<col></col>
			      		<col></col>
			      		<col></col>
			      		<col className="T_W10P"></col>
			      	</colgroup>
			      	<thead>
			        	<tr>
			          		<th>序号</th>
			          		<th>名称</th>
			          		<th>总量</th>
			          		<th>余量</th>
			          		<th>进价</th>
			          		<th>售价</th>
			          		<th className="text-center">操作</th>
			        	</tr>
			      	</thead>
			      	<tbody>
			      		{items}
			      	</tbody>
			    </table>
			    <PageZone
			    	page={this.state.page}
			    	totalPage={totalPage}
			    	nextPage={this.nextPage}
			    	prevPage={this.prevPage} />
			</div>
	    );
  	}
});

module.exports = HomeTable;