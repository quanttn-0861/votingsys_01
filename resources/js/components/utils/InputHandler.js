import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export function handleInputChange(event) {
    let input = event.target.name;
    this.setState({
        [input]: event.target.value
    });
}
