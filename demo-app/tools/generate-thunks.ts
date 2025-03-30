// tools/generate-thunks.ts
import { Project } from 'ts-morph'
import * as path from 'path'
import * as fs from 'fs'
import * as prettier from 'prettier'

const project = new Project({
    tsConfigFilePath: './tsconfig.json',
})

const interactorFiles = project.addSourceFilesAtPaths('src/app/**/*.interactor.ts');

interactorFiles.forEach((sourceFile) => {
    console.log('processing :' + sourceFile.getFilePath());
    const classes = sourceFile.getClasses()
    classes.forEach((cls) => {
        const className = cls.getName()
        if (!className?.endsWith('Interactor')) return

        const methods = cls.getMethods()

        methods.forEach((method) => {
            const methodName = method.getName()
            const featureName = sourceFile.getBaseNameWithoutExtension().replace(/-interactor$/, '')
            const thunkName = `${capitalize(methodName)}`
            const interactorType = className
            const thunkFile = sourceFile.getFilePath().replace('/interactor/', '/presenter/').replace(sourceFile.getBaseName(), `${methodName}.thunk.ts`)
            const params = method.getParameters()
            const hasArgs = params.length > 0
            const declareArgs = params.map((p) => `arg:{${p.getName()}:${p.getType().getText()}}`).join(', ')

            const callArgs = params.map((p) => `arg.${p.getName()}`).join(', ')
            console.log('thunkFile: ' + thunkFile)
            const thunkCode = `
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ${interactorType} } from '../interactor/${sourceFile.getBaseNameWithoutExtension()}'
import { TYPES } from '../interactor/TYPES'


export const ${thunkName} = createAsyncThunk(
  '${featureName.replace('.interactor', '')}/${methodName}',
  async (${hasArgs ? declareArgs : '_'}, { rejectWithValue }) => {
    try {
      const interactor = container.get<${interactorType}>(TYPES.${interactorType})
      return await interactor.${methodName}(${callArgs})
    } catch (err) {
      return rejectWithValue('Failed to ${methodName}')
    }
  }
)
`

            fs.mkdirSync(path.dirname(thunkFile), {recursive: true})
            prettier.format(thunkCode, {parser: 'typescript'}).then((formatted) => {
                fs.writeFileSync(thunkFile, formatted)
            })
        })
    })
})

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}