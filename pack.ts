import * as coda from '@codahq/packs-sdk';
import percentile from 'percentile';
// import exp = require("constants");
export const pack = coda.newPack();

// This code is in alpha and is meant for internal use in Open Collective at the moment.

pack.addNetworkDomain('api.opencollective.com');

pack.setUserAuthentication({
  type: coda.AuthenticationType.OAuth2,
  authorizationUrl: 'https://opencollective.com/oauth/authorize',
  tokenUrl: 'https://opencollective.com/oauth/token',
});

// Utility functions

function extractImagesFromHTML(html) {
  const regex = /<img[^>]+src="?([^"\s]+)"?\s*\/?>/g;
  let match;
  const images = [];
  while ((match = regex.exec(html)) !== null) {
    images.push(match[1]);
  }
  return images;
}

// Schema definitions

const MemberSchema = coda.makeObjectSchema({
  properties: {
    slug: {
      type: coda.ValueType.String,
      description: 'The slug of the member.',
    },
    role: {
      type: coda.ValueType.String,
      description: 'The role of the member.',
    },
    name: {
      type: coda.ValueType.String,
      description: 'The name of the member.',
    },
    email: {
      type: coda.ValueType.String,
      description: 'The email of the member.',
    },
    approvalCount: {
      type: coda.ValueType.Number,
      description: 'The number of approvals the member has made.',
    },
  },
  displayProperty: 'name',
  idProperty: 'slug',
});

const ExpensesTagsSchema = coda.makeObjectSchema({
  properties: {
    id: {
      type: coda.ValueType.Number,
      description: 'The ID of the tag.',
    },
    tag: {
      type: coda.ValueType.String,
      description: 'The tag.',
    },
    count: {
      type: coda.ValueType.Number,
      description: 'The number of times the tag has been used.',
    },
  },
  displayProperty: 'tag',
  idProperty: 'id',
});

const OrderSchema = coda.makeObjectSchema({
  properties: {
    id: {
      type: coda.ValueType.Number,
      description: 'The ID of the order.',
    },
    legacyId: {
      type: coda.ValueType.Number,
      description: 'The legacy ID of the order.',
    },
    amountValueInCents: {
      type: coda.ValueType.Number,
      description: 'The amount of the order in cents.',
    },
    amountCurrency: {
      type: coda.ValueType.String,
      description: 'The currency of the order amount.',
    },
    totalAmountValueInCents: {
      type: coda.ValueType.Number,
      description: 'The total amount of the order in cents.',
    },
    totalAmountCurrency: {
      type: coda.ValueType.String,
      description: 'The currency of the order total amount.',
    },
    createdAt: {
      type: coda.ValueType.String,
      description: 'The date the order was created.',
    },
    updatedAt: {
      type: coda.ValueType.String,
      description: 'The date the order was updated.',
    },
    createdByAccountSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the account that created the order.',
    },
    createdByAccountEmail: {
      type: coda.ValueType.String,
      description: 'The email of the account that created the order.',
    },
    memo: {
      type: coda.ValueType.String,
      description: 'The memo of the order.',
    },
    paymentMethodName: {
      type: coda.ValueType.String,
      description: 'The payment method name of the order.',
    },
    pendingContributionExpectedAt: {
      type: coda.ValueType.String,
      description: 'The date the pending contribution is expected.',
    },
    status: {
      type: coda.ValueType.String,
      description: 'The status of the order.',
    },
    toAccountSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the account the order is going to.',
    },
    toAccountParentSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the parent account the order is going to.',
    },
    processedAt: {
      type: coda.ValueType.String,
      description: 'The date the order was processed.',
    },
    description: {
      type: coda.ValueType.String,
      description: 'The description of the order.',
    },
    data: {
      type: coda.ValueType.String,
      description: 'The data of the order.',
    },
  },
  idProperty: 'id',
  displayProperty: 'description',
});

const PercentilesSchema = coda.makeObjectSchema({
  properties: {
    sourceData: {
      type: coda.ValueType.String,
      description: 'The source data of the percentiles.',
    },
    p10th: {
      type: coda.ValueType.Number,
      description: 'The 10th percentile.',
    },
    p25th: {
      type: coda.ValueType.Number,
      description: 'The 25th percentile.',
    },
    p50th: {
      type: coda.ValueType.Number,
      description: 'The 50th percentile.',
    },
    p75th: {
      type: coda.ValueType.Number,
      description: 'The 75th percentile.',
    },
    p90th: {
      type: coda.ValueType.Number,
      description: 'The 90th percentile.',
    },
  },
  idProperty: 'sourceData',
  displayProperty: 'sourceData',
});

const CommentSchema = coda.makeObjectSchema({
  properties: {
    id: {
      type: coda.ValueType.String,
      description: 'The ID of the comment.',
    },
    createdAt: {
      type: coda.ValueType.String,
      description: 'The date the comment was created.',
    },
    html: {
      type: coda.ValueType.String,
      description: 'The HTML of the comment.',
    },
    accountSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the account that created the comment.',
    },
    fromAccountSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the account that created the comment.',
    },
  },
  idProperty: 'id',
  displayProperty: 'html',
});

const ExpenseSchema = coda.makeObjectSchema({
  properties: {
    accountSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the account the expense belongs to.',
    },
    accountName: {
      type: coda.ValueType.String,
      description: 'The name of the account the expense belongs to.',
    },
    accountPercentileRange: {
      type: coda.ValueType.String,
      description:
        'The percentile range that the expense amount falls into when compared to the last 100 expenses to the collective.',
    },
    accountParentSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the parent account the expense belongs to.',
    },
    accountParentName: {
      type: coda.ValueType.String,
      description: 'The name of the parent account the expense belongs to.',
    },
    accountHostSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the host account the expense belongs to.',
    },
    amountValueInCents: {
      type: coda.ValueType.Number,
      description: 'The amount of the expense in cents.',
    },
    amountCurrency: {
      type: coda.ValueType.String,
      description: 'The currency of the expense amount.',
    },
    amountSourceCurrency: {
      type: coda.ValueType.String,
      description: 'The source currency of the expense amount.',
    },
    commentsCount: {
      type: coda.ValueType.Number,
      description: 'The number of comments on the expense.',
    },
    comments: {
      type: coda.ValueType.Array,
      description: 'The comments on the expense.',
      items: CommentSchema,
    },
    createdAt: {
      type: coda.ValueType.String,
      description: 'The date the expense was created.',
    },
    createdByAccountSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the account that created the expense.',
    },
    createdByAccountEmail: {
      type: coda.ValueType.String,
      description: 'The email of the account that created the expense.',
    },
    description: {
      type: coda.ValueType.String,
      description: 'The description of the expense.',
    },
    id: {
      type: coda.ValueType.String,
      description: 'The ID of the expense.',
    },
    itemUrls: {
      type: coda.ValueType.Array,
      description: 'The item URLs of the expense.',
      items: coda.makeSchema({
        type: coda.ValueType.String,
      }),
    },
    legacyId: {
      type: coda.ValueType.Number,
      description: 'The legacy ID of the expense.',
    },
    payeeSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the payee of the expense.',
    },
    payeePercentileRange: {
      type: coda.ValueType.String,
      description:
        'The percentile range that the expense amount falls into when compared to the last 100 payouts to the payee.',
    },
    payoutMethodName: {
      type: coda.ValueType.String,
      description: 'The payout method name of the expense.',
    },
    payoutMethodType: {
      type: coda.ValueType.String,
      description: 'The payout method type of the expense.',
    },
    status: {
      type: coda.ValueType.String,
      description: 'The status of the expense.',
    },
    tags: {
      type: coda.ValueType.Array,
      description: 'The tags of the expense.',
      items: coda.makeSchema({
        type: coda.ValueType.String,
      }),
    },
    type: {
      type: coda.ValueType.String,
      description: 'The type of the expense.',
    },
    virtualCardId: {
      type: coda.ValueType.String,
      description: 'The virtual card ID of the expense.',
    },
    virtualCardAssigneeSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the assignee of the virtual card.',
    },
    virtualCardAccountSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the account the virtual card belongs to.',
    },
    daysBetweenCreatedAndPaid: {
      type: coda.ValueType.Number,
      description: 'The number of days between the expense being created and paid.',
    },
    daysBetweenApprovedAndPaid: {
      type: coda.ValueType.Number,
      description: 'The number of days between the expense being approved and paid.',
    },
    approvedBeforeRejection: {
      type: coda.ValueType.Boolean,
      description: 'Whether the expense was approved before being rejected.',
    },
    securityChecks: {
      type: coda.ValueType.Array,
      description: 'The security checks of the expense.',
      items: coda.makeSchema({
        type: coda.ValueType.String,
      }),
    },
    missingReceipt: {
      type: coda.ValueType.Boolean,
      description: 'Whether the expense is missing a receipt.',
    },
    last100ExpensesValuesInCentsToCollective: {
      type: coda.ValueType.Array,
      description: 'The last 100 expense values in cents to the collective.',
      items: coda.makeSchema({
        type: coda.ValueType.Number,
      }),
    },
    last100ExpensesValuesInCentsToPayee: {
      type: coda.ValueType.Array,
      description: 'The last 100 expense values in cents to the payee.',
      items: coda.makeSchema({
        type: coda.ValueType.Number,
      }),
    },
    collectiveExpensePercentileRanges: PercentilesSchema,
    payeeExpensePercentileRanges: PercentilesSchema,
  },
  idProperty: 'id',
  displayProperty: 'description',
});

const SocialLinkSchema = coda.makeObjectSchema({
  description: 'A social link.',
  properties: {
    type: {
      type: coda.ValueType.String,
      description: 'The type of social link.',
    },
    url: {
      type: coda.ValueType.String,
      description: 'The URL of the social link.',
    },
  },
  displayProperty: 'type',
  idProperty: 'url',
});

const UpdateSchema = coda.makeObjectSchema({
  properties: {
    id: {
      type: coda.ValueType.String,
      description: 'The ID of the update.',
    },
    title: {
      type: coda.ValueType.String,
      description: 'The title of the update.',
    },
    createdAt: {
      type: coda.ValueType.String,
      description: 'The date the update was created.',
    },
    slug: {
      type: coda.ValueType.String,
      description: 'The slug of the update.',
    },
    summary: {
      type: coda.ValueType.String,
      description: 'The summary of the update.',
    },
    html: {
      type: coda.ValueType.String,
      description: 'The HTML of the update.',
    },
    accountSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the account that created the update.',
    },
    accountImageUrl: {
      type: coda.ValueType.String,
      description: 'The image URL of the account that created the update.',
    },
    accountName: {
      type: coda.ValueType.String,
      description: 'The name of the account that created the update.',
    },
    fromAccountId: {
      type: coda.ValueType.String,
      description: 'The ID of the account that created the update.',
    },
    fromAccountName: {
      type: coda.ValueType.String,
      description: 'The name of the account that created the update.',
    },
    fromAccountImageUrl: {
      type: coda.ValueType.String,
      description: 'The image URL of the account that created the update.',
    },
    images: {
      type: coda.ValueType.Array,
      description: 'The images of the update.',
      items: coda.makeSchema({
        type: coda.ValueType.String,
        codaType: coda.ValueHintType.ImageAttachment,
      }),
    },
    accountSocialLinks: {
      type: coda.ValueType.Array,
      description: 'The social links of the collective.',
      items: SocialLinkSchema,
    },
    fromAccountSocialLinks: {
      type: coda.ValueType.Array,
      description: 'The social links of the author.',
      items: SocialLinkSchema,
    },
  },
  idProperty: 'id',
  displayProperty: 'title',
});

const CollectiveSchema = coda.makeObjectSchema({
  properties: {
    collectiveId: {
      type: coda.ValueType.String,
      description: 'The ID of the collective.',
    },
    createdAt: {
      type: coda.ValueType.String,
      description: 'The date the collective was created.',
    },
    approvedAt: {
      type: coda.ValueType.String,
      description: 'The date the collective was approved.',
    },
    hostFeePercent: {
      type: coda.ValueType.Number,
      description: 'The host fee percent of the collective.',
    },
    admins: {
      type: coda.ValueType.Array,
      items: MemberSchema,
      description: 'The admins of the collective.',
    },
    name: {
      type: coda.ValueType.String,
      description: 'The name of the collective.',
    },
    slug: {
      type: coda.ValueType.String,
      description: 'The slug of the collective.',
    },
    description: {
      type: coda.ValueType.String,
      description: 'The description of the collective.',
    },
    socialLinks: {
      type: coda.ValueType.Array,
      description: 'The social links of the collective.',
      items: SocialLinkSchema,
    },
    locationName: {
      type: coda.ValueType.String,
      description: 'The location name of the collective.',
    },
    locationAddress: {
      type: coda.ValueType.String,
      description: 'The location address of the collective.',
    },
    locationCountry: {
      type: coda.ValueType.String,
      description: 'The location country of the collective.',
    },
    type: {
      type: coda.ValueType.String,
      description: 'The type of the collective.',
    },
    currency: {
      type: coda.ValueType.String,
      description: 'The currency of the collective.',
    },
    isFrozen: {
      type: coda.ValueType.Boolean,
      description: 'Whether the collective is frozen.',
    },
    isActive: {
      type: coda.ValueType.Boolean,
      description: 'Whether the collective is active.',
    },
    isApproved: {
      type: coda.ValueType.Boolean,
      description: 'Whether the collective is approved.',
    },
    lastExpenseDate: {
      type: coda.ValueType.String,
      description: 'The date of the last expense.',
    },
    lastUpdateDate: {
      type: coda.ValueType.String,
      description: 'The date of the last update.',
    },
    lastUpdateSlug: {
      type: coda.ValueType.String,
      description: 'The slug of the last update.',
    },
    lastContributionDate: {
      type: coda.ValueType.String,
      description: 'The date of the last contribution.',
    },
    tags: {
      type: coda.ValueType.Array,
      items: {
        type: coda.ValueType.String,
      },
      description: 'The tags of the collective.',
    },
    balanceValueInCents: {
      type: coda.ValueType.Number,
      description: 'The balance of the collective in cents.',
    },
    balanceCurrency: {
      type: coda.ValueType.String,
      description: 'The currency of the collective balance.',
    },
    totalAmountSpentValueInCents: {
      type: coda.ValueType.Number,
      description: 'The total amount spent of the collective in cents.',
    },
    totalAmountReceivedValueInCents: {
      type: coda.ValueType.Number,
      description: 'The total amount received of the collective in cents.',
    },
    expenseCount: {
      type: coda.ValueType.Number,
      description: 'The total number of expenses to the collective.',
    },
    contributorsCount: {
      type: coda.ValueType.Number,
      description: 'The total number of contributors to the collective.',
    },
    contributionsCount: {
      type: coda.ValueType.Number,
      description: 'The total number of contributions to the collective.',
    },
    totalAmountSpentValueInCentsPast12Months: {
      type: coda.ValueType.Number,
      description: 'The total amount spent of the collective in cents in the past 12 months.',
    },
    totalAmountReceivedValueInCentsPast12Months: {
      type: coda.ValueType.Number,
      description: 'The total amount received of the collective in cents in the past 12 months.',
    },
    contributorsCountPast12Months: {
      type: coda.ValueType.Number,
      description: 'The total number of contributors to the collective in the past 12 months.',
    },
    contributionsCountPast12Months: {
      type: coda.ValueType.Number,
      description: 'The total number of contributions to the collective in the past 12 months.',
    },
    totalAmountSpentValueInCentsPast9Months: {
      type: coda.ValueType.Number,
      description: 'The total amount spent of the collective in cents in the past 9 months.',
    },
    totalAmountReceivedValueInCentsPast9Months: {
      type: coda.ValueType.Number,
      description: 'The total amount received of the collective in cents in the past 9 months.',
    },
    contributorsCountPast9Months: {
      type: coda.ValueType.Number,
      description: 'The total number of contributors to the collective in the past 9 months.',
    },
    contributionsCountPast9Months: {
      type: coda.ValueType.Number,
      description: 'The total number of contributions to the collective in the past 9 months.',
    },
    totalAmountSpentValueInCentsPast6Months: {
      type: coda.ValueType.Number,
      description: 'The total amount spent of the collective in cents in the past 6 months.',
    },
    totalAmountReceivedValueInCentsPast6Months: {
      type: coda.ValueType.Number,
      description: 'The total amount received of the collective in cents in the past 6 months.',
    },
    contributorsCountPast6Months: {
      type: coda.ValueType.Number,
      description: 'The total number of contributors to the collective in the past 6 months.',
    },
    contributionsCountPast6Months: {
      type: coda.ValueType.Number,
      description: 'The total number of contributions to the collective in the past 6 months.',
    },
    totalAmountSpentValueInCentsPast3Months: {
      type: coda.ValueType.Number,
      description: 'The total amount spent of the collective in cents in the past 3 months.',
    },
    totalAmountReceivedValueInCentsPast3Months: {
      type: coda.ValueType.Number,
      description: 'The total amount received of the collective in cents in the past 3 months.',
    },
    contributorsCountPast3Months: {
      type: coda.ValueType.Number,
      description: 'The total number of contributors to the collective in the past 3 months.',
    },
    contributionsCountPast3Months: {
      type: coda.ValueType.Number,
      description: 'The total number of contributions to the collective in the past 3 months.',
    },
    totalAmountSpentValueInCentsPast1Month: {
      type: coda.ValueType.Number,
      description: 'The total amount spent of the collective in cents in the past 1 month.',
    },
    totalAmountReceivedValueInCentsPast1Month: {
      type: coda.ValueType.Number,
      description: 'The total amount received of the collective in cents in the past 1 month.',
    },
    contributorsCountPast1Month: {
      type: coda.ValueType.Number,
      description: 'The total number of contributors to the collective in the past 1 month.',
    },
    contributionsCountPast1Month: {
      type: coda.ValueType.Number,
      description: 'The total number of contributions to the collective in the past 1 month.',
    },
    hostFeesStructure: {
      type: coda.ValueType.String,
      description: 'The host fees structure of the collective.',
    },
    employmentJustWorksCount: {
      type: coda.ValueType.Number,
      description: 'The total number of employment payments the collective has made to JustWorks.',
    },
    employmentJustWorksExpenses: {
      type: coda.ValueType.Array,
      items: ExpenseSchema,
      description: 'The employment expenses of the collective.',
    },
    latestJustWorksPaymentDate: {
      type: coda.ValueType.String,
      description: 'The date of the latest employment payment the collective has made to JustWorks.',
    },
    cashAssistanceCount: {
      type: coda.ValueType.Number,
      description: 'The total number of cash assistance payments the collective has made.',
    },
    latestCashAssistancePaymentDate: {
      type: coda.ValueType.String,
      description: 'The date of the latest cash assistance payment the collective has made.',
    },
  },
  displayProperty: 'name',
  idProperty: 'slug',
});

// Sync tables

// Expenses to host
pack.addSyncTable({
  name: 'ExpensesToHost',
  description: 'Lists all expenses to host.',
  identityName: 'ExpenseToHost',
  schema: ExpenseSchema,
  formula: {
    name: 'SyncExpensesToHost',
    description: 'Syncs expenses to host.',
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: 'slug',
        description: 'The slug of the host you want to retrieve expenses to host from.',
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: 'limit',
        optional: true,
        description: 'The number of expenses you want to retrieve per request.',
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: 'days',
        optional: true,
        description: 'The number of days you want to retrieve expenses from.',
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: 'status',
        optional: true,
        description: 'The status of expenses you want to retrieve.',
      }),
    ],
    execute: async function (args, context) {
      const [slug, limit, days, status] = args;

      const query = `
      query searchExpenses(
        $host: AccountReferenceInput, 
        $status: ExpenseStatusFilter,
        $dateFrom: DateTime,
        $limit: Int, 
        $offset: Int
        ) 
        {
        expenses(host: $host, dateFrom: $dateFrom, limit: $limit, offset: $offset, status: $status) {
          limit
          offset
          totalCount
          nodes {
            account {
              slug
              name
              transactions(limit: 100, type: DEBIT, kind: EXPENSE) {
                limit
                offset
                totalCount
                nodes {
                  type
                  amountInHostCurrency {
                    valueInCents
                  }
                }
              }
              ... on AccountWithParent {
                parent {
                  slug
                  name
                }
              }
              ... on AccountWithHost {
                host {
                  slug                }
              } 
            }
            comments(limit: 100) {
              limit
              offset
              totalCount
              nodes {
                id
                createdAt
                html
                account {
                  slug
                }
                fromAccount {
                  slug
                }
              }
            }
            activities {
              createdAt
              data
              fromAccount {
                slug
                emails
              }
              isSystem
              type
            }
            amountV2(currencySource: ACCOUNT) {
              valueInCents
            }
            createdAt
            createdByAccount {
              slug
              emails
              transactions(limit: 100, type: CREDIT, kind: EXPENSE) {
                limit
                offset
                totalCount
                nodes {
                  type
                  amountInHostCurrency {
                    valueInCents
                  }
                }
              }
            }
            currency
            description
            id
            legacyId
            payee {
              slug
              emails
              type
            }
            payoutMethod {
              id
              type
              name
            }
            status
            tags
            type
            virtualCard {
              id
              name
              assignee {
                slug
              }
              account {
                slug
              }
            }
          }
        }
      }      
      `;

      let offset = 0;
      if (context.sync.continuation) {
        offset = context.sync.continuation.offset as number;
      }

      // Only include dateFrom and status in the variables if they're not undefined or blank.
      type VariablesType = {
        host: { slug: string };
        limit: number;
        offset: number;
        dateFrom?: string;
        status?: string;
      };

      const host = { slug: slug };

      const variables: VariablesType = { host, limit, offset };

      let dateFrom;
      if (days) {
        const today = new Date();
        const daysAgo = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
        dateFrom = `${daysAgo.toISOString().split('.')[0]}Z`;
      }

      if (dateFrom) {
        variables.dateFrom = dateFrom;
      }
      if (status) {
        variables.status = status;
      }

      const response = await context.fetcher.fetch({
        method: 'POST',
        url: 'https://api.opencollective.com/graphql/v2',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const res = await response.body.data.expenses;
      const rows = [];
      const total = res.totalCount as number;
      const new_offset = res.offset as number;

      let continuation;
      if (limit + new_offset < total) {
        continuation = {
          offset: new_offset + limit,
        };
      }

      // const percentile = require("percentile");

      type Percentiles = {
        sourceData: string;
        p10th: number;
        p25th: number;
        p50th: number;
        p75th: number;
        p90th: number;
      };

      function calculatePercentiles(data: number[], source: string): Percentiles {
        // If the array is smaller than 10 elements, return 0 for all percentiles.
        if (!data || data.length < 10) {
          return {
            sourceData: source,
            p10th: 0,
            p25th: 0,
            p50th: 0,
            p75th: 0,
            p90th: 0,
          };
        }

        // Calculate the percentiles using the percentile library.
        const percentiles = percentile([10, 25, 50, 75, 90], data);

        // Return the calculated percentiles.
        return {
          sourceData: source,
          p10th: percentiles[0],
          p25th: percentiles[1],
          p50th: percentiles[2],
          p75th: percentiles[3],
          p90th: percentiles[4],
        };
      }

      function findPercentileRange(num: number, percentiles: Percentiles): string {
        if (!percentiles) {
          return 'No data';
        }
        // If all percentiles are 0, return 'No data'.
        if (
          percentiles['p10th'] === 0 &&
          percentiles['p25th'] === 0 &&
          percentiles['p50th'] === 0 &&
          percentiles['p75th'] === 0 &&
          percentiles['p90th'] === 0
        ) {
          return 'No data';
        }
        if (num < percentiles['p25th']) {
          return '25%';
        } else if (num < percentiles['p50th']) {
          return '50%';
        } else if (num < percentiles['p75th']) {
          return '75%';
        } else if (num < percentiles['p90th']) {
          return '90%';
        } else {
          return '90%+';
        }
      }

      function getAllTransactionAmounts(account) {
        if (!account.transactions) {
          return null;
        }
        const transactions = account.transactions.nodes;
        if (!transactions) {
          return null;
        }
        const amounts = transactions.map(transaction => Math.abs(transaction.amountInHostCurrency.valueInCents));
        return amounts;
      }

      function calculateAccountTransactionPercentiles(account, source) {
        const amounts = getAllTransactionAmounts(account);
        const percentiles = calculatePercentiles(amounts, source);
        return percentiles;
      }

      function calculateDaysBetweenCreatedAndPaid(activities) {
        if (!activities) {
          return null;
        }
        const created = activities.find(activity => activity.type === 'COLLECTIVE_EXPENSE_CREATED');
        const paid = activities.find(activity => activity.type === 'COLLECTIVE_EXPENSE_PAID');
        if (created && paid) {
          const createdTime = new Date(created.createdAt).getTime();
          const paidTime = new Date(paid.createdAt).getTime();
          const timeDiff = paidTime - createdTime;
          const daysDiff = timeDiff / (1000 * 3600 * 24);
          return daysDiff;
        }
        return null;
      }

      function calculateDaysBetweenApprovedAndPaid(activities) {
        if (!activities) {
          return null;
        }

        // Sort activities by createdAt in ascending order
        activities.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        // Find the first activity with type "COLLECTIVE_EXPENSE_APPROVED"
        const approved = activities.find(activity => activity.type === 'COLLECTIVE_EXPENSE_APPROVED');

        // Find the activity with type "COLLECTIVE_EXPENSE_PAID"
        const paid = activities.find(activity => activity.type === 'COLLECTIVE_EXPENSE_PAID');

        if (approved && paid) {
          const approvedTime = new Date(approved.createdAt).getTime();
          const paidTime = new Date(paid.createdAt).getTime();
          const timeDiff = paidTime - approvedTime;
          const daysDiff = timeDiff / (1000 * 3600 * 24);
          return daysDiff;
        }
        return null;
      }

      function checkApprovalBeforeRejection(activities) {
        if (!activities) {
          return false;
        }
        const approved = activities.find(activity => activity.type === 'COLLECTIVE_EXPENSE_APPROVED');
        const rejected = activities.find(activity =>
          [
            'COLLECTIVE_EXPENSE_REJECTED',
            'COLLECTIVE_EXPENSE_UNAPPROVED',
            'COLLECTIVE_EXPENSE_MARKED_AS_SPAM',
            'COLLECTIVE_EXPENSE_MARKED_AS_INCOMPLETE',
            'COLLECTIVE_EXPENSE_MISSING_RECEIPT',
          ].includes(activity.type),
        );
        if (approved && rejected) {
          const approvedTime = new Date(approved.createdAt).getTime();
          const rejectedTime = new Date(rejected.createdAt).getTime();
          return approvedTime < rejectedTime;
        }
        return false;
      }

      res.nodes.forEach(expense => {
        const row = {
          accountSlug: expense.account.slug,
          accountName: expense.account.name,
          accountParentSlug: expense.account.parent ? expense.account.parent.slug : null,
          accountParentName: expense.account.parent ? expense.account.parent.name : null,
          accountHostSlug: expense.account.host ? expense.account.host.slug : null,
          amountValueInCents: expense.amountV2.valueInCents,
          amountCurrency: expense.amountV2.currency,
          accountPercentileRange: findPercentileRange(
            expense.amountV2.valueInCents,
            calculateAccountTransactionPercentiles(expense.account, expense.account.slug),
          ),
          comments: expense.comments ? expense.comments.nodes : null,
          createdAt: expense.createdAt,
          createdByAccountSlug: expense.createdByAccount.slug,
          createdByAccountEmail: expense.createdByAccount.emails ? expense.createdByAccount.emails[0] : null,
          description: expense.description,
          id: expense.id,
          legacyId: expense.legacyId,
          payeeSlug: expense.payee.slug,
          payeeEmails: expense.payee.emails ? expense.payee.emails[0] : null,
          payeeType: expense.payee.type,
          payeePercentileRange: findPercentileRange(
            expense.amountV2.valueInCents,
            calculateAccountTransactionPercentiles(expense.payee, expense.payee.slug),
          ),
          payoutMethodName: expense.payoutMethod ? expense.payoutMethod.name : null,
          payoutMethodType: expense.payoutMethod ? expense.payoutMethod.type : null,
          status: expense.status,
          tags: expense.tags,
          virtualCardId: expense.virtualCard ? expense.virtualCard.id : null,
          virtualCardName: expense.virtualCard ? expense.virtualCard.name : null,
          virtualCardAssigneeSlug: expense.virtualCard ? expense.virtualCard.assignee.slug : null,
          virtualCardAccountSlug: expense.virtualCard ? expense.virtualCard.account.slug : null,
          daysBetweenCreatedAndPaid: calculateDaysBetweenCreatedAndPaid(expense.activities),
          daysBetweenApprovedAndPaid: calculateDaysBetweenApprovedAndPaid(expense.activities),
          approvedBeforeRejection: checkApprovalBeforeRejection(expense.activities),
          last100ExpensesValuesInCentsToCollective: getAllTransactionAmounts(expense.account),
          last100ExpensesValuesInCentsToPayee: getAllTransactionAmounts(expense.payee),
          collectiveExpensePercentileRanges: calculateAccountTransactionPercentiles(
            expense.account,
            expense.account.slug,
          ),
          payeeExpensePercentileRanges: calculateAccountTransactionPercentiles(expense.payee, expense.payee.slug),
        };
        rows.push(row);
      });

      return {
        result: rows,
        continuation: continuation,
      };
    },
  },
});

// Orders to host
pack.addSyncTable({
  name: 'OrdersToHost',
  description: 'Lists all orders to host.',
  identityName: 'OrderToHost',
  schema: OrderSchema,
  formula: {
    name: 'SyncOrdersToHost',
    description: 'Syncs orders to host.',
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: 'slug',
        description: 'The slug of the host you want to retrieve orders to host from.',
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: 'limit',
        description: 'The number of orders you want to retrieve per request.',
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: 'months',
        description: 'The number of months you want to retrieve orders from.',
      }),
    ],
    execute: async function (args, context) {
      const [slug, limit, months] = args;

      const query = `
      query SearchOrders(
        $host: [AccountReferenceInput]
        $dateFrom: DateTime
        $limit: Int
        $offset: Int
      ) {
        accounts(host: $host, limit: $limit, offset: $offset) {
          limit
          offset
          totalCount
          nodes
          {
            slug
            orders(dateFrom: $dateFrom, limit: 1000)
            {
              nodes
               {
                 id
                 legacyId
                 amount {
                   currency
                   valueInCents
                 }
                 totalAmount {
                   currency
                   valueInCents
                 } 
                 createdAt
                 updatedAt
                 createdByAccount {
                   slug
                   emails
                 }
                 memo
                 paymentMethod {
                   name
                 }
                 pendingContributionData {
                   expectedAt
                   paymentMethod
                   ponumber
                   memo
                   fromAccountInfo {
                     name
                     email
                   }
                 }
                 needsConfirmation
                 status
                 toAccount {
                   slug
                   ... on AccountWithParent {
                     parent {
                       slug
                     }
                   }
                 }
                 processedAt
                 description
                 data
               }
            } 
          }
        }
      }
      `;

      const host = { slug: slug };
      const today = new Date();
      const monthAgo = new Date(today.setMonth(today.getMonth() - months));
      const dateFrom = `${monthAgo.toISOString().split('.')[0]}Z`;

      let offset = 0;
      if (context.sync.continuation) {
        offset = context.sync.continuation.offset as number;
      }

      const variables = { host, dateFrom, limit, offset };

      const response = await context.fetcher.fetch({
        method: 'POST',
        url: 'https://api.opencollective.com/graphql/v2',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const res = await response.body.data.accounts;
      const rows = [];
      const total = res.totalCount as number;
      const new_offset = res.offset as number;

      let continuation;
      if (limit + new_offset < total) {
        continuation = {
          offset: new_offset + limit,
        };
      }

      res.nodes.forEach(account => {
        account.orders.nodes.forEach(order => {
          const row = {
            id: order.id,
            legacyId: order.legacyId,
            amountValueInCents: order.amount.valueInCents,
            amountCurrency: order.amount.currency,
            totalAmountValueInCents: order.totalAmount.valueInCents,
            totalAmountCurrency: order.totalAmount.currency,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            createdByAccountSlug: order.createdByAccount.slug,
            createdByAccountEmail: order.createdByAccount.emails ? order.createdByAccount.emails[0] : null,
            memo: order.memo,
            paymentMethodName: order.paymentMethod ? order.paymentMethod.name : null,
            pendingContributionExpectedAt: order.pendingContributionData
              ? order.pendingContributionData.expectedAt
              : null,
            status: order.status,
            toAccountSlug: order.toAccount.slug,
            toAccountParentSlug: order.toAccount.parent ? order.toAccount.parent.slug : null,
            processedAt: order.processedAt,
            description: order.description,
            data: order.data ? JSON.stringify(order.data) : null,
          };
          rows.push(row);
        });
      });

      return {
        result: rows,
        continuation: continuation,
      };
    },
  },
});

// HostedCollectives and stats
pack.addSyncTable({
  name: 'HostedCollectives',
  description: 'Lists all collectives.',
  identityName: 'HostedCollective',
  schema: CollectiveSchema,
  formula: {
    name: 'SyncHostedCollectives',
    description: 'Syncs collectives.',

    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: 'slug',
        description: 'The slug of the host you want to retrieve collectives from.',
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: 'limit',
        description: 'The number of collectives you want to retrieve per request.',
      }),
    ],

    execute: async function (args, context) {
      const [slug, limit] = args;

      const dateOneMonthAgo = new Date();
      dateOneMonthAgo.setMonth(dateOneMonthAgo.getMonth() - 1);
      const oneMonthAgo = dateOneMonthAgo.toISOString().replace(/\.\d+Z$/, 'Z');

      const dateThreeMonthsAgo = new Date();
      dateThreeMonthsAgo.setMonth(dateThreeMonthsAgo.getMonth() - 3);
      const threeMonthsAgo = dateThreeMonthsAgo.toISOString().replace(/\.\d+Z$/, 'Z');

      const dateSixMonthsAgo = new Date();
      dateSixMonthsAgo.setMonth(dateSixMonthsAgo.getMonth() - 6);
      const sixMonthsAgo = dateSixMonthsAgo.toISOString().replace(/\.\d+Z$/, 'Z');
    
      const dateNineMonthsAgo = new Date();
      dateNineMonthsAgo.setMonth(dateNineMonthsAgo.getMonth() - 9);
      const nineMonthsAgo = dateNineMonthsAgo.toISOString().replace(/\.\d+Z$/, 'Z');

      const dateTwelveMonthsAgo = new Date();
      dateTwelveMonthsAgo.setMonth(dateTwelveMonthsAgo.getMonth() - 12);
      const twelveMonthsAgo = dateTwelveMonthsAgo.toISOString().replace(/\.\d+Z$/, 'Z');

      const query = `
      query SearchAccounts(
        $host: [AccountReferenceInput]
        $limit: Int
        $offset: Int
      ) {
        accounts(type: [COLLECTIVE, FUND], limit: $limit, offset: $offset, host: $host) {
          totalCount
          offset
          limit
          nodes {
            name
            socialLinks {
              type
              url
            }
            slug
            currency
            description
            isFrozen
            imageUrl
            tags
            childrenAccounts {
              totalCount
              nodes {
                slug
                updates(limit: 1) {
                  limit
                  totalCount
                  nodes {
                    createdAt
                    title
                    slug
                  }
                }
              }
            }
            createdAt
            ... on AccountWithHost {
              approvedAt
              hostFeePercent
              isActive
              isApproved
            }
            location {
              name 
              address
              country
            } 
            ADMIN_ACTIVITY: transactions(hasExpense: true, includeChildrenTransactions: true, limit: 100) {
              limit
              totalCount
              nodes {
                expense {
                  activities {
                    individual {
                      slug
                    }
                    type
                  }
                }
              }
            }
            LAST_EXPENSE: transactions(hasExpense: true, includeChildrenTransactions: true, limit: 1) {
              limit
              totalCount
              nodes {
                createdAt
                description
                expense {
                  legacyId
                  amountV2 {
                    valueInCents
                    currency
                  }
                }
              }
            }
            LAST_CONTRIBUTION: transactions(includeChildrenTransactions: true, hasOrder: true, limit: 1) {
              limit
              totalCount
              nodes {
                createdAt
                description
                amount {
                  valueInCents
                  currency
                }
              }
            }
            LAST_UPDATE: updates(limit: 1) {
              limit
              totalCount
              nodes {
                createdAt
                title
                slug
              }
            }
            ... on AccountWithHost {
              host {
                id
                slug
                name
              }
            ... on AccountWithParent {
              parent {
                id
                slug
                name
              }
            }
            approvedAt
            hostFeesStructure
            hostFeePercent
            }
            ADMINS: members(role: ADMIN) {
              nodes {
                role
                account {
                  name
                  slug
                  emails
                }
              }
            }
            JUSTWORKS: transactions(limit: 1000, includeChildrenTransactions: true, hasExpense: true, searchTerm: "Employment costs") {
              totalCount
              nodes {
                description
                createdAt
                amount {
                  valueInCents
                  currency
                }
              }
            }
            ALL: stats {
              expensesTags(includeChildren: true) {
                amount {
                  valueInCents
                  currency
                }
                count
                label
              }
              expensesTagsTimeSeries(includeChildren: true, timeUnit: YEAR) {
                nodes {
                  amount {
                    valueInCents
                    currency
                  }
                  date
                  label
                }
              }
              balance {
                  valueInCents
                  currency
              }
              totalAmountSpent(net: true, includeChildren: true) {
                valueInCents
                currency
              }
              totalAmountReceived(net: true, includeChildren: true) {
                valueInCents
                currency
              }
              contributionsCount(includeChildren: true)
              contributorsCount(includeChildren: true)
            }
            PAST_12_MONTHS: stats {
              totalAmountSpent(
                net: true
                includeChildren: true
                dateFrom: "${twelveMonthsAgo}"
              ) {
                valueInCents
                currency
              }
              totalAmountReceived(
                net: true
                dateFrom: "${twelveMonthsAgo}"
                includeChildren: true
              ) {
                valueInCents
                currency
              }
              contributionsCount(includeChildren: true, dateFrom: "${twelveMonthsAgo}")
              contributorsCount(includeChildren: true, dateFrom: "${twelveMonthsAgo}")
            }
            PAST_9_MONTHS: stats {
              totalAmountSpent(
                net: true
                includeChildren: true
                dateFrom: "${nineMonthsAgo}"
              ) {
                valueInCents
                currency
              }
              totalAmountReceived(
                net: true
                dateFrom: "${nineMonthsAgo}"
                includeChildren: true
              ) {
                valueInCents
                currency
              }
              contributionsCount(includeChildren: true, dateFrom: "${nineMonthsAgo}")
              contributorsCount(includeChildren: true, dateFrom: "${nineMonthsAgo}")
            }
            PAST_6_MONTHS: stats {
              totalAmountSpent(
                net: true
                includeChildren: true
                dateFrom: "${sixMonthsAgo}"
              ) {
                valueInCents
                currency
              }
              totalAmountReceived(
                net: true
                dateFrom: "${sixMonthsAgo}"
                includeChildren: true
              ) {
                valueInCents
                currency
              }
              contributionsCount(includeChildren: true, dateFrom: "${sixMonthsAgo}")
              contributorsCount(includeChildren: true, dateFrom: "${sixMonthsAgo}")
            }
            PAST_3_MONTHS: stats {
              totalAmountSpent(
                net: true
                includeChildren: true
                dateFrom: "${threeMonthsAgo}"
              ) {
                valueInCents
                currency
              }
              totalAmountReceived(
                net: true
                dateFrom: "${threeMonthsAgo}"
                includeChildren: true
              ) {
                valueInCents
                currency
              }
              contributionsCount(includeChildren: true, dateFrom: "${threeMonthsAgo}")
              contributorsCount(includeChildren: true, dateFrom: "${threeMonthsAgo}")
            }
            PAST_MONTH: stats {
              totalAmountSpent(
                net: true
                includeChildren: true
                dateFrom: "${oneMonthAgo}"
              ) {
                valueInCents
                currency
              }
              totalAmountReceived(
                net: true
                dateFrom: "${oneMonthAgo}"
                includeChildren: true
              ) {
                valueInCents
                currency
              }
              contributionsCount(includeChildren: true, dateFrom: "${oneMonthAgo}")
              contributorsCount(includeChildren: true, dateFrom: "${oneMonthAgo}")
            }
          }
        }
      }
      `;

      const host = { slug: slug };
      let offset = 0;
      if (context.sync.continuation) {
        offset = context.sync.continuation.offset as number;
      }

      const variables = { host, limit, offset };

      const response = await context.fetcher.fetch({
        method: 'POST',
        url: 'https://api.opencollective.com/graphql/v2',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const res = await response.body.data.accounts;
      let rows = res.nodes;
      const total = res.totalCount as number;
      const new_offset = res.offset as number;

      let continuation;
      if (limit + new_offset < total) {
        continuation = {
          offset: new_offset + limit,
        };
      }

      function getLatestUpdateDate(data) {
        // Get latest date from LAST_UPDATE
        let lastUpdateDate = data.LAST_UPDATE?.totalCount > 0 ? new Date(data.LAST_UPDATE.nodes[0]?.createdAt) : null;

        // Get latest date from childrenAccounts
        let childrenUpdates =
          data.childrenAccounts?.nodes
            ?.filter(child => child.updates?.totalCount > 0)
            ?.map(child => new Date(child.updates.nodes[0]?.createdAt)) ?? [];
        let latestChildUpdateDate = childrenUpdates.length > 0 ? new Date(Math.max.apply(null, childrenUpdates)) : null;

        // Compare both dates and return the latest one
        let latestDate;
        if (!lastUpdateDate || !latestChildUpdateDate) {
          latestDate = lastUpdateDate || latestChildUpdateDate;
        } else {
          latestDate = lastUpdateDate > latestChildUpdateDate ? lastUpdateDate : latestChildUpdateDate;
        }

        // Return the date as a string
        return latestDate ? latestDate.toISOString() : null;
      }

      function getCountOfExpenseTag(expensesTags, tagName) {
        for (let i = 0; i < expensesTags.length; i++) {
          if (expensesTags[i].label === tagName) {
            return expensesTags[i].count;
          }
        }
        return 0;
      }

      function countAdminActivities(data, adminSlug) {
        // Initialize count to 0
        let count = 0;

        // If data.ADMIN_ACTIVITY.totalCount is 0, return 0
        if (data.ADMIN_ACTIVITY.totalCount === 0) {
          return count;
        }

        data.ADMIN_ACTIVITY.nodes.forEach(adminActivity => {
          // Loop through each individual activity within the admin activity
          adminActivity.expense?.activities.forEach(activity => {
            // Check if the individual's slug matches the given adminSlug
            // and the activity type is either APPROVED or REJECTED
            if (
              activity.individual?.slug === adminSlug &&
              (activity.type === 'COLLECTIVE_EXPENSE_APPROVED' || activity.type === 'COLLECTIVE_EXPENSE_REJECTED')
            ) {
              // Increment the count
              count++;
            }
          });
        });

        // Return the final count
        return count;
      }

      rows = rows.map(row => {
        return {
          ...row,
          admins: row.ADMINS.nodes.map(node => {
            return {
              role: node.role,
              name: node.account.name,
              slug: node.account.slug,
              email: node.account.emails ? node.account.emails[0] : null,
              approvalCount: countAdminActivities(row, node.account.slug),
            };
          }),
          socialLinks: row.socialLinks
            ? row.socialLinks.map(link => {
                return {
                  type: link.type,
                  url: link.url,
                };
              })
            : [],
          balanceValueInCents: row.ALL.balance.valueInCents,
          balanceCurrency: row.ALL.balance.currency,
          locationName: row.location ? row.location.name : null,
          locationCountry: row.location ? row.location.country : null,
          locationAddress: row.location ? row.location.address : null,
          isActive: row.isActive,
          isApproved: row.isApproved,
          lastUpdateDate: getLatestUpdateDate(row),
          lastUpdateSlug: row.LAST_UPDATE?.totalCount > 0 ? row.LAST_UPDATE.nodes[0]?.slug : null,
          lastExpenseDate: row?.LAST_EXPENSE?.totalCount > 0 ? row.LAST_EXPENSE.nodes[0]?.createdAt : null,
          expenseCount: row.LAST_EXPENSE.totalCount,
          lastContributionDate:
            row?.LAST_CONTRIBUTION?.totalCount > 0 ? row.LAST_CONTRIBUTION.nodes[0]?.createdAt : null,
          employmentJustWorksCount: row?.JUSTWORKS ? row.JUSTWORKS.totalCount : null,
          employmentJustWorksExpenses: row.JUSTWORKS ? row.JUSTWORKS.nodes : null,
          cashAssistanceCount: getCountOfExpenseTag(row.ALL.expensesTags, 'cash assistance'),
          contributorsCount: row.ALL.contributorsCount,
          contributionsCount: row.ALL.contributionsCount,
          totalAmountSpentValueInCents: row.ALL.totalAmountSpent.valueInCents,
          totalAmountReceivedValueInCents: row.ALL.totalAmountReceived.valueInCents,
          totalAmountSpentValueInCentsPast12Months: row.PAST_12_MONTHS.totalAmountSpent.valueInCents,
          totalAmountReceivedValueInCentsPast12Months: row.PAST_12_MONTHS.totalAmountReceived.valueInCents,
          contributorsCountPast12Months: row.PAST_12_MONTHS.contributorsCount,
          contributionsCountPast12Months: row.PAST_12_MONTHS.contributionsCount,
          totalAmountSpentValueInCentsPast9Months: row.PAST_9_MONTHS.totalAmountSpent.valueInCents,
          totalAmountReceivedValueInCentsPast9Months: row.PAST_9_MONTHS.totalAmountReceived.valueInCents,
          contributorsCountPast9Months: row.PAST_9_MONTHS.contributorsCount,
          contributionsCountPast9Months: row.PAST_9_MONTHS.contributionsCount,
          totalAmountSpentValueInCentsPast6Months: row.PAST_6_MONTHS.totalAmountSpent.valueInCents,
          totalAmountReceivedValueInCentsPast6Months: row.PAST_6_MONTHS.totalAmountReceived.valueInCents,
          contributorsCountPast6Months: row.PAST_6_MONTHS.contributorsCount,
          contributionsCountPast6Months: row.PAST_6_MONTHS.contributionsCount,
          totalAmountSpentValueInCentsPast3Months: row.PAST_3_MONTHS.totalAmountSpent.valueInCents,
          totalAmountReceivedValueInCentsPast3Months: row.PAST_3_MONTHS.totalAmountReceived.valueInCents,
          contributorsCountPast3Months: row.PAST_3_MONTHS.contributorsCount,
          contributionsCountPast3Months: row.PAST_3_MONTHS.contributionsCount,
          totalAmountSpentValueInCentsPastMonth: row.PAST_MONTH.totalAmountSpent.valueInCents,
          totalAmountReceivedValueInCentsPastMonth: row.PAST_MONTH.totalAmountReceived.valueInCents,
          contributorsCountPastMonth: row.PAST_MONTH.contributorsCount,
          contributionsCountPastMonth: row.PAST_MONTH.contributionsCount,
        };
      });

      return {
        result: rows,
        continuation: continuation,
      };
    },
  },
});

// Updates of collectives on the host
pack.addSyncTable({
  name: 'UpdatesFromHostedCollectives',
  description: 'Lists all updates of collectives on the host.',
  identityName: 'UpdateFromHostedCollective',
  schema: UpdateSchema,
  formula: {
    name: 'SyncUpdatesFromHostedCollectives',
    description: 'Syncs updates of collectives on the host.',
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: 'host',
        description: 'The slug of the host you want to retrieve updates from.',
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: 'limit',
        description: 'The number of updates you want to retrieve per request.',
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: 'days',
        description: 'The number of days you want to retrieve updates from.',
      }),
    ],
    execute: async function (args, context) {
      const updates_query = `
      query Updates($host: [AccountReferenceInput], $limit: Int, $offset: Int) {
        updates(host: $host, limit: $limit, offset: $offset) {
          totalCount
          offset
          nodes {
            id
            title
            createdAt
            slug
            summary
            html
            account {
              slug
              imageUrl
              name
              socialLinks {
                type
                url
              }
            }
            fromAccount {
              id
              name
              imageUrl
              socialLinks {
                type
                url
              }
            }
          }
        }
      }
      `;

      // Utility function to extract images from HTML content
      function extractImagesFromHTML(html) {
        const regex = /<img[^>]+src="?([^"\s]+)"?\s*\/?>/g;
        let match;
        const images = [];
        while ((match = regex.exec(html)) !== null) {
          images.push(match[1]);
        }
        return images;
      }

      const [host, limit, days] = args;

      let offset = 0;
      if (context.sync.continuation) {
        offset = context.sync.continuation.offset as number;
      }

      const variables = { host: { slug: host }, limit, offset };

      const response = await context.fetcher.fetch({
        method: 'POST',
        url: 'https://api.opencollective.com/graphql/v2',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: updates_query, variables }),
      });

      const res = await response.body.data.updates;
      const rows = [];
      let new_offset = res.offset as number;

      const dateFrom = new Date();
      dateFrom.setDate(dateFrom.getDate() - days);

      let done = false;
      for (const update of res.nodes) {
        if (new Date(update.createdAt) < dateFrom) {
          done = true;
          break;
        }

        const row = {
          id: update.id,
          title: update.title,
          createdAt: update.createdAt,
          slug: update.slug,
          summary: update.summary,
          html: update.html,
          accountSlug: update.account.slug,
          accountImageUrl: update.account.imageUrl,
          accountName: update.account.name,
          fromAccountId: update.fromAccount.id,
          fromAccountName: update.fromAccount.name,
          fromAccountImageUrl: update.fromAccount.imageUrl,
          images: extractImagesFromHTML(update.html),
          accountSocialLinks: update.account.socialLinks.map(link => {
            return {
              type: link.type,
              url: link.url,
            };
          }),
          fromAccountSocialLinks: update.fromAccount.socialLinks.map(link => {
            return {
              type: link.type,
              url: link.url,
            };
          }),
        };
        rows.push(row);
        new_offset++;
      }

      let continuation;
      if (!done) {
        continuation = {
          offset: new_offset,
        };
      }

      return {
        result: rows,
        continuation: continuation,
      };
    },
  },
});
