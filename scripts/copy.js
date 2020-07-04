const { cd, cp, exec, rm } = require('shelljs')
const { promisify } = require('util')
const fs = require('fs')
const streamPipeline = promisify(require('stream').pipeline)
const fetch = require('node-fetch')

const dir = `${__dirname}/..`
const srcDir = `${__dirname}/../node_modules/keycloak-js`

const tasks = {}

tasks.checkout = async () => {
  cd(dir)
  exec('git checkout keycloak')
}

tasks.module = async () => {
  await tasks.checkout()
  cd(dir)
  rm('-r', 'node_modules/keycloak-js')
  exec('npm i')
  cp(`${srcDir}/dist/keycloak.js`, `${dir}`)
}

tasks.fetch = async () => {
  await tasks.checkout()
  cd(dir)
  const url = 'https://raw.githubusercontent.com/keycloak/keycloak/master/adapters/oidc/js/src/main/resources/keycloak.js'
  await fetch(url).then(res => {
    if (!res.ok) throw new Error(`unexpected response ${res.statusText}`)
    return streamPipeline(res.body, fs.createWriteStream(`${dir}/keycloak.js`))
  })
}

;(async () => {
  const task = process.argv.slice(2)[0] || 'fetch'
  if (tasks[task]) await tasks[task]()
})()
