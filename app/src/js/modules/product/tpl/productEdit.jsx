/** @jsx React.DOM */
'use strict';
var Product = React.createClass({
    getInitialState: function() {
        return {
            name: this.props.data.name,
            total: this.props.data.total,
            left: this.props.data.left,
            price: this.props.data.price,
            sale: this.props.data.sale
        };
    },
    handleChange: function (type, evt) {
        var val = evt.target.value;
        var data = {};
        if (type != 'name') {
            val = val.replace(/[^\.\d]/g, '');
        }
        data[type] = val;
        this.props.data[type] = val;
        this.setState(data);
    },
    save: function (id) {
        var postData = {};
        postData['_id'] = id;

        for (var o in this.state) {
            postData[o] = this.refs[o].getDOMNode().value;
        }

        this.props.save(postData);
    },
    back: function () {
        window.location.href = '/home';  
    },
    render: function() {
        var buttonArea = (
            <div className="col-sm-offset-4 col-sm-4">
                <button className="btn btn-primary btn-lg btn-block" onClick={this.save.bind(this, this.props.data._id)}>保存</button>
            </div>
        );
            
        if (this.props.pageType == 'edit') {
            buttonArea = (
                <div>
                    <div className="col-sm-offset-4 col-sm-2">
                        <button className="btn btn-primary btn-lg btn-block" onClick={this.save.bind(this, this.props.data._id)}>保存</button>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-primary btn-lg btn-block" onClick={this.back}>返回</button>
                    </div>
                </div>
            );
        }
        return (
            <div className="form-horizontal" role="form">
                <div className="form-group">
                    <label for="inputName" className="col-sm-offset-2 col-sm-2 control-label">名称</label>
                    <div className="col-sm-4">
                        <input type="text" ref="name" className="form-control" id="inputName" placeholder="名称" value={this.props.data.name} onChange={this.handleChange.bind(this, 'name')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputTotal" className="col-sm-offset-2 col-sm-2 control-label">总量</label>
                    <div className="col-sm-4">
                        <input type="text" ref="total" className="form-control" id="inputTotal" placeholder="总量" value={this.props.data.total} onChange={this.handleChange.bind(this, 'total')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputLeft" className="col-sm-offset-2 col-sm-2 control-label">余量</label>
                    <div className="col-sm-4">
                        <input type="text" ref="left" className="form-control" id="inputLeft" placeholder="余量" value={this.props.data.left} onChange={this.handleChange.bind(this, 'left')} />
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputPrice" className="col-sm-offset-2 col-sm-2 control-label">进价</label>
                    <div className="col-sm-4">
                        <input type="text" ref="price" className="form-control" id="inputPrice" placeholder="进价" value={this.props.data.price} onChange={this.handleChange.bind(this, 'price')} />
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputSale" className="col-sm-offset-2 col-sm-2 control-label">售价</label>
                    <div className="col-sm-4">
                        <input type="text" ref="sale" className="form-control" id="inputSale" placeholder="售价" value={this.props.data.sale} onChange={this.handleChange.bind(this, 'sale')} />
                    </div>
                </div>
                <div className="form-group">
                    {buttonArea}
                </div>
            </div>
        );
    }
});

module.exports = Product;