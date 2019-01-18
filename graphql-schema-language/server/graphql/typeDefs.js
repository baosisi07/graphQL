import path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'

const typeArray = fileLoader(path.join(__dirname, './types'))

module.exports = mergeTypes(typeArray, {all: true})