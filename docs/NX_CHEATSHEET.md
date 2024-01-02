## NX Cheat Sheet

Sometimes, the NX build system can be a bit confusing and overwhelming. To avoid that, we can use the following cheat sheet.

#### Basic Commands

For Kwicon App Scopes

| Command                       | Description                                                   |
| ----------------------------- | ------------------------------------------------------------- |
| `pnpm install`                | Install dependencies                                          |
| `nx run kwicon-website:serve` | Run the `Kwicon Website` in development mode                  |
| `nx run kwicon-website:build` | Build the `Kwicon Website` app in development mode            |
| `nx run kwicon-app:serve`     | Run the `Kwicon App` in development mode                      |
| `nx run kwicon-app:serve`     | Build the `Kwicon App` in development mode                    |
| `pnpm run lint`               | Run the linter for the affected component in all the projects |
| `nx run storybook:start`      | Run the storybook for `kwicon-ui` library                     |

#### Building Blocks

To run the generator commands, always run them from the root of the project and pass the `--dry-run` flag first to see the result. If the result is what you want, then run the command without the `--dry-run` flag.

| Command                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `nx list`                                                                                                                                                                  | Show the lists for available frameworks and libs                                                                                                                                                                                                                                                                               |
| `nx g @nrwl/react:application <application-name>`                                                                                                                          | Generate a new react application. Try to add a `--help` flag at the end without any argument for better understanding.                                                                                                                                                                                                         |
| `nx g @nrwl/react:library <library-name>`                                                                                                                                  | Generate a new react library. Try to add a `--help` flag at the end without any argument for better understanding.                                                                                                                                                                                                             |
| `nx g @nrwl/react:component <component-name> --project=<project-name-where-you-want-to-add> --fileName=<filename-that-you-want> --directory=<component-path-to-directory>` | Generate a new react component. Try to add a `--help` flag at the end without any argument for better understanding.                                                                                                                                                                                                           |
| `nx g @nrwl/react:stories --name=<component-name> --project=<ui-lib-name> --export`                                                                                        | Generate storybook for a component. Note that, the component name should match with the actual name to make it consistent. Besides, we're only using the storybook for the `kwicon-ui` library. So, the `--project=` will be `kwicon-ui`. Try to add a `--help` flag at the end without any argument for better understanding. |
