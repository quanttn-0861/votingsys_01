import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { handleInputChange } from '../utils/InputHandler';

export default class MailParticipant extends Component {
	render() {
		return (
			<React.Fragment>
				<h2 className="fs-title">Người tham gia</h2>
				<strong>Nếu bạn muốn gởi thư mời tham gia bầu chọn đến email cụ thể, hãy nhập vào ô dưới
                    đây
                </strong>
				<input name='tags' className='form-control' placeholder='Nhập Email người tham gia...'
					autoFocus />
				<input type="button" name="previous" className="previous action-button" value="Previous" onClick={this.props.setFieldset3} />
				<input type="button" name="previous" className="previous action-button" value="Submit" onClick={this.props.handleSubmit} />
			</React.Fragment>
		);
	}
}
