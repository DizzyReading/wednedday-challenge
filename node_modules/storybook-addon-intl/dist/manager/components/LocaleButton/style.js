'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (props) {
    return _extends({}, defaultStyle, props.active ? activeStyle : {});
};

var defaultStyle = exports.defaultStyle = {
    height: '50px',
    width: '100px',
    padding: '5px',
    border: 0,
    borderRight: '1px solid #d3d3d3',
    borderBottom: '1px solid #d3d3d3',
    background: 'none',
    lineHeight: '30px',
    textAlign: 'center',
    textTransform: 'uppercase',
    transitionProperty: 'background',
    transitionDuration: '100ms',
    transitionTimingFunction: 'linear'
};

var activeStyle = exports.activeStyle = {
    background: '#f7f7f7',
    fontWeight: 'bold'
};

;