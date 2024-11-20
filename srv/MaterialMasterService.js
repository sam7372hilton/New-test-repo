const cds = require('@sap/cds');
let globalVariable = {};
module.exports = cds.service.impl(async function (srv) {
    const { AuthUser, MaterialMaster } = srv.entities

    this.before('READ', AuthUser, async (req) => {
        // const user = cds.context.user;
        const { query } = req;
        const filters = query.SELECT.where;
        if (filters) {
            filters.forEach((condition) => {
                console.log('Condition:', condition);
            });
        }
        var userName = filters && filters[2] && filters[2].val;
        var password = filters && filters[6] && filters[6].val
        globalVariable = {
            userName: { name: userName },
            password: { name: password }
        };
        /* userList is user to get value from the db table and looped it below */
        const userList = await cds.tx(req).run(SELECT.from(AuthUser));
        for (let user of userList) {
            if (user.UserName === globalVariable.userName.name && user.Password === globalVariable.password.name) {
                req.info('Login Success');
                break;
            } else {
                req.reject(400, "Username or Password is Incorrect");
                break;
            }

        }
    })
    this.before('POST', 'createMaterial', async (req) => {
        const data = req.data
        const materialData = await SELECT.from(MaterialMaster)
        if (materialData) {
            const findMaterialNum = materialData.find(materialData.MaterialNumber = data.MaterialNumber)
            if (findMaterialNum) {
                return req.reject(400, 'Material Number Already Exist')
            }
        }
    })

 
    this.on('POST', 'createMaterial', async (req) => {
        try {
            const data = req.data
            if (!data.MaterialNumber) {
                req.reject(400, "Material Number is Mandatory")
                return;
            }
            const payload = {
                MaterialNumber: data.MaterialNumber,
                Description: data.Description,
                IndustrySector: data.IndustrySector,
                MaterialType: data.MaterialType,
                Plant: data.Plant,
                StorageLocation: data.StorageLocation,
                UOM: data.UOM,
                MaterialGroup: data.MaterialGroup
            }
            return req.info(200, `Material ${data.MaterialNumber} is Created`)
        } catch (oError) {
            return req.reject(404, 'Issue in Creating Material')
        }
    })


})