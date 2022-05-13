# nuxt-tsconfig-stub

[![NPM version](https://img.shields.io/npm/v/nuxt-tsconfig-stub?color=a1b858&label=)](https://www.npmjs.com/package/nuxt-tsconfig-stub)

Stub Nuxt's generated tsconfig.json at installation.

## Motivation

Nuxt handles the tsconfig under `.nuxt/tsconfig.json` dynamically for you. And commonly your root tsconfig.json is essential a redirection like:

```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

The directory `.nuxt` is excluded from the source control. Meaning in CI environment, the `.nuxt/tsconfig.json` does not exist on the initial checkout, which might causing some TypeScript related tools to fail. You can run `nuxi prepare` asking Nuxt to generate one for you, or any Nuxt commands like `nuxi dev` `nuxi build` will also generate it along the way.

This package is to solve a niche problem that you might want to use the tsconfig before running Nuxt commands. This uses `postinstall` to create an empty JSON file at `.nuxt/tsconfig.json` if it does not exist already.

## Install

```sh
npm i nuxt-tsconfig-stub -D
```

That's it.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2022 [Anthony Fu](https://github.com/antfu)
