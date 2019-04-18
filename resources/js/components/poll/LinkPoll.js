import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class LinkPoll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            link_user: '',
            link_admin: '',
        }
    }

    componentDidMount () {
        const link_user = this.props.location.state.link_user
        const link_admin = this.props.location.state.link_admin
        this.setState({
            link_user: link_user,
            link_admin: link_admin,
        })
    }

    render() {
        var app_url = window.Laravel.baseUrl
        var link_user = app_url+"/vote/"+this.state.link_user
        var link_admin = app_url+"/vote/"+this.state.link_admin
        return (
            <section className="item-category-area section-gap">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 pb-80 header-text text-center text-center2">
                            <div className="tab-link">
                                <div className="tab-link-head">
                                    <p> Spoll</p>

                                </div>
                                <div className="tab-link-body">
                                    <h3>Cảm ơn, <span>Nam</span> !</h3>
                                    <h4>Poll của bạn đã được tạo thành công !</h4>
                                    <p>Dưới đây là 2 link được gửi tới email <i>xnam779@mail.com</i></p>
                                    <i><a href="">Nếu bạn chưa nhận được email, hãy kích vào đây...</a></i>
                                    <div className="line-link" />
                                    <p><strong>Link để mời</strong></p>
                                    <p><i>Gởi link này đến bất kỳ ai bạn muốn mời họ tham gia bình chọn</i></p>
                                    <i><a href="link here" target="blank">{link_user}</a></i>&nbsp;
                                    <button className="btn btn-success btn-xs" data-clipboard-text={link_user}>
                                        <span className="glyphicon glyphicon-copy"></span> Copy link
                                    </button>
                                    <div className="line-link" />
                                    <p><strong>Link quản lý</strong></p>
                                    <p><i>Truy cập vào link này để thay đổi, đóng hoặc xóa poll</i></p>
                                    <i><a href="link here" target="blank">{link_admin}</a></i>&nbsp;
                                    <button className="btn btn-success btn-xs" data-clipboard-text={link_admin}>
                                        <span className="glyphicon glyphicon-copy"></span> Copy link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
