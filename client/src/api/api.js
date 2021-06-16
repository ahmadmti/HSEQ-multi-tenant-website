import instance from './axiosConfig';

function token() {
    if (localStorage.getItem('auth_user')) {
        let data = localStorage.getItem('auth_user');
        let parseData = JSON.parse(data);
        return parseData.token;
    }
    return null;

}
function headers() {
    return {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token()
    }
}
// dasboard 

export async function login({ email, password }) {
    return await instance.post('/auth/login', { email, password });
}

export async function changePassword({ old_password, new_password }) {
    return await instance.post('/auth/change-password', { old_password, new_password }, { headers: headers() });
}


export async function sendForgotEmailLink({ email }) {

    return await instance.post('/auth/forgot-password-email-link', { email }, { headers: headers() });
}


export async function resetPassword({ password, id, token }) {

    return await instance.post('/auth/reset-password', { password, id, token }, { headers: headers() });
}

export async function getCompanyDetail() {
    return await instance.get('/company/get-company', { headers: headers() });
}


export async function companyDetail(data) {
    return await instance.post('/company/add-details', data, { headers: headers() });
}

export async function loadSideBar() {
    return await instance.get('/sidebar/get-item', { headers: headers() });
}






