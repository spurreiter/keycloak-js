# keycloak-js

This is a linted version of package [keycloak-js][] with documentation for API methods.

The minified versions for "base64-js", js-sha256" and a Promise polyfill have been removed to lower bundle size.

## Usage

```
npm i @spurreiter/keycloak-js
```

```js
import Keycloak from '@spurreiter/keycloak-js'
```

Using with `initOptions.pkceMethod = 'S256'`

```js
import Keycloak from '@spurreiter/keycloak-js/keycloak-pkce'
```

## License

Apache 2.0 as with the original package

[keycloak-js]: https://npmjs.org/package/keycloak-js
