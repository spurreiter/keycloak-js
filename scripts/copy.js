const { cd, cp, exec } = require('shelljs')

const dir = `${__dirname}/..`
const srcDir = `${__dirname}/../node_modules/keycloak-js`

cd(dir)
exec('git checkout -b keycloak')
exec('rimraf node_modules')
exec('npm i')
cp(`${srcDir}/dist/keycloak.js`, `${dir}/src`)
