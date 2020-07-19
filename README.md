# Serverless Permission Policy Generator

An Online Application to generate AWS IAM permissions to deploy Serverless Framework in you cloud.

## Introduction

This application will provide you a user friendly UI to collect required resources details and a generator to build the relevant IAM policy for the collected information. 

Visit the application from [here](https://open-sl.github.io/serverless-permission-generator/)

## Available Features

1. Basic permissions required for serverless application to be deployed
2. S3 buckets created from serverless yaml
3. SNS topics
4. SQS
5. Api Gateway if required
6. Security group and VPC configuration related permission to connect to VPN
7. Kinesis
8. DynamoDB 
9. ALB listener and target group attachment permission required for lambdas exposed through ALBs.

## How to use

1. Enter project details and AWS account details
2. Input required AWS resources details
3. Click generate button
4. Check the generated JSON
5. Click copy button to copy values to clipboard
6. Paste values in your IAM role permission policy

## Development Guide

### Prerequisites
- git
- npm

clone the application and install dependencies using

```
npm install
```

run

```
npm start
```

to deploy application in localhost.

## Contributing

- We would greatly appreciate any [contribution](CONTRIBUTING.md) you make.
- If you have ideas for more functionality or recipes that should be on this project, l[let us know](https://github.com/Open-SL/serverless-permission-generator/issues).

## Project Maintainers

- Nadun Indunil - [nadunindunil](https://github.com/nadunindunil)
- Sachintha Sandeepani - [sachintha97](https://github.com/sachintha97)

## License
Serverless Permission Policy Generator is under the MIT license. See the [License](LICENSE) for more information.