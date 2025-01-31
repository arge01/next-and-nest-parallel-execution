```bash
npm i -g concurrently
npm i -g yarn

node --version
#20.18.2^

yarn --version
#1.22.22^

npm concurrently --version
#11.0.0^
```


Run the development server:

```bash
yarn install --ignore-scripts

yarn run dev
#localhost:8000
#localhost:3000
```


Run docker server:
```bash
docker-compose up --build -d
```


# backend: http://localhost:8000
# frontend: http://localhost:3000