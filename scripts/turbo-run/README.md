# @vben/turbo-run

`turbo-run` is a command-line tool that allows you to run commands in parallel across multiple packages. It provides an interactive interface for selecting the packages you want to run commands in.

## Features

- 🚀 Interactive selection of packages to run commands in
- 📦 Supports monorepo project structure
- 🔍 Automatically detects available commands
- 🎯 Precise filtering of target packages

## Installation

```bash
pnpm add -D @vben/turbo-run
```

## Usage

Basic syntax:

```bash
turbo-run [script]
```

For example, if you want to run the `dev` command:

```bash
turbo-run dev
```

The tool will automatically detect which packages have the `dev` command and provide an interactive interface for selecting the packages you want to run commands in.

## Examples

Assume your project has the following packages:

- `@vben/app`
- `@vben/admin`
- `@vben/website`

When you run:

```bash
turbo-run dev
```

The tool will:

1. Detect which packages have the `dev` command
2. Display an interactive selection interface
3. Let you select the packages to run commands in
4. Use `pnpm --filter` to run commands in the selected packages

## Notes

- Ensure your project uses pnpm as the package manager
- Ensure the target package has the corresponding script command defined in `package.json`
- The tool needs to be run in the root directory of the monorepo project
