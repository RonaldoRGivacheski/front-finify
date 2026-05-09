# @vben/vsh

A collection of shell scripting tools for developing and managing the Vue Vben Admin project.

## Features

- 🚀 Based on Node.js modern shell tool
- 📦 Modular development and on-demand loading
- 🔍 Provide dependency checking and analysis
- 🔄 Support circular dependency scanning
- 📝 Provide package publishing check function

## Installation

```bash
# Install with pnpm
pnpm add -D @vben/vsh

# Or use npm
npm install -D @vben/vsh

# Or use yarn
yarn add -D @vben/vsh
```

## Usage

### Global Installation

```bash
# Global installation
pnpm add -g @vben/vsh

# Use vsh command
vsh [command]
```

### Local Usage

```bash
# Add scripts to package.json
{
  "scripts": {
    "vsh": "vsh"
  }
}

# Run command
pnpm vsh [command]
```

## Command List

- `vsh check-deps`: Check project dependencies
- `vsh scan-circular`: Scan circular dependencies
- `vsh publish-check`: Check package publishing configuration
