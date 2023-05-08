# NK Website (2023)

Latest version of North Kingdom's website (2023)

## Tech Stack

**Client:** Typescript, Next.js, React, Sass, Framer Motion

**CMS:** Contentful

**Hosting:** Vercel

**Package manager:** Yarn

**Documentation:** Storybook

## Environment Variables

Make sure you have the following environment variables in your .env file.

```
NEXT_PUBLIC_CTF_ENVIRONMENT=XXX
NEXT_PUBLIC_CTF_SPACE_TOKEN=XXX
NEXT_PUBLIC_CTF_ACCESS_TOKEN=XXX
NEXT_PUBLIC_CTF_PREVIEW_TOKEN=XXX
NEXT_PUBLIC_TEAMTAILOR_TOKEN=XXX
```

## Run Locally

The project is run with yarn.

Install dependencies

```bash
  yarn
```

Start the dev server (requires [environment variables](#environment-variables))

```bash
  yarn dev
```

Build static export

```bash
  yarn package
```

## Deployment

Automatic deployment is setup with Vercel.

- Dev → `dev` branch deploys to: [TBD]
- Staging → `staging` branch deploys to: [TBD]
- Main → `main` branch deploys to: [TBD]

## Dev Features

### Aliasing

Use the following aliases for cleaner imports:

- `@` → aliases `./src` directory
- `@styles` → aliases the root stylesheet directory (`./styles`)
- `@customTypes` → aliases the custom type definition file directory (`./types`)

### Component conventions

Components should adhere to the following naming conventions and file structure. <br/>

```md
├── src/components
│ ├── new-component
│ │ ├── index.ts # entrypoint
│ │ ├── NewComponent.tsx # code
│ │ ├── NewComponent.module.scss # styles
│ │ └── NewComponent.stories.tsx # documentation
...
```

### Creating new components

Use the script below to create a new component folder which follows the file naming conventions.

```
yarn new-component <component-name>
```

### UI Documentation

This project uses [Storybook](https://storybook.js.org/) for UI documentation. Run the following script to preview Storybook locally.

```
yarn storybook
```

## Contributing

### Branching with LisoFlow

> Common git workflow based on feature branches with a rebase/merge no fast forward technique.

The key factor of this approach is to keep a commit history strict to time based. Using `--no-ff` on merge commands makes git keep all history of commits in the merge, making develop a longer track of single commits, instead of merge messages where the ownership of commits might change with merge commands.

**Example** <br />
Start by pulling develop from origin into your develop and creating a feature branch:

```
$ git pull
$ git checkout -b feature/feature_branch
```

When the magic is done and your branch is ready to be shared with the team, rebase ur branch with origin develop. But make sure to do a fetch so local git is aligned with origin.

```
$ git fetch origin
$ git rebase origin/develop
```

Any conflicts between origin and local copies should be addressed now. Given that we are rebasing, git will try to handle conflicts by one commit at a time, making conflict fixing much easier. For every file we fix a conflict we need to add to index and continue rebasing.

```
$ git add file_with_conflicts_fixed
$ git rebase --continue
```

> If more than one file got conflicts on a single commit rebase,make sure to fix all conflicts on all files before adding to index and continuing rebasing.  
> Otherwise if things get out of control, you can always stop the process and start over by runnign `$ git rebase --abort`

When rebasing is done, we know for a fact that our branch will smoothly make into develop, since we fixed all conflicts already and our branch is now same as develop, but with our changes ON TOP. So we move back into develop, sync with origin, and merge our feature in from here.

```
$ git checkout develop
$ git pull
$ git merge --no-ff feature/feature_branch
$ git push
```

> If for some reason a push has been made to origin develop while we were rebasing/merging we will know when we pull before merge. So before merging, we go back to our feature branch and repeat the process of rebasing. Then back to develop and continue the flow.

### Document changes in the changelog

Big changes should be documented in the [changelog](/docs/changelog.md). In addition, you can create a pull requests for bigger changes and link the PR in the changelog entry

_Example flow_:

- create a feature branch following [LisoFlow](#branching-with-lisoflow)
- once you're done, create a pull request and merge it to `dev` branch
- add a log item to the [changelog](/docs/changelog.md) and link the PR in the description

## Roadmap

- [ ] Add Lighthouse CI
- [ ] Add changeset
- [ ] Add/document storybook deploy
- [ ] Add Lenis scroll
- [ ] Add page transition
