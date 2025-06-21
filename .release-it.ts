import type { Config } from 'release-it';

export default {
  git: {
    commit: true,
    tag: true,
    push: true
  },
  github: {
    release: false
  },
  npm: {
    publish: false
  }
} satisfies Config;