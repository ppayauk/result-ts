module.exports = {
  hooks: {
    'prepare-commit-msg': 'exec < /dev/tty && npx cz --hook || true',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'lint-staged',
    'pre-push': 'make',
  },
}
