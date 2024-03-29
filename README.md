# README

[![Github of Life - CI](https://github.com/chrisguest75/github-of-life/actions/workflows/ci-github-of-life.yaml/badge.svg)](https://github.com/chrisguest75/github-of-life/actions/workflows/ci-github-of-life.yaml)  

[![Repository](https://skillicons.dev/icons?i=docker,nginx,bash,linux,html,typescript,jest,vscode)](https://skillicons.dev)

Demonstrate a full screen game of life using github like tiles.  

ℹ️ NOTE: This was based on a folder from this repo [chrisguest75/bootstrap](https://github.com/chrisguest75/bootstrap)

📝 TODO:

* Split the actions pipeline into tasks rather than steps
* danger.js
* dockerslim
* Turn on and off fade effect
* Upload as a lamda (cdk??)
* jest tests using honeycomb
* Cypress tests and profiling
* Switch to cloudrun
* Sounds?
* Metrics - file loads, fullscreen, etc
* Overlay navigation for initial conditions
* Draw on the canvas

Conways game of life [here](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)  

## 📲 Grab cells files

We use the public pattern repository.  

```sh
# pattern files
open https://www.conwaylife.com/patterns/

# grab one of them
curl -o ./cells/f117.cells https://www.conwaylife.com/patterns/f117.cells
```

Update and rebuild the index  

```sh
cd ./scrape-cells

# download the files
./scrape-cells.sh

# rebuild the index.
./create-index.sh
```

## ⚡️ Run it

```sh
npm install

# start dev build and run
npm run start:dev

npm run start:browser

# build the dist folder.  This can be hosted in live server. 
npm run clean:build
```

## 🏠 How it was built

```sh
npm init -y  

# bundling https://parceljs.org/
npm install parcel --save-dev

# typescript https://www.npmjs.com/package/rimraf

npm install typescript @types/node ts-node nodemon rimraf npm-run-all --save-dev  

# add a tsconfig
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true --sourceMap true
```

Update the package.json

```json
    "start": "run-p -l type-check:watch start:dev",
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch",
    "start:dev": "parcel ./src/index.html",
    "start:browser": "open http://localhost:1234"
```

Use the "start" target in the npm script in vscode
Also use the live server update

Install prettier & eslint

```sh
code --install-extension esbenp.prettier-vscode
npm install --save-dev prettier 
npm install --save-dev eslint 
npm install --save-dev eslint-plugin-security@latest 
npm install eslint-plugin-prettier@latest --save-dev 
npm install --save-dev eslint-config-prettier
```

Static files handling

```sh
npm install -D parcel-reporter-static-files-copy
```

Add testing

```sh
npm install jest @types/jest jest-junit ts-jest --save-dev  
```

Add typedoc

```sh
npm install --savedev typedoc           
```

```sh
# create ico file
magick -density 128x128 -background none ./static/favicon.png -resize 128x128 ./static/favicon.ico
```

## 📋 Configure Deploy to heroku

```sh
# open heroku dashboard and create a github-of-life app.
open https://dashboard.heroku.com/
brew tap heroku/brew && brew install heroku
heroku login
heroku container:login
heroku authorizations:create       
```

## 👨‍💻 Using npm scripts

```sh
# lint the code
npm run lint 

# build the container includes tests, audit, etc
npm run docker:build
npm run docker:rebuild

# runs the container-structure-tests
npm run docker:test

# run it locally
npm run docker:run 
npm run docker:browse
npm run docker:stop

# deploy to heroku
npm run deploy

# view the live site
npm run browse:live
```

## 🔍 Scanning Prereqs

```sh
brew install container-structure-test
brew install semgrep
brew install dive hadolint dockle
```

## 🔍 Manual commands for local troubleshooting

```sh
# test locally
docker build -f Dockerfile --target builder -t github-of-life-builder .
dive github-of-life-builder

# build and push
npm run clean:build   
docker build -f Dockerfile -t registry.heroku.com/github-of-life/web .
dive registry.heroku.com/github-of-life/web

# You can run the container-structure-test now (you will need container-structure-test installed)
container-structure-test test --image registry.heroku.com/github-of-life/web --config ./container-structure-tests.yaml 

docker push registry.heroku.com/github-of-life/web


# run locally 
docker run --rm -it -d -p 8080:80 --name githuboflife registry.heroku.com/github-of-life/web  
open http://localhost:8080
docker stop githuboflife


# create the new release
heroku container:release web -a github-of-life
open https://github-of-life.herokuapp.com/
```

## 👀 Resources

* Heroku CLI [here](https://devcenter.heroku.com/articles/heroku-cli)
* Deploy Heroku [here](https://dashboard.heroku.com/apps/leaving-conde/deploy/heroku-container)
* Heroku container-registry-and-runtime [here](https://devcenter.heroku.com/articles/container-registry-and-runtime)
* parcel-plugin-static-files-copy [here](https://github.com/elwin013/parcel-reporter-static-files-copy)
* How to copy static files [here](https://stackoverflow.com/questions/63102658/how-to-serve-a-json-file-with-parcel-without-bundling-it)
* Using fetch with TypeScript [here](https://kentcdodds.com/blog/using-fetch-with-type-script)
* Summary Card with Large Image [here](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/)summary-card-with-large-image
* Learn how to include Bootstrap in your project using Parcel. [here](https://getbootstrap.com/docs/5.0/getting-started/parcel/)
* GoogleContainerTools/container-structure-test [here](https://github.com/GoogleContainerTools/container-structure-test)
* https://github.com/chrisguest75/docker_build_examples/tree/master/33_label_metadata
* https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#onpushpull_requestpaths
* https://www.npmjs.com/package/jest-junit
* Heroku github actions https://dev.to/heroku/deploying-to-heroku-from-github-actions-29ej
* https://github.com/actions/virtual-environments/blob/main/images/linux/Ubuntu1804-README.md

### Semgrep
* Semgrep rules repository [here](https://github.com/returntocorp/semgrep-rules)
* Semgrepping github actions [here](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#github-actions)
* Semgrep github action [here](https://github.com/marketplace/actions/semgrep-action)

* Filtering rules is not supported
https://github.com/returntocorp/semgrep/issues/2530
https://github.com/returntocorp/semgrep-action/pull/319

* Better NPM Audit [here](https://www.npmjs.com/package/better-npm-audit)

### Documentation

* A documentation generator for TypeScript projects. [here](https://typedoc.org/)
