/** @jsx React.DOM */
'use strict';
var that = {};
var Header = require('../../common/tpl/header');
var Left = require('../../common/tpl/left');
var Product = require('./productEdit');

var AddProduct = React.createClass({
    render: function () {
        return (
        	<div>
				<Header user={this.props.model.name} />
				<div className="row">
			  		<div className="col-md-2">
						<Left page="product" />
			  		</div>
			  		<div className="col-md-10">
			  			<Product data={this.props.model.data} pageType={this.props.model.pageType} save={this.props.model.save}/>
			  		</div>
			  	</div>
			</div>
        );
    }
});

var render = function(){
    React.renderComponent(
        <AddProduct model={window.product.model}/>,
        document.getElementById('container')
    );
};
that.render = render;

module.exports = that;