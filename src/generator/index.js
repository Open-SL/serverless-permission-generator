const s3Generator = (bucketNames) => {
  return {
    Effect: 'Allow',
    Action: [
      's3:GetBucketLocation',
      's3:CreateBucket',
      's3:DeleteBucket',
      's3:ListBucket',
      's3:GetBucketPolicy',
      's3:PutBucketPolicy',
      's3:ListBucketVersions',
      's3:PutAccelerateConfiguration',
      's3:GetEncryptionConfiguration',
      's3:PutEncryptionConfiguration',
    ],
    Resource: bucketNames.map((bucketName) => `arn:aws:s3:::${bucketName}`),
  };
};

const kinesisGenerator = (streams) => {
  return {
    Effect: 'Allow',
    Action: 'kinesis:*',
    Resource: streams.map((stream) => `arn:aws:kinesis:*:*:stream/${stream}`),
  };
};

const sqsGenerator = (queueArray) => {
  return {
    Effect: 'Allow',
    Action: 'sqs:*',
    Resource: queueArray.map((queue) => `arn:aws:sqs:*:${queue}`),
  };
};

// when attaching ALBs instead of API gateways
const albGenerator = (albs) => {
  return {
    Effect: 'Allow',
    Action: [
      'elasticloadbalancing:RegisterTargets',
      'elasticloadbalancing:DescribeRules',
      'elasticloadbalancing:DeleteRule',
      'elasticloadbalancing:CreateTargetGroup',
      'elasticloadbalancing:ModifyTargetGroup',
      'elasticloadbalancing:ModifyTargetGroupAttributes',
      'elasticloadbalancing:ModifyRule',
      'elasticloadbalancing:ModifyListener',
      'elasticloadbalancing:AddTags',
      'elasticloadbalancing:DeleteTargetGroup',
      'elasticloadbalancing:DescribeTargetGroups',
      'elasticloadbalancing:DescribeTargetHealth',
      'elasticloadbalancing:CreateRule',
    ],
    // TODO: identify last code in Listener ARN eg `arn:aws:elasticloadbalancing:${region}:${accountId}:listener/app/bff-alb-dev/b14591ea09ab9bd5/a6fac441aee4440b`
    Resources: albs.map((albArn) => `${albArn}`),
  };
};

// TODO: fix all access
// sg attach and VPC attach to lambda
const sgGenerator = (sGroups) => {
  return {
    Effect: 'Allow',
    Action: [
      'ec2:AuthorizeSecurityGroupEgress',
      'ec2:AuthorizeSecurityGroupIngress',
      'ec2:CreateSecurityGroup',
      'ec2:DeleteSecurityGroup',
      'ec2:DescribeSecurityGroups',
      'ec2:DescribeNetworkInterfaces',
      'ec2:DescribeSubnets',
      'ec2:DescribeVpcs',
      'ec2:DescribeDhcpOptions',
      'ec2:RevokeSecurityGroupEgress',
      'ec2:RevokeSecurityGroupIngress',
      'ec2:CreateNetworkInterfacePermission',
      'ec2:CreateNetworkInterface',
      'ec2:DeleteNetworkInterfacePermission',
      'ec2:DeleteNetworkInterface',
      'ec2:createTags',
      'ec2:deleteTags',
    ],
    Resource: ['*'],
  };
};

const dynamoDBGenerator = (dbs, account) => {
  return {
    Effect: 'Allow',
    Action: ['dynamodb:*'],
    Resource: dbs.map((db) => `arn:aws:dynamodb:*:${account}:table/${db}`),
  };
};

const snsGenerator = (topics, region, account) => {
  return {
    Effect: 'Allow',
    Action: ['sns:*'],
    Resource: topics.map((topic) => `arn:aws:sns:${region}:${account}:${topic}`),
  };
};

const apiGWGenerator = () => {
  return {
    Effect: 'Allow',
    Action: ['apigateway:GET', 'apigateway:POST', 'apigateway:PUT', 'apigateway:DELETE', 'apigateway:PATCH'],
    Resource: [
      'arn:aws:apigateway:*::/restapis*',
      'arn:aws:apigateway:*::/apikeys*',
      'arn:aws:apigateway:*::/usageplans*',
    ],
  };
};

const generator = ({
  projectName,
  accountId,
  stage,
  region,
  isS3Required,
  s3Array,
  isSnsRequired,
  snsArray,
  isApiGWRequired,
  isSgRequired,
  isAlbRequired,
  albArray,
  isSqsRequired,
  sqsArray,
  isKinesisRequired,
  kinesisArray,
  isDynamoDbRequired,
  dynamoDbArray,
}) => {
  return {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Action: ['cloudformation:List*', 'cloudformation:Get*', 'cloudformation:ValidateTemplate'],
        Resource: ['*'],
      },
      {
        Effect: 'Allow',
        Action: [
          'cloudformation:CreateStack',
          'cloudformation:CreateUploadBucket',
          'cloudformation:DeleteStack',
          'cloudformation:Describe*',
          'cloudformation:UpdateStack',
        ],
        Resource: [`arn:aws:cloudformation:${region}:${accountId}:stack/${projectName}-${stage}/*`],
      },
      {
        Effect: 'Allow',
        Action: ['lambda:Get*', 'lambda:List*', 'lambda:CreateFunction'],
        Resource: ['*'],
      },
      {
        Effect: 'Allow',
        Action: [
          's3:GetBucketLocation',
          's3:CreateBucket',
          's3:DeleteBucket',
          's3:ListBucket',
          's3:GetBucketPolicy',
          's3:PutBucketPolicy',
          's3:ListBucketVersions',
          's3:PutAccelerateConfiguration',
          's3:GetEncryptionConfiguration',
          's3:PutEncryptionConfiguration',
        ],
        Resource: [`arn:aws:s3:::${projectName}*serverlessdeploy*`],
      },
      {
        Effect: 'Allow',
        Action: ['s3:PutObject', 's3:GetObject', 's3:DeleteObject'],
        Resource: [`arn:aws:s3:::${projectName}*serverlessdeploy*`],
      },
      {
        Effect: 'Allow',
        Action: [
          'lambda:AddPermission',
          'lambda:CreateAlias',
          'lambda:DeleteFunction',
          'lambda:InvokeFunction',
          'lambda:PublishVersion',
          'lambda:RemovePermission',
          'lambda:Update*',
        ],
        Resource: [`arn:aws:lambda:${region}:${accountId}:function:${projectName}-${stage}-*`],
      },

      {
        Effect: 'Allow',
        Action: ['cloudwatch:GetMetricStatistics'],
        Resource: ['*'],
      },
      {
        Action: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:DeleteLogGroup'],
        Resource: [`arn:aws:logs:${region}:${accountId}:*`],
        Effect: 'Allow',
      },
      {
        Action: ['logs:PutLogEvents'],
        Resource: [`arn:aws:logs:${region}:${accountId}:*`],
        Effect: 'Allow',
      },
      {
        Effect: 'Allow',
        Action: ['logs:DescribeLogStreams', 'logs:DescribeLogGroups', 'logs:FilterLogEvents'],
        Resource: ['*'],
      },
      {
        Effect: 'Allow',
        Action: ['events:Put*', 'events:Remove*', 'events:Delete*'],
        Resource: [`arn:aws:events:${region}:${accountId}:rule/${projectName}-${stage}-${region}`],
      },
      {
        Effect: 'Allow',
        Action: ['events:DescribeRule'],
        Resource: [`arn:aws:events:${region}:${accountId}:rule/${projectName}-${stage}-*`],
      },
      {
        Effect: 'Allow',
        Action: ['iam:PassRole'],
        Resource: [`arn:aws:iam::${accountId}:role/*`],
      },
      {
        Effect: 'Allow',
        Action: ['iam:GetRole', 'iam:CreateRole', 'iam:PutRolePolicy', 'iam:DeleteRolePolicy', 'iam:DeleteRole'],
        Resource: [`arn:aws:iam::${accountId}:role/${projectName}-${stage}-${region}-lambdaRole`],
      },
      isS3Required ? s3Generator(s3Array) : null,
      isSnsRequired ? snsGenerator(snsArray, region, accountId) : null,
      isApiGWRequired ? apiGWGenerator() : null,
      isSgRequired ? sgGenerator() : null,
      isAlbRequired ? albGenerator(albArray) : null,
      isSqsRequired ? sqsGenerator(sqsArray) : null,
      isKinesisRequired ? kinesisGenerator(kinesisArray) : null,
      isDynamoDbRequired ? dynamoDBGenerator(dynamoDbArray, accountId) : null,
    ],
  };
};

export default generator;
