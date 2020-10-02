<p align="center">
  <a href="https://medtech.africa">
    <img src="https://medtech.africa/logo.png" height="96">
    <h3 align="center">Medtech Africa</h3>
  </a>
  <p align="center">The official website for Medtech Africa.</p>
</p>

[![CI Status](https://badgen.net/github/checks/vercel/vercel?label=CI)](https://github.com/vercel/vercel/actions?workflow=CI)

Medtech Africa's web app built with React with static generation rendering using NextJs.

## Documentation

### Getting list of banks (Nigerian)

GET /get-banks

```javascript
const data = await fetchWithToken("/get-banks")

//or

fetchWithToken("/get-banks").then((data) => console.log(data))
```

### To resolve an account number (Nigerian)

POST /resolve-account

```javascript
const data = await fetchWithToken("/resolve-account", {
  body: {
    account_number: "acct nuber",
    bank_code: "xxx",
  },
})

//or

fetchWithToken("/resolve-account", {
  body: {
    account_number: "3086589618",
    bank_code: "011",
  },
}).then((data) => console.log(data))
```

## Contribution

If you have write access to this repository, you can read more about how to submit a feature, bug fix, or enhancement to the website proceed as follows:

1. Clone this repository
2. Run `yarn` or `npm install` to install the dependencies
3. Once the dependencies are installed, run `yarn dev` or `npm run dev` to start the dev server on `localhost:3000`

## Caught a Bug?

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Install dependencies with `yarn install`
3. Compile the code: `yarn build`
4. Link the package to the global module directory: `cd ./packages/now-cli && yarn link`
5. You can start using `vercel` anywhere inside the command line

As always, you should use `yarn test-unit` to run the tests and see if your changes have broken anything.
