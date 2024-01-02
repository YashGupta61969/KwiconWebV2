# Contribution Guidelines

We're following an opinionated approach to development and multiple people will work on the same project, we need to follow some rules to make sure the codebase is consistent and easy to scale. Please go through the following rules:

## Development

### Separation of Concerns

1. We have `apps` and `libs` folders in the root directory. `apps` folder contains the code for the apps and `libs` folder contains the code for the libraries. The `apps` folder should not contain all the codes and features rather most of the codes should be placed in the `libs` folder.
2. All the common codes for the application will go under the `libs/commons` folder. For example, `constants`, `hooks`, `providers`, `types`, `utils`, etc.
3. The reusable components (not the ui components) will go under the `libs/components` folder. They should be separated into their own folders with test files. If the component is not reusable and dependant on the app, it should be placed under its respective feature's component folder. For example, `libs/features/auth/components`.
4. When developing a UI component, it should be placed under the `libs/kwicon-ui` folder along with storybook and test files. If there's any need for adding any theming or styling, please refer the `libs/kwicon-ui/kwicon-theme`. Always update the `kwicon-theme` if there's any change in the UI component rather than adding the styles in the component itself.
5. All the features for the apps should be placed under the `libs/features` folder. For example, `libs/features/auth`, `libs/features/home`, etc. Please, not that the redux slices for a particular feature should be placed under the feature's folder itself. For example, `libs/features/auth/slices`. However, in order to achieve a better separation of concerns, the redux slices, thunk-apis, interfaces for that particular feature should be placed under their own folder.
6. The routes for both applications, should be placed under the `libs/routes` folder. Please refer the code construction of the existing routes.

### file and folder naming

1. All the files and folders should be named in `kebab-case`. For example, `kwicon-app`, `kwicon-ui`, `kwicon-theme`, `kwicon-ui-e2e`, `kwicon-website`, `kwicon-ui`, `kwicon-ui-button`, `kwicon-ui-button.stories.tsx`.
2. Try not to create any library component manually, rather use the `nx cli` to create the components, stories, redux slices and others. Please refer the NX Cheat Sheet for more information or go through the [NX CLI Doc](https://nx.dev/reference/commands#nx-cli-commands).
3. If you're creating a `story`, `test`, `redux-slice`, or `styled-component` file, please try to refer them in their file extension. For example, `kwicon-ui-button.stories.tsx`, `kwicon-ui-button.spec.tsx`, `kwicon-ui-button.slice.ts`, `kwicon-ui-button.styled.ts`, etc.

### Code Construction

1. Try not to import `React` in every component file. We're using `.tsx` file extension for all the components. So, we don't need to import `React` in every component file. Rather, we can use the `React` namespace directly. For example, `const App = () => <div>Hello World</div>`.
2. If you're creating any `hooks`, `helper-functions`, `utilities` please add proper documentation for that. Refer the existing ones and try to follow the same pattern.
3. Since, we're using TypeScript, it's better to use the proper typings for every piece of code you write. We don't recommend to use `any` type, if the type is not known, or already a wrap of the existing libraries, you may use `any` otherwise `unknown` type is recommended.
4. If you're using any `third-party` libraries, please make sure to add the proper typings for that. If the typings are not available, please create a `d.ts` file and add the typings there. For example, `./styled.d.ts`.
5. When importing any module please import like an npm scoping. For example, `import { Button } from '@kwicon/kwicon-ui'` rather than `import { Button } from '../../kwicon-ui'`.
6. Try to import the later rendered dependant components using the lazy loading. For example, if you want to import a modal component, please import it like `const Modal = lazy(() => import('@kwicon/kwicon-ui/modal'))`. This will help to reduce the bundle size and improve the performance.

### Code Formatting

1. We're using `prettier` for code formatting. Please make sure to install the `prettier` extension in your editor and enable the `format on save` option. This will help to format the code automatically when you save the file. Besides, install the `editorconfig` extension, we have a `.editorconfig` file in the root directory. This will help to format the code based on the editor configuration.
2. We're using `eslint`, so try to fix the eslint errors and warnings before pushing the code.
3. Always try to run the `nx affected:lint` command before pushing the code. This will help to fix the linting errors and warnings.

### Committing the code

1. Always sync your local branch with development branch to avoid any conflicts.
2. Try to commit the code in small chunks with better commit messages. Please avoid commit message like `fix`, `update`, `changes`, etc. Rather use the commit message like `fix: fixed the button alignment issue`, `feat: added the new button component`, `chore: updated changelog`, etc. Please go through the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for more information.
3. Always mention the user story id in the final commit message or in the PR description. For example, `feat: added the new button component #KW-1`, `chore: updated changelog #KW-2`, etc.
4. We've already mentioned the branch naming convention in the initial [README](../README.md) file. Please follow the same convention while creating the branch.
5. Always create a PR from your branch to the development branch. Please don't merge your branch directly to the development branch. This will help to review the code before merging to the development branch. And also, add a senior or colleague as a reviewer to the PR. This will help to review the code and provide feedbacks.
6. If you're creating a PR, please make sure to add the proper description for that. Please mention the user story id in the PR description. For example, `feat: added the new button component #KW-1`, `chore: updated changelog #KW-2`, etc.

### Others

1. Please make sure to add the proper documentation for the code you write. Write proper comments for the code you write. This will help others to understand the code easily. So, the secret of your code don't remain with you only.
2. Try to think about the reusability of the code you write. If you think the code you write can be reused in other places, please create a separate library for that. For example, if you're creating a `custom hook` for a particular feature, please create a separate library for that.
3. Always check the sprint board before picking up any user story. If the user story is already assigned to someone, please don't pick that up. Rather pick up the user story which is assigned to you only. If you think you can help others, please feel free to do that.
4. If you're facing any issues, please feel free to ask in the respective dev group in the MS Teams. If you think the issue is not related to the project, please feel free to ask in the general group.
5. Always think before you develop a particular feature. Don't go into the implementation directly. Think about the reusability, performance, and other factors before you start developing a particular feature.
6. Don't hesitate to ask for help. We're here to help each other. So, please feel free to ask for help if you're stuck somewhere.
7. Try to update the CHANGELOG.md file for every release. This will help to track the changes easily.
8. Always try to run the app in Docker environment before raising the PR. This will help you to be sure that the app will be running smoothly in the production environment. If you face any issues regarding the Docker, please follow the [Docker Doc](https://docs.docker.com/get-started/) or reach out the devops team.

Happy Contributing! 🎉
