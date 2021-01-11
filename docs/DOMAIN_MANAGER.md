# Serverless Domain Manager

The [serverless domain manager](https://www.npmjs.com/package/serverless-domain-manager) is a plugin for the serverless.com system.

The IAM roles required for deploying when using the serverless-domain manager:

```
acm:ListCertificates                *
apigateway:GET                      /domainnames/*
apigateway:GET                      /domainnames/*/basepathmappings
apigateway:DELETE                   /domainnames/*
apigateway:POST                     /domainnames
apigateway:POST                     /domainnames/*/basepathmappings
apigateway:PATCH                    /domainnames/*/basepathmapping
cloudformation:GET                  *
cloudfront:UpdateDistribution       *
route53:ListHostedZones             *
route53:ChangeResourceRecordSets    hostedzone/{HostedZoneId}
route53:GetHostedZone               *
route53:ListResourceRecordSets      *
iam:CreateServiceLinkedRole         arn:aws:iam::${AWS::AccountId}: role/aws-service-role/ops.apigateway.amazonaws.com/AWSServiceRoleForAPIGateway
```

NOTE: there was an [original request](https://github.com/Open-SL/serverless-permission-generator/issues/19) to separate Route53 concepts in the builder as a sub-option of the domain manager selector.

NOTE: Currently providing a resource of `hostedzone/*` instead of `hostedzone/{HostedZoneId}`