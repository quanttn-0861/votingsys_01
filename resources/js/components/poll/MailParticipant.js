import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { handleInputChange } from '../utils/InputHandler';
import { WithContext as ReactTags } from 'react-tag-input';
import '../../../templates/votingsys/css/tags-input.css';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class MailParticipant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
        };
    }
  
    handleDelete = (i) => {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition = (tag) => {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    handleOnClick = () => {
        this.props.getTagsEmail(this.state.tags)
    }

    render() {
        const { tags } = this.state;
        let placeholder = 'Nhập mail người tham gia';
        return (
            <React.Fragment>
                <h2 className="fs-title">Người tham gia</h2>
                <strong>Nếu bạn muốn gởi thư mời tham gia bầu chọn đến email cụ thể, hãy nhập vào ô dưới
                    đây
                </strong>
                <div className="my-tags">
                    <ReactTags tags={tags}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        handleDrag={this.handleDrag}
                        placeholder={placeholder}
                        delimiters={delimiters} />
                </div>
                <input type="button" name="previous" className="previous action-button" value="Previous" onClick={this.props.setFieldset3} />
                <input type="button" name="submit" className="action-button" value="Submit" onClick={this.handleOnClick} />
            </React.Fragment>
        );
    }
}
