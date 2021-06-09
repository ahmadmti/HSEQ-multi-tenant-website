const request = require('request');

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


let pikoPako = {
    createRestaurant: async (data) => {
        try {
            return new Promise(function (resolve, reject) {
                request.post(`${process.env.Piko_Pako_URL}/PizzaReborn/signup`, { form: data }, function (error, response, body) {
                    console.log(body);
                    if (isJson(body))
                        body = JSON.parse(body);
                    console.log(body, 'body');
                    if (body.success !== undefined && !body.success) {
                        reject(false)
                    } else {
                        resolve(body);
                    }
                    console.log(response, 'response')
                    console.log(error, 'error');
                    if (error)
                        throw error;

                });
            });
        } catch (e) {
            throw e;
        }
    },
    syncMenus: async (data) => {
        try {
            console.log(data);
            return new Promise(function (resolve, reject) {
                request.post(`${process.env.Piko_Pako_URL}/PizzaReborn/add_food_item`, { form: data }, function (error, response, body) {
                    console.log(body)
                    if (isJson(body))
                        body = JSON.parse(body);

                    console.log(body, 'body');
                    if (body.success !== undefined && !body.success) {
                        reject(false)
                    } else {
                        resolve(body);
                    }
                    console.log(response, 'response')
                    console.log(error, 'error');
                    if (error)
                        throw error;

                });
            });
        } catch (e) {
            throw e;
        }
    },
};


module.exports = pikoPako;