/**
 * @file oxlint.config.ts
 * @description Oxlint configuration for the monorepo.
 * This file is intentionally kept minimal to avoid issues with different Node.js versions.
 * Oxlint will automatically use the local configuration from @vben/oxlint-config.
 *
 * To update the configuration, edit 'packages/oxlint-config/src/index.ts' instead.
 */

import { defineConfig } from 'oxlint';

// We export an empty config to satisfy the requirement for a config file.
// The actual rules and plugins are loaded from @vben/oxlint-config.
export default defineConfig({});
