/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import $ from 'jquery';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

$(function(){
    let fetchTypes = [
        'text/plain',
        'text/html',
        'application/json'
    ];

    let ajaxTypes = [
        'text',
        'html',
        'json',
    ];

    let body = $('body');

    let report = function(method, type, data) {
        let clazz = (data.length === 0)
            ? 'success'
            : 'error';

        body.append(`<p class=${clazz}>Request via ${method} for ${type} returned content with a length: ${data.length}</p>`);
    }

    let getData = async function(headers) {
        headers = headers || {};

        let response = await fetch(
            '/data', {
                headers,
            }
        );

        return response.text();
    }

    fetchTypes.forEach(type => {
        let headers = {
            'Content-Type':type,
            'X-Requested-With':'XMLHttpRequest',
        };

        getData(headers).then(
            data => report('fetch api with X-Requested-With', type, data)
        );
    });

    fetchTypes.forEach(type => {
        let headers = {
            'Content-Type':type,
        };

        getData(headers).then(
            data => report('fetch api', type, data)
        );
    });

    ajaxTypes.forEach(dataType => {
        $.ajax({
            url:'/data?ajax',
            dataType,
        }).then(
            (data, status, req) => report('$.ajax', dataType, data)
        )
    })
});
