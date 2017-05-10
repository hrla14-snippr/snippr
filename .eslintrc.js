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
    },
    "globals": {
      "AUTH0_DOMAIN": false,
      "AUTH0_CLIENT_ID": false
    }
};