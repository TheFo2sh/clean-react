// tools/generate-thunks.ts
import { Project, SyntaxKind } from 'ts-morph'
import * as path from 'path'
import * as fs from 'fs'

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
            const thunkName = `fetch${capitalize(methodName)}`
            const interactorType = className
            const thunkFile = sourceFile.getFilePath().replace('/interactor/', '/presenter/').replace(sourceFile.getBaseName(), `${methodName}.thunk.ts`)
            console.log('thunkFile: ' + thunkFile)
            const thunkCode = `
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ${interactorType} } from '../interactor/${sourceFile.getBaseNameWithoutExtension()}'
import { TYPES } from '../interactor/TYPES'


export const ${thunkName} = createAsyncThunk<Song[], void, { rejectValue: string }>(
  '${featureName.replace('.interactor','')}/${methodName}',
  async (_, { rejectWithValue }) => {
    try {
      const interactor = container.get<${interactorType}>(TYPES.${interactorType})
      return await interactor.${methodName}()
    } catch (err) {
      return rejectWithValue('Failed to ${methodName}')
    }
  }
)
`

            fs.mkdirSync(path.dirname(thunkFile), { recursive: true })
            fs.writeFileSync(thunkFile, thunkCode)
        })
    })
})

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}