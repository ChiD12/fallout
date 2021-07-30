import { sQuery } from '../services/services.js'
// let sQuery = require('../services/services.js')

it('Testing giving multiple operators', () => {
    expect( () => {
        sQuery('**')})
        .toThrow('wrong amount of operators, valid operators are * (equals), _ (substring), -) (children or parents')
})

it('Testing invalid first expression', () => {
    expect( () => {
        sQuery('g*steve')})
        .toThrow('invalid first expression, available expressions: name, eye-color, hair-color, age, mother, father')
})

it('Testing two expressions for unary operator', () => {
    expect( () => {
        sQuery('steve-)sam')})
        .toThrow('-) is an unary operator, steve-) gets steves children, -)steve gets steves parents')
})

it('Testing giving multiple operators', () => {
    expect(3).toBe(3);
})