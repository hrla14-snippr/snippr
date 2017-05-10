module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "no-underscore-dangle": [2, { "allowAfterThis": true, allow: ["_*"] }],
        "class-methods-use-this": 0,
        "no-static-element-interactions": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "import/first": 0,
        "react/prefer-stateless-function": 0,
        "max-len": [1, 120, 2, {ignoreComments: true}],
    },
    "globals": {
      "AUTH0_DOMAIN": false,
      "AUTH0_CLIENT_ID": false,
      "SITE_URL": false
    }
};