# About
A simple node crawler based on the example German website of [produktion.de].

# Setup
## Install environment
Install **node.js** and the node.js package manager **npm**.

Downlaod the newest installation file from [https://nodejs.org/en/] and install it with the default installation settings.

Test if node and npm are installed correctly by running `node -v` and `npm -v`. You should receive a version number and no errors.


## Install dependencies
In this directory run `npm install` to install all requierd dependencies of the program.

# Run the crawler
In this directory run `ts-node index.ts` to start the crawler. The results are put into the **crawler-response** directory.

## Troubleshooting
If the error occures that "command ts-node can not be found" you need to install two dependencies globally by running:

~~~
npm install -D ts-node
npm install -D typescript
~~~