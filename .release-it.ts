import type { Config } from 'release-it';

export default {
  git: {
    commit: true,
    tag: true,
    push: true,
    tagName:"v${version}"
  },
  github: {
    release: false
  },
  npm: {
    publish: false
  }
} satisfies Config;