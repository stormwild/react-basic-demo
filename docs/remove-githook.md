```json
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,jsx}": [
      "eslint",
      "pretty-quick —-staged",
      "git add"
    ]
  }
```
