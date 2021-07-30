import { rCreateVaultMember, rGetVaultMember, rGetEquality, rGetLike, rGetParents, rGetChildren, rUpdateAge } from './../repo/repo.js'

import * as fs from 'fs';
import * as path from 'path';
const __dirname = path.resolve();

export const sCreateVaultMember = (VM) => {
    return rCreateVaultMember(VM)
}

export const sGetVaultMember = (name) => {
    return rGetVaultMember(name)
}

export const sQuery = (query) => {
    let matches = query.match(/(-\))|_|\*/g)
    if(matches === null || matches.length != 1){
        throw 'wrong amount of operators, valid operators are * (equals), _ (substring), -) (children or parents)'
    }

    if(query.includes('*')){ //equals
        let parts = query.split('*');

        let matchesExpression = parts[0].match(/(name)|(eye-color)|(hair-color)|(age)|(mother)|(father)/g);
        if (matchesExpression === null || matchesExpression.length != 1 ){
            throw 'invalid first expression, available expressions: name, eye-color, hair-color, age, mother, father'
        }

        return rGetEquality(parts[0], parts[1])

    }else if(query.includes('_')){ //substring
        let parts = query.split('_');

        let matchesExpression = parts[0].match(/(name)|(eye-color)|(hair-color)|(age)|(mother)|(father)/g);
        if (matchesExpression === null || matchesExpression.length != 1 ){
            throw 'invalid first expression, available expressions: name, eye-color, hair-color, age, mother, father'
        }

        return rGetLike(parts[0], parts[1])

    }else if(query.includes('-)')){// left side children of, right side parent of
        let parts = query.split('-)');
        if (parts[0] !== '' && parts[1] !== '') throw '-) is an unary operator, steve-) gets steves children, -)steve gets steves parents'
        
        if(parts[0] === ''){ // -)steve
            return rGetParents(parts[1])
        }else if(parts[1] === ''){ // steve-)
            return rGetChildren(parts[0])
        }
    } 
}

export const sUpdateAge = (years) => {
    return rUpdateAge(years);
}

let readF = (path) => {
    return fs.readFileSync(path,'UTF-8')
}

export const sGetDecendants = async (name) => {
    let decendants = await findChildren(name)

    let result = readF(path.join(__dirname, '/public/first.html'))
    let result2 = readF(path.join(__dirname, '/public/second.html'))
    
    return result + JSON.stringify(decendants) + result2
}

//recursive function to find all children, all children of children and so on
const findChildren = async (name) => {
    let rootChildren = await rGetChildren(name);

    let listOfChildren =[]
    let waits = await Promise.all(rootChildren.map( async child => {
        let result = await findChildren(child.name)
        listOfChildren.push(result)
    }))

    if (listOfChildren.length > 0){
        return {'name': name, "children": listOfChildren}
    }
    else{
        return {'name': name}
    }
}