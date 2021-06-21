const commonDBConnection = require('../../dbConfig/commonDBConnection');
const { getConnection } = require('../../dbConfig/connectionManger');
const fs = require("fs");
const { getSubdomain, hasSubDomain } = require('../../utils/subDomainManger');


async function getCurrentTenantRecord(req) {

    if (hasSubDomain(req)) {
        let subdomain = getSubdomain(req);
        return await commonDBConnection('tenants').select('*').where({ subdomain }).first();
    }
}

function alignData(row) {
    let item = {
        id: row.id,
        name: row.name,
        icon: row.icon,
        url: row.link,
        order: row.order
    }
    return item;
}

let MenuController = {
    getMenus: async(req, res) => {
        try {


            // let menuItem = [];
            // ${tenant.role_id}
            // let assignMenus = await commonDBConnection.raw(`SELECT m.* FROM ${process.env.DB_DATABASE}.menus m  INNER JOIN ${process.env.DB_DATABASE}.permissions p ON p.menu_id = m.id WHERE p.role_id = 2  ORDER BY order_no ASC`);
            let menuItem = [];
            //
            let assignMenus = await commonDBConnection('permissions').where('role_id', req.user.data.rights)
                .innerJoin(`${process.env.DB_DATABASE}.menus`, 'permissions.menu_id', 'menus.id')
                .where('status', 1)
                .orderBy('order_no', 'ASC')
                .select(['menus.*']);

            for (let row of assignMenus) {

                if (row.parent_id && row.parent_id != null) {
                    let exists = menuItem.findIndex(item => item.id == row.parent_id);
                    if (exists > -1) {
                        menuItem[exists].children.push(alignData(row));
                        let children = menuItem[exists].children;
                        children.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
                        menuItem[exists].children = children;
                    } else {
                        let parentMenu = await commonDBConnection('menus').where("id", row.parent_id).select(['id', 'name', 'icon', 'link as url', 'order_no']).first();
                        let item = {
                            id: parentMenu.id,
                            name: parentMenu.name,
                            icon: parentMenu.icon,
                            order: parentMenu.order_no,
                            children: [alignData(row)]
                        }
                        menuItem.push(item);
                    }

                } else {


                    let item = {
                        id: row.id,
                        name: row.name,
                        icon: row.icon,
                        url: row.link,
                        order: row.order_no,
                        children: []
                    }
                    menuItem.push(item);
                    // }
                }
            }
            menuItem.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
            res.status(200).json({ 'items': menuItem });
        } catch (e) {
            console.log(e);
            res.json({ error: e });
        }
    },
};
module.exports = MenuController;