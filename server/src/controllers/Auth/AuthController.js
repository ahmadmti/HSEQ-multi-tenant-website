const { validationResult } = require('express-validator')
const commonDBConnection = require('../../dbConfig/commonDBConnection')
const { getConnection, createConnectionConfig } = require('../../dbConfig/connectionManger')
const bcrypt = require('bcrypt')
const { generateAccessToken } = require('../../utils/generatTokens')
const { sendMail } = require('../../utils/mailer')
const { makeRandom, verifyRecaptcha } = require('../../utils/helper')
const knex = require('knex');

let AuthController = {
    login: (req, res) => {
        try {
            res.render('login', {
                form: (req.flash('form')[0]),
                csrf_token: req.csrfToken(),
                message: req.flash('msg'),
                errors: (req.flash('error')[0]),
            })

        } catch (e) {
            console.log(e);
            req.flash('error', [{ msg: 'Server Error' }])
            return res.redirect('/v1/auth/login')
        }
    },

    userLogin: async(req, res) => {
        // Validate Request
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body

        let user = await getConnection()('users')
            .select('*')
            .where({ email })
            .first()

        if (user && bcrypt.compareSync(password, user.password)) {
            if (user.status && user.is_active) {
                let data = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    rights: user.role_id,
                    profile_img: user.profile_img,
                }
                let token = generateAccessToken({ data })
                res.json({ message: "loginSuccess", token, user: data })
            } else res.status(403).json({ message: "notActive" })
        } else {
            res.status(404).json({
                message: "invalidCrd",
            })
        }
    },
    authenticate: async(req, res) => {
        try {
            let { email, password } = req.body;
            let user = await commonDBConnection('users').where('email', email).first();
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user
                res.redirect('/v1/admin/dashboard');
            } else {
                req.flash('error', [{ 'msg': 'Invalid Credentials' }])
                res.redirect('/v1/auth/login');
            }

        } catch (e) {
            console.log(e);
            req.flash('error', [{ 'msg': 'server error' }])
            res.redirect('/v1/auth/login');
        }

    }

    // webLogin: async (req, res) => {
    //   const { email, password } = req.body
    //   let user = await commonDBConnection('users')
    //     .where({ email })
    //     .select('*')
    //     .first()
    //   let form = {}

    //   if (user && bcrypt.compareSync(password, user.password)) {
    //     if (user.email_verified) {
    //       req.session.user = user

    //       if (user.is_admin) {
    //         res.redirect('admin/dashborad')
    //       } else {
    //         res.redirect('dashborad')
    //       }
    //     } else {
    //       form.email = email
    //       res.render('login', {
    //         errors: [{ msg: req.__("emailNotVerify") }],
    //         form,
    //       })
    //     }
    //   } else {
    //     form.email = email
    //     res.render('login', {
    //       errors: [{ msg: req.__("invalidCrd") }],
    //       form,
    //     })
    //   }
    // },
    // webRegister: async (req, res) => {
    //   const errors = validationResult(req).array()
    //   if (errors.length > 0) {
    //     return res.render('register', { errors: errors })
    //   }
    //   const { fname, lname, email, password } = req.body

    //   if (
    //     req.body['g-recaptcha-response'] === undefined ||
    //     req.body['g-recaptcha-response'] === '' ||
    //     req.body['g-recaptcha-response'] === null
    //   ) {
    //     return res.render('register', {
    //       errors: [{ msg: req.__("checkRecaptcha") }],
    //     })
    //   }

    //   if (await verifyRecaptcha(req)) {
    //     let user = await commonDBConnection('users')
    //       .where('email', email)
    //       .first()
    //     if (!user) {
    //       let hashPassword = bcrypt.hashSync(
    //         password,
    //         parseInt(process.env.SALT_ROUNDS)
    //       )
    //       let createdUser = await commonDBConnection('users').insert({
    //         fname,
    //         lname,
    //         email,
    //         password: hashPassword,
    //       })
    //       let mili = new Date()
    //       let token = makeRandom(20) + mili.getMilliseconds()
    //       await commonDBConnection('email_verification')
    //         .where({ email })
    //         .del()

    //       await commonDBConnection('email_verification').insert({ email, token })

    //       sendMail({
    //         from: `${process.env.mail_from_name}  ${process.env.mail_from_address}`,
    //         to: `${email}`,
    //         sender: 'Pizza Reborn',
    //         subject: 'Email Verification',
    //         html: `<p><a href="${process.env.APP_URL}/email-verify/${createdUser[0]}/${token}">${req.__("clickOn")} </a> ${req.__("verifyThis")}</p>`,
    //       })
    //       req.flash(
    //         'msg',
    //         req.__("regSuccess")

    //       )
    //       res.redirect('/login')
    //     } else {
    //       req.flash('msg', req.__("userExist"))
    //       res.redirect('/v1/register')
    //     }
    //   } else {
    //     res.render('register', { errors: [{ msg: req.__("checkRecaptcha") }] })
    //   }
    // },

    // forgotPasswordEmail: async (req, res) => {
    //   try {
    //     const { email } = req.body
    //     let query = await getConnection()('company_detail').select('domain').first();
    //     // console.log(query.domain)
    //     let user = await getConnection()('users').where('email', email).first();
    //     // console.log(user)
    //     if (query && user) {

    //       let mili = new Date()
    //       let token = makeRandom(20) + mili.getMilliseconds()
    //       // let check =await getConnection()('email_verification').where({ email }).first();



    //       await getConnection()('email_verification').insert({ email, token })
    //       sendMail({
    //         from: `${process.env.mail_from_name}  ${process.env.mail_from_address}`,
    //         to: `${email}`,
    //         sender: 'Pizza Reborn',
    //         subject: 'Reset Password',
    //         // html: `<p><a href=${query.domain}${process.env.APP_URL}/password-reset/${user.id}/${token}>Click on</a> this to verify Email</p>`,
    //         html: `<p><a href="http://${query.domain}.${process.env.Restaurant_forgot_URL}/password-reset/${user.id}/${token}">${req.__("forgotPasswordLink")}</a>${req.__("followLinkToChange")}</p>`,
    //       })
    //       res.status(201).json({ message: req.__("forgotPassLink") })
    //     }
    //     else {
    //       res.status(400).json({ message: req.__("emailNotExist") })

    //     }

    //   } catch (error) {
    //     console.log(error)
    //   }

    // },
    // resetPassword: async (req, res) => {
    //   let { id, token, password } = req.body
    //   let query = await getConnection()('email_verification').where({ 'token': token }).first();
    //   if (query) {
    //     let hashPassword = bcrypt.hashSync(
    //       password,
    //       parseInt(process.env.SALT_ROUNDS)
    //     )
    //     let updateUser = await getConnection()('users').where('id', id)
    //       .update(
    //         {
    //           'password': hashPassword
    //         })

    //     if (updateUser) {
    //       await getConnection()('email_verification')
    //         .where({ token })
    //         .del()
    //       res.status(201).json({ data: updateUser, 'message': req.__("passwordChange") })
    //     }
    //     else {
    //       res.status(400).json({ data: updateUser, 'error': req.__("somethingWrong") })

    //     }
    //   }
    //   else {
    //     res.status(400).json({ message: req.__("tokenMiss") })

    //   }
    // },
    // logout: async (req, res) => {
    //   try {
    //     req.session.user = null

    //     res.render('login')
    //   } catch (e) {
    //     console.log(e)

    //     res.redirect('admin/dashboard')
    //   }
    // },

    // forgotAdminPasswordEmail: async (req, res) => {
    //   try {
    //     const { email } = req.body;
    //     //  console.log(email)
    //     let user = await commonDBConnection('users')
    //       .where('email', email)
    //       .first()

    //     if (user) {

    //       let mili = new Date()
    //       let token = makeRandom(20) + mili.getMilliseconds()
    //       await commonDBConnection('email_verification')
    //         .where({ email })
    //         .del()

    //       await commonDBConnection('email_verification').insert({ email, token })

    //       sendMail({
    //         from: `${process.env.mail_from_name}  ${process.env.mail_from_address}`,
    //         to: `${email}`,
    //         sender: 'Pizza Reborn',
    //         subject: 'Reset Password',
    //         html: `<p><a href="${process.env.APP_URL}/reseting-password?id=${user.id}&token=${token}">${req.__("forgotPasswordLink")}</a>${req.__("followLinkToChange")}</p>`,
    //       })
    //       req.flash(
    //         'msg',
    //         req.__("resetPasswordLink")

    //       )
    //       res.redirect('/login')
    //     } else {
    //       res.render('forgotPassword', {
    //         errors: [{ msg: req.__("emailNotMatch") }],
    //         // form,
    //       })
    //       // req.flash('msg', 'Email not match with record')
    //       // res.redirect('/v1/login')
    //     }

    //   } catch (error) {
    //     console.log(error)
    //   }

    // },
    // resetAdminPassword: async (req, res) => {
    //   let { id, token, password } = req.body
    //   let query = await commonDBConnection('email_verification').where({ 'token': token }).first();
    //   if (query) {
    //     let hashPassword = bcrypt.hashSync(
    //       password,
    //       parseInt(process.env.SALT_ROUNDS)
    //     )
    //     let updateUser = await commonDBConnection('users').where('id', id)
    //       .update(
    //         {
    //           'password': hashPassword
    //         })

    //     if (updateUser) {
    //       await commonDBConnection('email_verification')
    //         .where({ token })
    //         .del()
    //       req.flash(
    //         'msg',
    //         req.__("passwordChange")

    //       )
    //       res.redirect('/login')
    //     }
    //     else {
    //       res.render('login', {
    //         errors: [{ msg: req.__("somethingWrong") }],
    //       })
    //       // res.redirect('/login')


    //     }
    //   }
    //   else {

    //     res.render('login', {
    //       errors: [{ msg: req.__("tokenMiss") }],
    //     })
    //     // res.redirect('/login')

    //   }
    // },
    // verifyEmail: async (req, res) => {
    //   let { id, token } = req.params
    //   let user = await commonDBConnection('users')
    //     .where('id', id)
    //     .first()

    //   if (user) {
    //     let verify = await commonDBConnection('email_verification')
    //       .where('email', user.email)
    //       .where('token', token)
    //       .first()
    //     if (verify) {
    //       await commonDBConnection('email_verification')
    //         .where('email', user.email)
    //         .where('token', token)
    //         .del()
    //       await commonDBConnection('users')
    //         .where('id', id)
    //         .update({ email_verified: new Date().toDateString() })
    //       req.flash('msg', req.__("emailVerified"))
    //       res.redirect('/login')
    //     } else {
    //       req.flash('msg', req.__("wrongAuth"))
    //       res.redirect('/login')
    //     }
    //   } else {
    //     req.flash('msg', req.__("wrongAuth"))
    //     res.redirect('/login')
    //   }
    // },
    // login: async (req, res) => {
    //   // Validate Request
    //   const errors = validationResult(req)
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() })
    //   }

    //   const { email, password } = req.body

    //   let user = await getConnection()('users')
    //     .select('*')
    //     .where({ email })
    //     .first()

    //   if (user && bcrypt.compareSync(password, user.password)) {
    //     if (user.status && user.is_active) {
    //       let data = {
    //         id: user.id,
    //         name: user.fname + '  ' + user.lname,
    //         email: user.email,
    //         rights: user.role_id,
    //         profile_img: user.profile_img,
    //       }
    //       let token = generateAccessToken({ data })
    //       res.json({ message: req.__("loginSuccess"), token, user: data })
    //     } else res.status(403).json({ message: req.__("notActive") })
    //   } else {
    //     res.status(404).json({
    //       message: req.__("invalidCrd"),
    //     })
    //   }
    // },
    // register: (req, res) => {
    //   res.send('Not avaiable')
    // },

    // changePassword: async (req, res) => {
    //   try {
    //     const { new_password, old_password } = req.body;
    //     const user = req.user;
    //     let userData = await getConnection()('users').select('*').where('id', user.data.id).first()
    //     if (bcrypt.compareSync(old_password, userData.password)) {
    //       let hashPassword = bcrypt.hashSync(
    //         new_password,
    //         parseInt(process.env.SALT_ROUNDS)
    //       )
    //       let updateUser = await getConnection()('users').where('id', user.data.id)
    //         .update(
    //           {
    //             'password': hashPassword
    //           })

    //       if (updateUser) {
    //         res.status(201).json({ data: updateUser, 'message': req.__("passwordChange") })
    //       }
    //       else {
    //         res.status(400).json({ data: updateUser, 'error': req.__("somethingWrong") })

    //       }
    //     }
    //     else {
    //       res.status(409).json({ 'error': req.__("oldPasswordNotMatch") })


    //     }

    //   } catch (error) {
    //     console.log(error)
    //   }
    // },


    // userManagement: async (req, res) => {
    //   results = [];
    //   let record = await commonDBConnection('additional_restaurant_users')
    //     .leftJoin('additional_users_tenants', 'additional_users_tenants.additional_restaurant_users_id', '=', 'additional_restaurant_users.id')
    //     .leftJoin('tenants', 'tenants.id', '=', 'additional_users_tenants.tenants_id')

    //     .select("additional_restaurant_users.*", "tenants.restaurant_name ");

    //   for (let row of record) {
    //     let exist = results.findIndex(item => item.id == row.id);
    //     if (exist <= -1) {
    //       let int = {

    //         restaurant_name: row.restaurant_name
    //       }
    //       results.push({
    //         id: row.id,
    //         fname: row.fname,
    //         email: row.email,
    //         status: row.status,
    //         address: row.address,
    //         phone_no: row.phone_no,
    //         expire_at: row.expire_at,
    //         email: row.email,
    //         restaurant: [{ ...int }]
    //       })
    //     } else {
    //       results[exist].restaurant.push({

    //         restaurant_name: row.restaurant_name
    //       });
    //     }
    //   };

    //   res.render("admin/manageUsers", {
    //     users: results,
    //     message: req.flash('msg'),
    //     helpers: {
    //       dateFormat: function (date) { return new Date(date).toDateString() }
    //     }
    //   })
    // },

    // createUser: async (req, res) => {
    //   let date = new Date().toISOString().slice(0, 10)

    //   let restaurants = await commonDBConnection.select('*').from('tenants').where('expire_on', '>=', date)
    //     .where('status', 1).where('is_active', 1).where('payment_status', 1);

    //   res.render("admin/createUser", {
    //     restaurants: restaurants,
    //     message: req.flash('msg'),

    //   })
    // },

    // addUser: async (req, res) => {
    //   try {
    //     const { fname, lname, email, expire_date, address,
    //       phone_no, password, status, restaurants } = req.body;
    //     let exist = await commonDBConnection('additional_restaurant_users')
    //       .where('email', email).first();
    //     if (exist) {
    //       req.flash('msg', req.__("emailExist"));
    //       res.redirect('users-manage');

    //     }


    //     else {

    //       let hashPassword = bcrypt.hashSync(
    //         password,
    //         parseInt(process.env.SALT_ROUNDS)
    //       )
    //       let user = await commonDBConnection('additional_restaurant_users').insert({
    //         fname,
    //         lname,
    //         email,
    //         status,
    //         address,
    //         phone_no,
    //         // expire_at: expire_date,
    //         password: hashPassword,


    //       })
    //       for (row of restaurants) {
    //         // console.log(row);

    //         let pivot = await commonDBConnection('additional_users_tenants').insert({
    //           additional_restaurant_users_id: user,
    //           tenants_id: row,

    //         })
    //         let restaurant = await commonDBConnection('tenants').where('id', row).first();
    //         let connection = knex(createConnectionConfig(restaurant));
    //         let roleId = await connection('roles').where('name', 'Menu Creator')
    //           .where('status', 1).select("*").first();

    //         let data = await connection('users').insert({
    //           fname,
    //           lname,
    //           email,
    //           status,
    //           address,
    //           phone_no,
    //           role_id: roleId.id,
    //           // expire_at:expire_date,
    //           password: hashPassword,
    //         });
    //         // console.log(data)
    //       }

    //       req.flash('msg', req.__("userCreated"));
    //       res.redirect('users-manage');
    //     }


    //   } catch (error) {
    //     console.log(error)
    //   }

    // },
    // editUser: async (req, res) => {
    //   try {
    //     let id = req.params.id;
    //     let exist = await commonDBConnection('additional_restaurant_users')
    //       .where('id', id).first();

    //     let restaurants = await commonDBConnection('additional_users_tenants')
    //       .where('additional_restaurant_users_id', id)
    //       .innerJoin('tenants', 'tenants.id', '=', 'additional_users_tenants.tenants_id')
    //       .select("*");
    //     let ids = [];
    //     for (let d of restaurants) {
    //       ids.push(d.id);
    //     }


    //     let addRestaurants = await commonDBConnection.select('*').from('tenants')
    //       .where('status', 1).where('is_active', 1).where('payment_status', 1).whereNotIn('id', ids);




    //     console.log(addRestaurants);
    //     res.render("admin/editUser", {
    //       users: exist,
    //       addRestaurants: addRestaurants,
    //       restaurants: restaurants,
    //       message: req.flash('msg'),
    //       helpers: {
    //         dateFormat: function (date) {

    //           var d = new Date(date);

    //           return d.getFullYear() + "-" + ((d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : ("0" + (d.getMonth() + 1))) + "-" + (d.getDate() >= 10 ? d.getDate() : ("0" + d.getDate()));
    //         },
    //         selected: function (foo, bar) {
    //           return foo == bar ? ' selected' : '';
    //         }

    //       },

    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }

    // },

    // updateUser: async (req, res) => {
    //   try {
    //     const { id, fname, lname, email, expire_date, address,
    //       phone_no, password, status } = req.body;

    //     let exist = await commonDBConnection('additional_restaurant_users')
    //       .where('email', email).count('*', { 'as': 'total' }).where('id', '!=', id).first();

    //     let existEmail = await commonDBConnection('additional_restaurant_users').where('id', id).first();
    //     if (exist.total > 0) {
    //       req.flash('msg', req.__("emailExist"));
    //       res.redirect('users-manage');

    //     }
    //     else {
    //       let hashPassword = bcrypt.hashSync(
    //         password,
    //         parseInt(process.env.SALT_ROUNDS)
    //       )
    //       if (password) {
    //         let user = await commonDBConnection('additional_restaurant_users').where('id', id).update({
    //           fname,
    //           lname,
    //           email,
    //           status,
    //           address,
    //           phone_no,
    //           // expire_at: expire_date,

    //           password: hashPassword,
    //         })
    //         let restaurants = await commonDBConnection('additional_users_tenants')
    //           .where('additional_restaurant_users_id', id).select('*');

    //         for (row of restaurants) {
    //           let restaurant = await commonDBConnection('tenants').where('id', row.tenants_id).first();
    //           let connection = knex(createConnectionConfig(restaurant));
    //           let roleId = await connection('roles').where('name', 'Menu Creator')
    //             .where('status', 1).select("*").first();
    //           let data = await connection('users').where('email', existEmail.email).update({
    //             fname,
    //             lname,
    //             email,
    //             status,
    //             address,
    //             phone_no,
    //             role_id: roleId.id,

    //             // expire_at:expire_date,
    //             password: hashPassword,
    //           });
    //           // console.log(data)
    //         }
    //       }
    //       else {
    //         let user = await commonDBConnection('additional_restaurant_users').where('id', id).update({
    //           fname,
    //           lname,
    //           email,
    //           status,
    //           address,
    //           phone_no,
    //           // expire_at: expire_date,

    //           // password:hashPassword,
    //         })
    //         let restaurants = await commonDBConnection('additional_users_tenants')
    //           .where('additional_restaurant_users_id', id).select('*');

    //         for (row of restaurants) {
    //           let restaurant = await commonDBConnection('tenants').where('id', row.tenants_id).first();
    //           let connection = knex(createConnectionConfig(restaurant));
    //           let roleId = await connection('roles').where('name', 'Menu Creator')
    //             .where('status', 1).select("*").first();
    //           let data = await connection('users').where('email', existEmail.email).update({
    //             fname,
    //             lname,
    //             email,
    //             status,
    //             address,
    //             role_id: roleId.id,

    //             phone_no,
    //           });
    //         }
    //       }


    //       req.flash('msg', req.__("recordUpdateSuccessfuly"));
    //       res.redirect('users-manage');
    //     }

    //   } catch (error) {
    //     console.log(error)
    //   }


    // },
    // addRestaurant: async (req, res) => {
    //   try {
    //     let { id, restaurants } = req.body;

    //     let user = await commonDBConnection('additional_restaurant_users').where('id', id).select("*").first();
    //     if (restaurants) {
    //       for (row of restaurants) {
    //         // console.log(row);

    //         let pivot = await commonDBConnection('additional_users_tenants').insert({
    //           additional_restaurant_users_id: id,
    //           tenants_id: row,

    //         })
    //         let restaurant = await commonDBConnection('tenants').where('id', row).first();
    //         let connection = knex(createConnectionConfig(restaurant));
    //         let roleId = await connection('roles').where('name', 'Menu Creator')
    //           .where('status', 1).select("*").first();
    //         let data = await connection('users').insert({
    //           fname: user.fname,
    //           lname: user.lname,
    //           email: user.email,
    //           status: user.status,
    //           address: user.address,
    //           phone_no: user.phone_no,
    //           role_id: roleId.id,
    //           // expire_at:expire_date,
    //           password: user.password,
    //         });
    //         req.flash('msg', req.__("restaurantAdd"));
    //         res.redirect('back');
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    // removeRestaurant: async (req, res) => {
    //   try {
    //     let { id, tenant_id } = req.body;

    //     let userEmail = await commonDBConnection('additional_restaurant_users')
    //       .where('id', id).select('email').first();
    //     // console.log(userEmail);
    //     let tenants_user = await commonDBConnection('additional_users_tenants')
    //       .where('additional_restaurant_users_id', id).where('tenants_id', tenant_id).del();
    //     let restaurant = await commonDBConnection('tenants').where('id', tenant_id).first();

    //     let connection = knex(createConnectionConfig(restaurant));
    //     let data = await connection('users').where('email', userEmail.email).del();

    //     req.flash('msg', req.__("recordRemoveSuccessFuly"));
    //     res.redirect('back');
    //   } catch (error) {
    //     console.log(error)
    //   }

    // },

    // removeUser: async (req, res) => {
    //   try {
    //     const id = req.params.id;

    //     let existEmail = await commonDBConnection('additional_restaurant_users').where('id', id).first();
    //     let tenantsuser = await commonDBConnection('additional_users_tenants')
    //       .where('additional_restaurant_users_id', id).select("*");
    //     console.log(tenantsuser)

    //     for (row of tenantsuser) {
    //       console.log(row);
    //       let restaurant = await commonDBConnection('tenants').where('id', row.tenants_id).first();
    //       let connection = knex(createConnectionConfig(restaurant));
    //       let data = await connection('users').where('email', existEmail.email).del();
    //     }
    //     let user = await commonDBConnection('additional_restaurant_users')
    //       .where('id', id).del();
    //     let tenants_user = await commonDBConnection('additional_users_tenants')
    //       .where('additional_restaurant_users_id', id).del();



    //     req.flash('msg', req.__("recordRemoveSuccessFuly"));
    //     res.redirect('/v1/admin/users-manage');
    //   }
    //   catch (error) {
    //     console.log(error)
    //   }
    // },
    // registerUsers: async (req, res) => {
    //   try {
    //     let users = await commonDBConnection('users').where('is_admin', 0).orderBy('created_at', 'desc');
    //     console.log(users);
    //     res.render('admin/users', {
    //       users, helpers: {
    //         dateFormat: function (date) {
    //           var d = new Date(date);

    //           return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
    //             d.getHours() + ":" + d.getMinutes();
    //         }
    //       }
    //     });
    //   } catch (e) {
    //     console.log(e)
    //     res.redirect('/v1/admin/users-manage');
    //   }
    // }
};

module.exports = AuthController