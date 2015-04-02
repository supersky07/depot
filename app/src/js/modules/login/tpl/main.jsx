/** @jsx React.DOM */
'use strict';
var that = {};
var Header = require('../../common/tpl/header');

var Login = React.createClass({
    render: function () {
        return (
        	<div>
				<Header user='' />
				<div className="row T_Mt100">
			  		<div className="col-md-10">
			  			<div className="col-md-4">
						</div>
						<div className="col-md-5">
							<form className="form-horizontal">
							  <div className="form-group">
							    <label for="inputEmail3" className="col-sm-2 control-label">账号</label>
							    <div className="col-sm-10">
							      <input type="email" className="form-control" id="inputEmail3" placeholder="请输入用户名" />
							    </div>
							  </div>
							  <div className="form-group">
							    <label for="inputPassword3" className="col-sm-2 control-label">密码</label>
							    <div className="col-sm-10">
							      <input type="password" className="form-control" id="inputPassword3" placeholder="请输入密码" />
							    </div>
							  </div>
							  <div className="form-group">
							    <div className="col-sm-offset-2 col-sm-10">
							      <div className="checkbox">
							        <label>
							          <input type="checkbox"/> 记住我的密码
							        </label>
							      </div>
							    </div>
							  </div>
							  <div className="form-group">
							    <div className="col-sm-offset-2 col-sm-10">
							      <button type="submit" className="btn btn-default">登录</button>
							      <button type="button" className="btn btn-default T_ML10">忘记密码</button>
							    </div>
							  </div>
							</form>
						</div>
			  		</div>
			  	</div>
			</div>
        );
    }
});

var render = function(){
    React.renderComponent(
        <Login model={window.login.model}/>,
        document.getElementById('container')
    );
};
that.render = render;

module.exports = that;