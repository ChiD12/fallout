import {connectedKnex as knex} from './knex.js'


export const rCreateVaultMember = (VM) => {
    return knex('VaultMember').insert(VM);
}

export const rGetVaultMember = (name) => {
    return knex('VaultMember').where({'name': name});
}

export const rGetEquality = (param, value) => {
    return knex('VaultMember').where({[param]: value});
}

export const rGetLike = (param, value) => {
    return knex('VaultMember').where(param,'like', '%'+value+'%');
}

export const rGetParents = async (name) => {
    let target = await rGetVaultMember(name)
    return knex('VaultMember').where('name', target[0].mother).orWhere('name', target[0].father)
}

export const rGetChildren = (name) => {
    return knex('VaultMember').where('father', name).orWhere('mother', name)
}

export const rUpdateAge = async (years) => {
    let res = await knex('VaultMember').select('name', 'age');
    var results = await Promise.all(res.map( async entry => {
        let updatedAge = parseInt(entry.age) + parseInt(years)
        let update = await knex('VaultMember').where('name', entry.name).update('age', updatedAge)
    }));

    return knex('VaultMember').where('age', '>=', 70).update('deceased', 1)    
}