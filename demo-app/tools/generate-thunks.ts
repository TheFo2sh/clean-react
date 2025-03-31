// tools/generate-thunks.ts
import { Project } from 'ts-morph'
import * as path from 'path'
import * as fs from 'fs'
import * as prettier from 'prettier'

const project = new Project({
    tsConfigFilePath: './tsconfig.json',
})

const usecaseFiles = project.addSourceFilesAtPaths('src/app/**/*.usecase.ts');

usecaseFiles.forEach((sourceFile) => {
    console.log('processing :' + sourceFile.getFilePath());
    const classes = sourceFile.getClasses()
    classes.forEach((cls) => {
        const className = cls.getName()
        if (!className?.toLocaleLowerCase().endsWith('usecase')) return
        const methods = cls.getMethods()

        methods.forEach((method) => {
            const featureName = sourceFile.getBaseNameWithoutExtension().replace(/-useCase$/, '')
            const thunkName = `${capitalize(className.replace('UseCase',''))}`
            const usecaseType = className
            const thunkFile = sourceFile.getFilePath().replace(sourceFile.getBaseName(), `${thunkName}.thunk.ts`)
            const params = method.getParameters()
            const hasArgs = params.length > 0
            const declareArgs = params.map((p) => `arg:{${p.getName()}:${p.getType().getText()}}`).join(', ')

            const callArgs = params.map((p) => `arg.${p.getName()}`).join(', ')
            console.log('thunkFile: ' + thunkFile)
            const thunkCode = `
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ${usecaseType} } from './${sourceFile.getBaseNameWithoutExtension()}'



export const ${thunkName}Thunk = createAsyncThunk(
  '${featureName.replace('.usecase', '')}/${thunkName}',
  async (${hasArgs ? declareArgs : '_'}, { rejectWithValue }) => {
    try {
      const usecase = container.get(${usecaseType})
      return await usecase.${method.getName()}(${callArgs})
    } catch (err) {
      return rejectWithValue('Failed to ${thunkName}')
    }
  }
)
`
            console.log(thunkFile + ' completed');
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