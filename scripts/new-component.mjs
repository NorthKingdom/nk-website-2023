/**
 * Create a new component folder in the src/components directory
 * Usage: yarn new:component <component-name>
 * Example: yarn new:component video-player
 * * creates | src/components/video-player
 * *         ├── index.ts
 * *         ├── VideoPlayer.tsx
 * *         ├── VideoPlayer.module.scss
 * *         └── VideoPlayer.stories.tsx
 */

import lodash from 'lodash'
import chalk from 'chalk'
import fs, { mkdir } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ARGS = {
  COMPONENT_NAME: process.argv.slice(2).join(' ').replace(/store/i, ''), // player-store => player-store, game mode -> game-mode
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.resolve(path.dirname(__filename), '../')

const logError = (message) => console.error(chalk.red(`\n \u274c ${message} \n`))
const logSuccess = (message) => console.log(chalk.green(`\n \u2714 ${message} \n`))

if (!ARGS.COMPONENT_NAME) {
  logError('Cannot create component without a name, please provide a name as an argument')
  process.exit(1)
}

const componentName = {
  kebabCase: lodash.kebabCase(ARGS.COMPONENT_NAME),
  camelCase: lodash.camelCase(ARGS.COMPONENT_NAME),
  pascalCase: lodash.upperFirst(lodash.camelCase(ARGS.COMPONENT_NAME)),
}

const componentsDir = path.join(__dirname, 'src', 'components')
const outputDir = path.join(componentsDir, componentName.kebabCase)

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir)
}

if (fs.existsSync(outputDir)) {
  logError(`A store directory for "${ARGS.COMPONENT_NAME}" store already exists at ${outputDir}`)
  process.exit(1)
}

fs.mkdirSync(outputDir)

const componentIndexTS = /*ts*/ `
export * from './${componentName.pascalCase}'
`.trim()

const componentFileTS = /*ts*/ `
import React from 'react'
import styles from './${componentName.pascalCase}.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, '${componentName.camelCase}')

interface ${componentName.pascalCase}Props {

}

export const ${componentName.pascalCase} = (props: ${componentName.pascalCase}Props) => {
  return <div className={styles['${componentName.camelCase}']}>${componentName.pascalCase}</div>
}
`.trim()

const componentStoriesTS = /*ts*/ `
import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName.pascalCase} } from './${componentName.pascalCase}';

const meta: Meta<typeof ${componentName.pascalCase}> = {
  title: 'UI/${componentName.pascalCase}',
  component: ${componentName.pascalCase},
  tags: ['autodocs'],
  parameters: {}
};

export default meta;
type Story = StoryObj<typeof ${componentName.pascalCase}>;

export const Default: Story = { args: {} };
`.trim()

const comopnentStylesSCSS = /*scss*/ `
${'.'}${componentName.camelCase} {

}
`.trim()

fs.writeFileSync(path.join(outputDir, 'index.ts'), componentIndexTS)
fs.writeFileSync(path.join(outputDir, `${componentName.pascalCase}.tsx`), componentFileTS)
fs.writeFileSync(path.join(outputDir, `${componentName.pascalCase}.stories.tsx`), componentStoriesTS)
fs.writeFileSync(path.join(outputDir, `${componentName.pascalCase}.module.scss`), comopnentStylesSCSS)

logSuccess(`Created "${componentName.kebabCase}" component folder at ${outputDir}`)
