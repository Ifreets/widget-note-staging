import axios from 'axios'
import domain from './domain'

let key = '0cf5516973a145929ff36d3303183e5f'

let url_string = window.location.href
let url = new URL(url_string);
let token = url.searchParams.get("access_token");

export default {
    post: (params, proceed) => {
        const { access_token, path, body } = params

        axios
            .post(
                domain + path,
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: access_token ? access_token : token,
                        key
                    }
                }
            )
            .then(response => {
                proceed(null, response)
            })
            .catch(error => {
                proceed(error.response)
            });
    },
    chatbox_post: (url, body, proceed) => {

        axios
            .post(
                url,
                body
            )
            .then(response => {
                proceed(null, response)
            })
            .catch(error => {
                proceed(error.response)
            });
    }
}