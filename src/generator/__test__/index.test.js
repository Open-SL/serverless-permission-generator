import generator, {
  s3Generator,
  kinesisGenerator,
  sqsGenerator,
  albGenerator,
  sgGenerator,
  dynamoDBGenerator,
  snsGenerator,
  apiGWGenerator,
  ssmGenerator,
  warmupPluginGenerator,
  domainManagerGenerator,
} from '..';

test('generating minimum policy', () => {
  const region = 'us-east-1';
  const projectName = 'hacktoberfest';
  const stage = 'test';
  const accountId = '123456789098';

  expect(generator({ region, projectName, stage, accountId })).toEqual({
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
          's3:DeleteBucketPolicy',
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
    ],
  });
});

test('generating S3 policy ', () => {
  expect(s3Generator(['testbucket'])).toEqual({
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
      's3:DeleteBucketPolicy',
    ],
    Resource: [`arn:aws:s3:::testbucket`],
  });
});

test('generating kinesis policy ', () => {
  expect(kinesisGenerator(['teststream'])).toEqual({
    Effect: 'Allow',
    Action: 'kinesis:*',
    Resource: [`arn:aws:kinesis:*:*:stream/teststream`],
  });
});

test('generating sqs policy ', () => {
  expect(sqsGenerator(['testsqs'], 'region1', '12345')).toEqual([
    {
      Effect: 'Allow',
      Action: 'sqs:*',
      Resource: [`arn:aws:sqs:*:testsqs`],
    },
    {
      Effect: 'Allow',
      Action: 'logs:PutSubscriptionFilter',
      Resource: [
        `arn:aws:logs:region1:12345:log-group:/aws/lambda/*`,
        `arn:aws:logs:region1:12345:log-group:/aws/api-gateway/*`,
      ],
    },
  ]);
});

test('generating albGenerator policy ', () => {
  expect(albGenerator(['arn'])).toEqual({
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
    Resources: ['arn'],
  });
});

test('generating sg policy ', () => {
  expect(sgGenerator('testsqs')).toEqual({
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
  });
});

test('generating dynamoDB policy', () => {
  expect(dynamoDBGenerator(['db'], '12345')).toEqual({
    Effect: 'Allow',
    Action: ['dynamodb:*'],
    Resource: [`arn:aws:dynamodb:*:12345:table/db`],
  });
});

test('generating sns policy ', () => {
  expect(snsGenerator(['topic1'], 'region', 'account')).toEqual({
    Effect: 'Allow',
    Action: ['sns:*'],
    Resource: [`arn:aws:sns:region:account:topic1`],
  });
});

test('generating apiGW policy ', () => {
  expect(apiGWGenerator()).toEqual({
    Effect: 'Allow',
    Action: ['apigateway:GET', 'apigateway:POST', 'apigateway:PUT', 'apigateway:DELETE', 'apigateway:PATCH'],
    Resource: [
      'arn:aws:apigateway:*::/apis*',
      'arn:aws:apigateway:*::/restapis*',
      'arn:aws:apigateway:*::/apikeys*',
      'arn:aws:apigateway:*::/usageplans*',
    ],
  });
});

test('generating ssm policy ', () => {
  expect(ssmGenerator()).toEqual({
    Effect: 'Allow',
    Action: [
      'ssm:DescribeParameters',
      'ssm:GetParameter',
      'ssm:GetParameters',
      'ssm:GetParametersByPath',
      'kms:Decrypt',
    ],
    Resource: ['*'],
  });
});

test('generating warm up plugin policy ', () => {
  expect(warmupPluginGenerator('region', 'account', ['rule1'])).toEqual({
    Effect: 'Allow',
    Action: ['events:DescribeRule', 'events:PutRule', 'events:DeleteRule', 'events:PutTargets', 'events:RemoveTargets'],
    Resource: [`arn:aws:events:region:account:rule/rule1`],
  });
});

test('domainManagerGenerator policy - route53 (false) ', () => {
  expect(domainManagerGenerator('region', 'account', false)).toEqual([
    {
      Effect: 'Allow',
      Action: ['acm:ListCertificates'],
      Resource: ['*'],
    },
    {
      Effect: 'Allow',
      Action: ['apigateway:GET', 'apigateway:DELETE'],
      Resource: [`arn:aws:apigateway:region:account:/domainnames/*`],
    },
    {
      Effect: 'Allow',
      Action: ['apigateway:GET', 'apigateway:POST'],
      Resource: [`arn:aws:apigateway:region:account:/domainnames/*/basepathmappings`],
    },
    {
      Effect: 'Allow',
      Action: ['apigateway:PATCH'],
      Resource: [`arn:aws:apigateway:region:account:/domainnames/*/basepathmapping`],
    },
    {
      Effect: 'Allow',
      Action: ['apigateway:POST'],
      Resource: [`arn:aws:apigateway:region:account:/domainnames`],
    },
    {
      Effect: 'Allow',
      Action: ['cloudformation:GET'],
      Resource: ['*'],
    },
    {
      Effect: 'Allow',
      Action: ['cloudfront:UpdateDistribution'],
      Resource: ['*'],
    },
    {
      Effect: 'Allow',
      Action: ['iam:CreateServiceLinkedRole'],
      Resource: [`arn:aws:iam:::role/aws-service-role/ops.apigateway.amazonaws.com/AWSServiceRoleForAPIGateway`],
    },
  ]);
});

test('domainManagerGenerator policy - route53 (true) ', () => {
  expect(domainManagerGenerator('region', 'account', true)).toEqual([
    {
      Effect: 'Allow',
      Action: ['acm:ListCertificates'],
      Resource: ['*'],
    },
    {
      Effect: 'Allow',
      Action: ['apigateway:GET', 'apigateway:DELETE'],
      Resource: [`arn:aws:apigateway:region:account:/domainnames/*`],
    },
    {
      Effect: 'Allow',
      Action: ['apigateway:GET', 'apigateway:POST'],
      Resource: [`arn:aws:apigateway:region:account:/domainnames/*/basepathmappings`],
    },
    {
      Effect: 'Allow',
      Action: ['apigateway:PATCH'],
      Resource: [`arn:aws:apigateway:region:account:/domainnames/*/basepathmapping`],
    },
    {
      Effect: 'Allow',
      Action: ['apigateway:POST'],
      Resource: [`arn:aws:apigateway:region:account:/domainnames`],
    },
    {
      Effect: 'Allow',
      Action: ['cloudformation:GET'],
      Resource: ['*'],
    },
    {
      Effect: 'Allow',
      Action: ['cloudfront:UpdateDistribution'],
      Resource: ['*'],
    },
    {
      Effect: 'Allow',
      Action: ['route53:ListHostedZones', 'route53:GetHostedZone', 'route53:ListResourceRecordSets'],
      Resource: ['*'],
    },
    {
      Effect: 'Allow',
      Action: ['route53:ChangeResourceRecordSets'],
      Resource: [`arn:aws:route53:::hostedzone/*`],
    },
    {
      Effect: 'Allow',
      Action: ['iam:CreateServiceLinkedRole'],
      Resource: [`arn:aws:iam:::role/aws-service-role/ops.apigateway.amazonaws.com/AWSServiceRoleForAPIGateway`],
    },
  ]);
});
