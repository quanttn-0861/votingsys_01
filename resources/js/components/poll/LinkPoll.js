import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class LinkPoll extends Component {
    render() {
        return (
            <section className="item-category-area section-gap">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 pb-80 header-text text-center text-center2">
                                Tạo Poll,thành công, làm link ở phần pull link
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
