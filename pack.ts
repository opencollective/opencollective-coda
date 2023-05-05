import * as coda from "@codahq/packs-sdk";
export const pack = coda.newPack();

// This code is in alpha and is meant for internal use in Open Collective at the moment.

pack.addNetworkDomain("api.opencollective.com");

pack.setUserAuthentication({
  type: coda.AuthenticationType.OAuth2,
  authorizationUrl: "https://opencollective.com/oauth/authorize",
  tokenUrl: "https://opencollective.com/oauth/token"
});

const MemberSchema = coda.makeObjectSchema({
  properties: {
    slug: {
      type: coda.ValueType.String,
      description: "The slug of the member.",
    },
    role: {
      type: coda.ValueType.String,
      description: "The role of the member.",
    },
    name : {
      type: coda.ValueType.String,
      description: "The name of the member.",
    },
    email: {
      type: coda.ValueType.String,
      description: "The email of the member.",
    },
  },
  displayProperty: "name",
  idProperty: "slug",
});

const CollectiveSchema = coda.makeObjectSchema({
  properties: {
    collectiveId: {
      type: coda.ValueType.String,
      description: "The ID of the collective.",
    },
    createdAt: {
      type: coda.ValueType.String,
      description: "The date the collective was created.",
    },
    approvedAt: {
      type: coda.ValueType.String,
      description: "The date the collective was approved.",
    },
    admins: {
      type: coda.ValueType.Array,
      items: MemberSchema,
      description: "The admins of the collective.",
    },
    name: {
      type: coda.ValueType.String,
      description: "The name of the collective.",
    },
    slug: {
      type: coda.ValueType.String,
      description: "The slug of the collective.",
    },
    description: {
      type: coda.ValueType.String,
      description: "The description of the collective.",
    },
    type: {
      type: coda.ValueType.String,
      description: "The type of the collective.",
    },
    currency: {
      type: coda.ValueType.String,
      description: "The currency of the collective.",
    },
    isFrozen: {
      type: coda.ValueType.Boolean,
      description: "Whether the collective is frozen.",
    },
    tags: {
      type: coda.ValueType.Array,
      items: {
        type: coda.ValueType.String,
      },
      description: "The tags of the collective.",
    },
    balanceValueInCents: {
      type: coda.ValueType.Number,
      description: "The balance of the collective in cents.",
    },
    balanceCurrency: {
      type: coda.ValueType.String,
      description: "The currency of the collective balance.",
    },
    totalAmountSpentValueInCents: {
      type: coda.ValueType.Number,
      description: "The total amount spent of the collective in cents.",
    },
    totalAmountReceivedValueInCents: {
      type: coda.ValueType.Number,
      description: "The total amount received of the collective in cents.",
    },
    totalAmountSpentValueInCentsPast12Months: {
      type: coda.ValueType.Number,
      description:
        "The total amount spent of the collective in cents in the past 12 months.",
    },
    totalAmountReceivedValueInCentsPast12Months: {
      type: coda.ValueType.Number,
      description:
        "The total amount received of the collective in cents in the past 12 months.",
    },
    totalAmountSpentValueInCentsPast9Months: {
      type: coda.ValueType.Number,
      description:
        "The total amount spent of the collective in cents in the past 9 months.",
    },
    totalAmountReceivedValueInCentsPast9Months: {
      type: coda.ValueType.Number,
      description:
        "The total amount received of the collective in cents in the past 9 months.",
    },
    totalAmountSpentValueInCentsPast6Months: {
      type: coda.ValueType.Number,
      description:
        "The total amount spent of the collective in cents in the past 6 months.",
    },
    totalAmountReceivedValueInCentsPast6Months: {
      type: coda.ValueType.Number,
      description:
        "The total amount received of the collective in cents in the past 6 months.",
    },
    totalAmountSpentValueInCentsPast3Months: {
      type: coda.ValueType.Number,
      description:
        "The total amount spent of the collective in cents in the past 3 months.",
    },
    totalAmountReceivedValueInCentsPast3Months: {
      type: coda.ValueType.Number,
      description:
        "The total amount received of the collective in cents in the past 3 months.",
    },
    totalAmountSpentValueInCentsPast1Month: {
      type: coda.ValueType.Number,
      description:
        "The total amount spent of the collective in cents in the past 1 month.",
    },
    totalAmountReceivedValueInCentsPast1Month: {
      type: coda.ValueType.Number,
      description:
        "The total amount received of the collective in cents in the past 1 month.",
    },
    hostFeesStructure: {
      type: coda.ValueType.String,
      description: "The host fees structure of the collective.",
    },
    hostFeePercent: {
      type: coda.ValueType.Number,
      description: "The host fee percent of the collective.",
    },
    totalFinancialContributors: {
      type: coda.ValueType.Number,
      description: "The total financial contributors of the collective.",
    }
  },
  displayProperty: "name",
  idProperty: "slug",
});

const OrderSchema = coda.makeObjectSchema({
  properties: {
    id: {
      type: coda.ValueType.Number,
      description: "The ID of the order.",
    },
    legacyId: {
      type: coda.ValueType.Number,
      description: "The legacy ID of the order.",
    },
    amountValueInCents: {
      type: coda.ValueType.Number,
      description: "The amount of the order in cents.",
    },
    amountCurrency: {
      type: coda.ValueType.String,
      description: "The currency of the order amount.",
    },
    totalAmountValueInCents: {
      type: coda.ValueType.Number,
      description: "The total amount of the order in cents.",
    },
    totalAmountCurrency: {
      type: coda.ValueType.String,
      description: "The currency of the order total amount.",
    },
    createdAt: {
      type: coda.ValueType.String,
      description: "The date the order was created.",
    },
    updatedAt: {
      type: coda.ValueType.String,
      description: "The date the order was updated.",
    },
    createdByAccountSlug: {
      type: coda.ValueType.String,
      description: "The slug of the account that created the order.",
    },
    createdByAccountEmail: {
      type: coda.ValueType.String,
      description: "The email of the account that created the order.",
    },
    memo: {
      type: coda.ValueType.String,
      description: "The memo of the order.",
    },
    paymentMethodName: {
      type: coda.ValueType.String,
      description: "The payment method name of the order.",
    },
    pendingContributionExpectedAt: {
      type: coda.ValueType.String,
      description: "The date the pending contribution is expected.",
    },
    status: {
      type: coda.ValueType.String,
      description: "The status of the order.",
    },
    toAccountSlug: {
      type: coda.ValueType.String,
      description: "The slug of the account the order is going to.",
    },
    toAccountParentSlug: {
      type: coda.ValueType.String,
      description: "The slug of the parent account the order is going to.",
    },
    processedAt: {
      type: coda.ValueType.String,
      description: "The date the order was processed.",
    },
    description: {
      type: coda.ValueType.String,
      description: "The description of the order.",
    },
    data: {
      type: coda.ValueType.String,
      description: "The data of the order.",
    },
  },
  idProperty: "id",
  displayProperty: "description",
});

const ExpenseSchema = coda.makeObjectSchema({
  properties: {
    accountSlug: {
      type: coda.ValueType.String,
      description: "The slug of the account the expense belongs to.",
    },
    amountValueInCents: {
      type: coda.ValueType.Number,
      description: "The amount of the expense in cents.",
    },
    amountCurrency: {
      type: coda.ValueType.String,
      description: "The currency of the expense amount.",
    },
    amountSourceCurrency: {
      type: coda.ValueType.String,
      description: "The source currency of the expense amount.",
    },
    commentsCount: {
      type: coda.ValueType.Number,
      description: "The number of comments on the expense.",
    },
    createdAt: {
      type: coda.ValueType.String,
      description: "The date the expense was created.",
    },
    createdByAccountSlug: {
      type: coda.ValueType.String,
      description: "The slug of the account that created the expense.",
    },
    createdByAccountEmail: {
      type: coda.ValueType.String,
      description: "The email of the account that created the expense.",
    },
    description: {
      type: coda.ValueType.String,
      description: "The description of the expense.",
    },
    id: {
      type: coda.ValueType.String,
      description: "The ID of the expense.",
    },
    itemUrls: {
      type: coda.ValueType.Array,
      description: "The item URLs of the expense.",
      items: coda.makeSchema({
        type: coda.ValueType.String,
      })
    },
    legacyId: {
      type: coda.ValueType.Number,
      description: "The legacy ID of the expense.",
    },
    payeeSlug: {
      type: coda.ValueType.String,
      description: "The slug of the payee of the expense.",
    },
    payoutMethodName: {
      type: coda.ValueType.String,
      description: "The payout method name of the expense.",
    },
    payoutMethodType: {
      type: coda.ValueType.String,
      description: "The payout method type of the expense.",
    },
    status: {
      type: coda.ValueType.String,
      description: "The status of the expense.",
    },
    tags: {
      type: coda.ValueType.Array,
      description: "The tags of the expense.",
      items: coda.makeSchema({
        type: coda.ValueType.String,
      })
    },
    type: {
      type: coda.ValueType.String,
      description: "The type of the expense.",
    },
    virtualCardId: {
      type: coda.ValueType.String,
      description: "The virtual card ID of the expense.",
    },
    virtualCardAssigneeSlug: {
      type: coda.ValueType.String,
      description: "The slug of the assignee of the virtual card.",
    },
    virtualCardAccountSlug: {
      type: coda.ValueType.String,
      description: "The slug of the account the virtual card belongs to.",
    },
    daysBetweenCreatedAndPaid: {
      type: coda.ValueType.Number,
      description: "The number of days between the expense being created and paid.",
    },
    approvedBeforeRejection: {
      type: coda.ValueType.Boolean,
      description: "Whether the expense was approved before being rejected.",
    },
    securityChecks: {
      type: coda.ValueType.Array,
      description: "The security checks of the expense.",
      items: coda.makeSchema({
        type: coda.ValueType.String,
      })
    },
    missingReceipt: {
      type: coda.ValueType.Boolean,
      description: "Whether the expense is missing a receipt.",
    },
  },
  idProperty: "id",
  displayProperty: "description",
});

const SocialLinkSchema = coda.makeObjectSchema({
  description: "A social link.",
  properties: {
    type: {
      type: coda.ValueType.String,
      description: "The type of social link.",
    },
    url: {
      type: coda.ValueType.String,
      description: "The URL of the social link.",
    },
  },
  displayProperty: "type",
  idProperty: "url",
});

const UpdateSchema = coda.makeObjectSchema({
  properties: {
    id: {
      type: coda.ValueType.String,
      description: "The ID of the update.",
    },
    title: {
      type: coda.ValueType.String,
      description: "The title of the update.",
    },
    createdAt: {
      type: coda.ValueType.String,
      description: "The date the update was created.",
    },
    slug: {
      type: coda.ValueType.String,
      description: "The slug of the update.",
    },
    summary: {
      type: coda.ValueType.String,
      description: "The summary of the update.",
    },
    html: {
      type: coda.ValueType.String,
      description: "The HTML of the update.",
    },
    accountSlug: {
      type: coda.ValueType.String,
      description: "The slug of the account that created the update.",
    },
    accountImageUrl: {
      type: coda.ValueType.String,
      description: "The image URL of the account that created the update.",
    },
    accountName: {
      type: coda.ValueType.String,
      description: "The name of the account that created the update.",
    },
    fromAccountId: {
      type: coda.ValueType.String,
      description: "The ID of the account that created the update.",
    },
    fromAccountName: {
      type: coda.ValueType.String,
      description: "The name of the account that created the update.",
    },
    fromAccountImageUrl: {
      type: coda.ValueType.String,
      description: "The image URL of the account that created the update.",
    },
    images: {
      type: coda.ValueType.Array,
      description: "The images of the update.",
      items: coda.makeSchema({
        type: coda.ValueType.String,
        codaType: coda.ValueHintType.ImageAttachment,
      })
    },
    accountSocialLinks: {
      type: coda.ValueType.Array,
      description: "The social links of the collective.",
      items: SocialLinkSchema,
    },
    fromAccountSocialLinks: {
      type: coda.ValueType.Array,
      description: "The social links of the author.",
      items: SocialLinkSchema,
    },
  },
  idProperty: "id",
  displayProperty: "title",
});

// Expenses to host
pack.addSyncTable({
  name: "ExpensesToHost",
  description: "Lists all expenses to host.",
  identityName: "ExpenseToHost",
  schema: ExpenseSchema,
  formula: {
    name: "SyncExpensesToHost",
    description: "Syncs expenses to host.",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "slug",
        description:
          "The slug of the host you want to retrieve expenses to host from.",
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "limit",
        description:
          "The number of expenses you want to retrieve per request.",
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "months",
        description:
          "The number of months you want to retrieve expenses from.",
      }),
    ],
    execute: async function (args, context) {      
      let [slug, limit, months] = args;

      const query = `
      query searchExpenses(
        $host: AccountReferenceInput, 
        $dateFrom: DateTime,
        $limit: Int, 
        $offset: Int
        ) 
        {
        expenses(host: $host, dateFrom: $dateFrom, limit: $limit, offset: $offset) {
          limit
          offset
          totalCount
          nodes {
            account {
              slug
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
            amountV2 {
              value
              currency
              valueInCents
              exchangeRate {
                fromCurrency
              }
            }
            createdAt
            createdByAccount {
              slug
              emails
            }
            currency
            description
            comments {
              totalCount
            }
            id
            items {
              url
            }
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
            securityChecks {
              scope
              level
              message
              details
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
      `

      let host = { slug: slug };
      let today = new Date();
      let monthAgo = new Date(today.setMonth(today.getMonth() - months));
      let dateFrom = monthAgo.toISOString().split(".")[0] + "Z";


      let offset = 0;
      if (context.sync.continuation) {
        offset = context.sync.continuation.offset as number;
      }

      const variables = { host, dateFrom, limit, offset};

      let response = await context.fetcher.fetch({
        method: "POST",
        url: "https://api.opencollective.com/graphql/v2",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      let res = await response.body.data.expenses;
      let rows = []
      let total = res.totalCount as number
      let new_offset = res.offset as number;

      let continuation;
      if ((limit + new_offset) < total) {
        continuation = {
          offset: new_offset + limit,
        };
      }

      function calculateDaysBetweenCreatedAndPaid(activities) {
        if (!activities) return null;
        const created = activities.find((activity) => activity.type === "COLLECTIVE_EXPENSE_CREATED");
        const paid = activities.find((activity) => activity.type === "COLLECTIVE_EXPENSE_PAID");
        if (created && paid) {
          const createdTime = new Date(created.createdAt).getTime();
          const paidTime = new Date(paid.createdAt).getTime();
          const timeDiff = paidTime - createdTime;
          const daysDiff = timeDiff / (1000 * 3600 * 24); // 1000 ms/sec * 3600 sec/hour * 24 hours/day
          return daysDiff;
        }
        return null;
      }

      function checkApprovalBeforeRejection(activities) {
        if (!activities) return false;
        const approved = activities.find((activity) => activity.type === "COLLECTIVE_EXPENSE_APPROVED");
        const rejected = activities.find((activity) => ["COLLECTIVE_EXPENSE_REJECTED", "COLLECTIVE_EXPENSE_UNAPPROVED", "COLLECTIVE_EXPENSE_MARKED_AS_SPAM", "COLLECTIVE_EXPENSE_MARKED_AS_INCOMPLETE", "COLLECTIVE_EXPENSE_MISSING_RECEIPT"].includes(activity.type));
        if (approved && rejected) {
          const approvedTime = new Date(approved.createdAt).getTime();
          const rejectedTime = new Date(rejected.createdAt).getTime();
          return approvedTime < rejectedTime;
        }
        return false;
      }

      function formatSecurityChecks(securityChecks) {
        let formattedSecurityChecks = [];
        if (!securityChecks) return formattedSecurityChecks;
        securityChecks.forEach((securityCheck) => {
          let formattedSecurityCheck = `${securityCheck.level}: ${securityCheck.message}. ${securityCheck.details}`;
          formattedSecurityChecks.push(formattedSecurityCheck);
        });
        return formattedSecurityChecks;
      }

      function checkIfMissingReceipt(expense) {
        return expense.status == "PAID" && expense.type === "CHARGE" && expense.items.every((item) => !item.url);
      }

      res.nodes.forEach((expense) => {
          let row = {
            accountSlug: expense.account.slug,
            amountValueInCents: expense.amountV2.valueInCents,
            amountCurrency: expense.amountV2.currency,
            amountSourceCurrency: expense.amountV2.exchangeRate? expense.amountV2.exchangeRate.fromCurrency : null,
            commentsCount: expense.comments? expense.comments.totalCount : 0,
            createdAt: expense.createdAt,
            createdByAccountSlug: expense.createdByAccount.slug,
            createdByAccountEmail: expense.createdByAccount.emails? expense.createdByAccount.emails[0] : null,
            description: expense.description,
            id: expense.id,
            itemURLs: expense.items.map((item) => item.url),
            legacyId: expense.legacyId,
            payeeSlug: expense.payee.slug,
            payeeEmails: expense.payee.emails? expense.payee.emails[0] : null,
            payeeType: expense.payee.type,
            payoutMethodName: expense.payoutMethod? expense.payoutMethod.name : null,
            payoutMethodType: expense.payoutMethod? expense.payoutMethod.type : null,
            status: expense.status,
            tags: expense.tags,
            virtualCardId: expense.virtualCard? expense.virtualCard.id : null,
            virtualCardName: expense.virtualCard? expense.virtualCard.name : null,
            virtualCardAssigneeSlug: expense.virtualCard? expense.virtualCard.assignee.slug : null,
            virtualCardAccountSlug: expense.virtualCard? expense.virtualCard.account.slug : null,
            daysBetweenCreatedAndPaid: calculateDaysBetweenCreatedAndPaid(expense.activities),
            approvedBeforeRejection: checkApprovalBeforeRejection(expense.activities),
            securityChecks: formatSecurityChecks(expense.securityChecks),
            missingReceipt: checkIfMissingReceipt(expense),
          }
          rows.push(row);
      })
      
      return {
        result: rows,
        continuation: continuation,
      };
    },
  },
});

// Orders to host
pack.addSyncTable({
  name: "OrdersToHost",
  description: "Lists all orders to host.",
  identityName: "OrderToHost",
  schema: OrderSchema,
  formula: {
    name: "SyncOrdersToHost",
    description: "Syncs orders to host.",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "slug",
        description:
          "The slug of the host you want to retrieve orders to host from.",
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "limit",
        description:
          "The number of orders you want to retrieve per request.",
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "months",
        description:
          "The number of months you want to retrieve orders from.",
      }),
    ],
    execute: async function (args, context) {
      
      let [slug, limit, months] = args;

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

      let host = { slug: slug };
      let today = new Date();
      let monthAgo = new Date(today.setMonth(today.getMonth() - months));
      let dateFrom = monthAgo.toISOString().split(".")[0] + "Z";


      let offset = 0;
      if (context.sync.continuation) {
        offset = context.sync.continuation.offset as number;
      }

      const variables = { host, dateFrom, limit, offset};

      let response = await context.fetcher.fetch({
        method: "POST",
        url: "https://api.opencollective.com/graphql/v2",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      let res = await response.body.data.accounts;
      let rows = []
      let total = res.totalCount as number
      let new_offset = res.offset as number;

      let continuation;
      if ((limit + new_offset) < total) {
        continuation = {
          offset: new_offset + limit,
        };
      }

      res.nodes.forEach((account) => {
        account.orders.nodes.forEach((order) => {
          let row = {
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
            pendingContributionExpectedAt: order.pendingContributionData ? order.pendingContributionData.expectedAt : null,
            status: order.status,
            toAccountSlug: order.toAccount.slug,
            toAccountParentSlug: order.toAccount.parent ? order.toAccount.parent.slug : null,
            processedAt: order.processedAt,
            description: order.description,
            data: order.data ? JSON.stringify(order.data) : null,
          }
          rows.push(row);
        })
      })
      
      return {
        result: rows,
        continuation: continuation,
      };
      
    },
  },
});

// HostedCollectives and stats
pack.addSyncTable({
  name: "HostedCollectives",
  description: "Lists all collectives.",
  identityName: "HostedCollective",
  schema: CollectiveSchema,
  formula: {
    name: "SyncHostedCollectives",
    description: "Syncs collectives.",

    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "slug",
        description:
          "The slug of the host you want to retrieve collectives from.",
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "limit",
        description:
          "The number of collectives you want to retrieve per request.",
      })
    ],

    execute: async function (args, context) {

      let [slug, limit] = args;

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
            slug
            currency
            description
            isFrozen
            imageUrl
            tags
            createdAt
            location {
              country
            }
            ... on AccountWithHost {
              host {
                slug
                name
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
            ALL: stats {
              balance {
                  valueInCents
                  currency
              }
              totalAmountSpent(net: true, includeChildren: true) {
                valueInCents
              }
              totalAmountReceived(net: true, includeChildren: true) {
                valueInCents
              }
            }
            PAST_12_MONTHS: stats {
              totalAmountSpent(
                net: true
                includeChildren: true
                periodInMonths: 12
              ) {
                valueInCents
              }
              totalAmountReceived(
                net: true
                periodInMonths: 12
                includeChildren: true
              ) {
                valueInCents
              }
            }
            PAST_9_MONTHS: stats {
              totalAmountSpent(
                net: true
                includeChildren: true
                periodInMonths: 9
              ) {
                valueInCents
              }
              totalAmountReceived(
                net: true
                periodInMonths: 9
                includeChildren: true
              ) {
                valueInCents
              }
            }
            PAST_6_MONTHS: stats {
              totalAmountSpent(
                net: true
                includeChildren: true
                periodInMonths: 6
              ) {
                valueInCents
              }
              totalAmountReceived(
                net: true
                periodInMonths: 6
                includeChildren: true
              ) {
                valueInCents
              }
            }
            PAST_3_MONTHS: stats {
              totalAmountSpent(
                net: true
                includeChildren: true
                periodInMonths: 3
              ) {
                valueInCents
              }
              totalAmountReceived(
                net: true
                periodInMonths: 3
                includeChildren: true
              ) {
                valueInCents
              }
            }
            PAST_MONTH: stats {
              totalAmountSpent(
                net: true
                includeChildren: true
                periodInMonths: 1
              ) {
                valueInCents
              }
              totalAmountReceived(
                net: true
                periodInMonths: 1
                includeChildren: true
              ) {
                valueInCents
              }
            }
          }
        }
      }
      `;

      let host = { slug: slug };
      let offset = 0;
      if (context.sync.continuation) {
        offset = context.sync.continuation.offset as number;
      }

      const variables = { host, limit, offset};

      let response = await context.fetcher.fetch({
        method: "POST",
        url: "https://api.opencollective.com/graphql/v2",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      let res = await response.body.data.accounts;
      let rows = res.nodes;
      let total = res.totalCount as number
      let new_offset = res.offset as number;

      let continuation;
      if ((limit + new_offset) < total) {
        continuation = {
          offset: new_offset + limit,
        };
      }

      rows = rows.map((row) => {
        return {
          ...row,
          admins: row.ADMINS.nodes.map((node) => {
            return {
              role: node.role,
              name: node.account.name,
              slug: node.account.slug,
              email: node.account.emails? node.account.emails[0] : null,
            };
          }),
          balanceValueInCents: row.ALL.balance.valueInCents,
          balanceCurrency: row.ALL.balance.currency,
          totalFinancialContributors: row.ALL.totalFinancialContributors,
          totalAmountSpentValueInCents: row.ALL.totalAmountSpent.valueInCents,
          totalAmountReceivedValueInCents: row.ALL.totalAmountReceived.valueInCents,
          totalAmountSpentValueInCentsPast12Months: row.PAST_12_MONTHS.totalAmountSpent.valueInCents,
          totalAmountReceivedValueInCentsPast12Months: row.PAST_12_MONTHS.totalAmountReceived.valueInCents,
          totalAmountSpentValueInCentsPast9Months: row.PAST_9_MONTHS.totalAmountSpent.valueInCents,
          totalAmountReceivedValueInCentsPast9Months: row.PAST_9_MONTHS.totalAmountReceived.valueInCents,
          totalAmountSpentValueInCentsPast6Months: row.PAST_6_MONTHS.totalAmountSpent.valueInCents,
          totalAmountReceivedValueInCentsPast6Months: row.PAST_6_MONTHS.totalAmountReceived.valueInCents,
          totalAmountSpentValueInCentsPast3Months: row.PAST_3_MONTHS.totalAmountSpent.valueInCents,
          totalAmountReceivedValueInCentsPast3Months: row.PAST_3_MONTHS.totalAmountReceived.valueInCents,
          totalAmountSpentValueInCentsPastMonth: row.PAST_MONTH.totalAmountSpent.valueInCents,
          totalAmountReceivedValueInCentsPastMonth: row.PAST_MONTH.totalAmountReceived.valueInCents,
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
  name: "UpdatesFromHostedCollectives",
  description: "Lists all updates of collectives on the host.",
  identityName: "UpdateFromHostedCollective",
  schema: UpdateSchema,
  formula: {
    name: "SyncUpdatesFromHostedCollectives",
    description: "Syncs updates of collectives on the host.",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "host",
        description: "The slug of the host you want to retrieve updates from.",
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "limit",
        description: "The number of updates you want to retrieve per request.",
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "days",
        description: "The number of days you want to retrieve updates from.",
      }),
    ],
    execute: async function (args, context) {
      let updates_query = `
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
        let images = [];
        while ((match = regex.exec(html)) !== null) {
          images.push(match[1]);
        }
        return images;
      }

      let [host, limit, days] = args;

      let offset = 0;
      if (context.sync.continuation) {
        offset = context.sync.continuation.offset as number;
      }

      const variables = { host: { slug: host }, limit, offset };

      let response = await context.fetcher.fetch({
        method: "POST",
        url: "https://api.opencollective.com/graphql/v2",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: updates_query, variables }),
      });

      let res = await response.body.data.updates;
      let rows = [];
      let new_offset = res.offset as number;
      
      const dateFrom = new Date();
      dateFrom.setDate(dateFrom.getDate() - days);

      let done = false;
      for (const update of res.nodes) {
        if (new Date(update.createdAt) < dateFrom) {
          done = true;
          break;
        }

        let row = {
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
          accountSocialLinks: update.account.socialLinks.map((link) => {
            return {
              type: link.type,
              url: link.url,
            };
          }),
          fromAccountSocialLinks: update.fromAccount.socialLinks.map((link) => {
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