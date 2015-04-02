/** @jsx React.DOM */
'use strict';
var that = {};
var Header = require('../../common/tpl/header');
var Left = require('../../common/tpl/left');
var HomeTable = require('./homeTable');

var Home = React.createClass({
    render: function () {
        return (
        	<div>
				<Header user={this.props.model.name} />
				<div className="row">
			  		<div className="col-md-2">
						<Left page="home" />
			  		</div>
			  		<div className="col-md-10">
			  			<HomeTable data={this.props.model.data} />
			  		</div>
			  	</div>
			</div>
        );
    }
});

var render = function(){
    React.renderComponent(
        <Home model={window.home.model}/>,
        document.getElementById('container')
    );
};
that.render = render;

module.exports = that;