const { getConnection } = require('../../dbConfig/connectionManger');
const commonDBConnection = require('../../dbConfig/commonDBConnection');

const { capitalizeFirstLetter } = require('../../utils/helper');
const bcrypt = require('bcrypt');
const fs = require('fs');

async function checkDuplicateRole(role) {
    try {
        let count = await getConnection()('roles').where({ name: role }).count('*', { 'as': 'total' }).first();
        return count.total;
    } catch (e) {
        console.log(e)
        throw e;
    }
}
async function checkDuplicateEmail(email, id = null) {
    try {
        let query = getConnection()('users').where({ email }).count('*', { 'as': 'total' }).first();
        if (id) {
            query.where('id', '!=', id);
        }
        let count = await query;
        return count.total;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

let UserController = {

    updateUser: async(req, res) => {
        const { id, email, image, new_password, phone_number, user_name, role_id, status } = req.body;

        try {
            if (await checkDuplicateEmail(email, id) <= 0) {
                if (new_password) {
                    let hashPassword = bcrypt.hashSync(new_password, parseInt(process.env.SALT_ROUNDS));
                    await getConnection()('users').where('id', id).update({ password: hashPassword });
                }
                userName = user_name.split(' ', 1)
                let row = await getConnection()('users').where('id', id).update({
                    name: user_name,
                    email,
                    phone_no: phone_number,
                    role_id: role_id,
                    status
                });

                let fileName = null;
                if (image) {
                    const base64Image = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                    let ImageBuffer = Buffer.from(base64Image[2], 'base64');
                    fileName = (userName + role_id + '.png').replace(/\s/g, '');
                    try {


                        await fs.writeFile(`public/images/profile/${fileName}`, ImageBuffer, async function(err) {

                            if (err) {
                                console.log(err);
                                throw "Issue In File"

                                // res.status(409).json({ error: 'Have Some issue In File ' })
                            }
                            if (!err) {
                                await getConnection()('users').where('id', id).update({
                                    profile_img: fileName
                                });
                            }
                        });

                        res.status(201).json({ 'message': "User Update Successfully" })
                    } catch (e) {
                        res.status(500).json({
                            error: e
                        })
                    }
                }
                if (!image) {

                    res.status(201).json({ 'message': "User Update Successfully" })
                }
            } else {
                res.status(409).json({
                    error: "User Already Exist"
                })
            }
        } catch (e) {
            console.log(e)
            throw e;
        }
    },

    removeUser: async(req, res) => {
        try {
            let { id } = req.body;
            let users = await getConnection()('users')
                .where('id', id)
                .del();
            res.status(200).json({ message: "Record Remove Successfully" })

        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e })
        }
    },
    getAllUser: async(req, res) => {
        try {

            let users = await getConnection()('users')
                .innerJoin(`${process.env.DB_DATABASE}.roles`, 'users.role_id', `${process.env.DB_DATABASE}.roles.id`)
                .where(`${process.env.DB_DATABASE}.roles.status`, 1)
                .select(['users.*', `${process.env.DB_DATABASE}.roles.id as role_id`, `${process.env.DB_DATABASE}.roles.display_name as role_name`]);
            console.log(users)
            res.status(200).json({ users })

        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e })
        }
    },

    getCompleteUser: async(req, res) => {
        try {

            let users = await getConnection()('users')
                .select(['users.*']);
            console.log(users)
            res.status(200).json({ users })

        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e })
        }
    },
    createUser: async(req, res) => {
        const { email, image, password, phone_number, user_name, role_id, status } = req.body;

        try {
            if (await checkDuplicateEmail(email) <= 0) {
                let hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
                userName = user_name.split(' ', 1)
                let row = await getConnection()('users').insert({
                    name: user_name,
                    email,
                    phone_no: phone_number,
                    password: hashPassword,
                    role_id: role_id,
                    status
                });
                let fileName = null;
                if (image) {
                    const base64Image = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                    let ImageBuffer = Buffer.from(base64Image[2], 'base64');
                    fileName = (userName + role_id + '.png').replace(/\s/g, '');
                    try {


                        await fs.writeFile(`public/images/profile/${fileName}`, ImageBuffer, async function(err) {

                            if (err) {
                                console.log(err);
                                throw "Issue In File"

                                // res.status(409).json({ error: 'Have Some issue In File ' })
                            }
                            if (!err) {
                                await getConnection()('users').where('id', row[0]).update({
                                    profile_img: fileName
                                });
                            }
                        });

                        res.status(201).json({ 'message': "User Created Successfully" })
                    } catch (e) {
                        res.status(500).json({
                            error: e
                        })
                    }
                }
                if (!image) {

                    res.status(201).json({ 'message': "User Created Successfully" })
                }

            } else {
                res.status(409).json({
                    error: 'User Already Exist'
                })
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: e
            })
        }
    },



    getRoles: async(req, res) => {
        try {
            let record = await commonDBConnection('roles').where('status', 1).select(['id', 'display_name']);
            res.status(200).json({
                roles: record
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e })
        }
    },

};

module.exports = UserController;