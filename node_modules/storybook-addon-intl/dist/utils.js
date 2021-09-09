"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.omit = omit;
function omit(obj, props) {
    return Object.keys(obj).filter(function (p) {
        return !~props.indexOf(p);
    }).reduce(function (accu, p) {
        accu[p] = obj[p];
        return accu;
    }, {});
}