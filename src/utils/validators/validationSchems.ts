import { z } from 'zod';
import valid from 'card-validator';
import {
  LOGO_CONTEST,
  NAME_CONTEST,
  NOTIFY_OPTIONS,
  TAGLINE_CONTEST,
} from 'constants/general';

export const IndustrySchema = z.enum([
  'Biotech',
  'Builders',
  'Consulting Firm',
  'Creative Agency',
  'Education',
  'Footwear',
  'Medical',
  'Publisher',
  'Skin care',
]);

export const StyleNameSchema = z.enum([
  'Any',
  'Classic',
  'Descriptive',
  'Fun',
  'Professional',
  'Youthful',
]);

export const TypeOfNameSchema = z.enum(['Company', 'Product', 'Project']);

export const BrandStyleSchema = z.enum([
  'Brick & Mortar',
  'Fancy',
  'Fun',
  'Minimal',
  'Photo-based',
  'Techy',
]);

export const TypeOfTaglineSchema = z.enum([
  'Any',
  'Classic',
  'Descriptive',
  'Fun',
  'Modern',
  'Powerful',
]);

export const NameContestTypeSchema = z.enum([NAME_CONTEST]);
export const LogoContestTypeSchema = z.enum([LOGO_CONTEST]);
export const TaglineContestTypeSchema = z.enum([TAGLINE_CONTEST]);

export const ContestContestTypeSchema = z.enum([
  LOGO_CONTEST,
  NAME_CONTEST,
  TAGLINE_CONTEST,
]);

export const StringSchema = z
  .string()
  .superRefine((value, { addIssue, path }) => {
    if (!value || !value.trim().length) {
      addIssue({
        code: 'custom',
        message: `${path} is a required field`,
      });
    }
  });
globalThis.FileList ??= Object as any;
export const NotifySchema = z.enum(NOTIFY_OPTIONS);
export const FileSchema = z.instanceof(FileList);
export const OrderBySchema = z.enum(['asc', 'desc']);

export const NewEventSchema = z.object({
  date: z
    .string()
    .datetime()
    .superRefine((value, { addIssue, path }) => {
      if (Date.now() - Date.parse(value) <= 5 * 60 * 1000) {
        addIssue({
          code: 'custom',
          message: `Event ${path} cannot be in the past`,
        });
      }
    }),
  name: z.string().min(6),
  notify: NotifySchema,
});

export const CatalogSchema = z.object({
  catalogName: StringSchema,
});

export const MessageSchema = z.object({
  message: StringSchema,
});

export const UpdateUserSchema = z.object({
  displayName: StringSchema,
  file: z.union([FileSchema, z.null()]).optional(),
  firstName: StringSchema,
  lastName: StringSchema,
});

export const PaymentSchema = z.object({
  cvc: z.string().superRefine((value, { addIssue, path }) => {
    if (!valid.cvv(value).isValid) {
      addIssue({
        code: 'custom',
        message: `Credit Card ${path} is invalid`,
      });
    }
  }),
  expiry: z.string().superRefine((value, { addIssue, path }) => {
    if (!valid.expirationDate(value).isValid) {
      addIssue({
        code: 'custom',
        message: `Credit Card ${path} is invalid`,
      });
    }
  }),
  name: StringSchema,
  number: z.string().superRefine((value, { addIssue, path }) => {
    if (!valid.number(value).isValid) {
      addIssue({
        code: 'custom',
        message: `Credit Card ${path} is invalid`,
      });
    }
  }),
});

export const CashoutSchema = z.intersection(
  PaymentSchema,
  z.object({ sum: z.number().min(5) }),
);

export const TextOfferSchema = z.object({
  offerData: StringSchema,
});

export const LogoOfferSchema = z.object({
  offerData: FileSchema,
});

export const FilterSchema = z.object({
  awardSort: z.union([z.null(), OrderBySchema]).optional(),
  contestId: z.union([z.null(), z.string()]).optional(),
  industry: z.union([z.null(), z.string()]).optional(),
  typeIndex: z.union([z.number().int().min(0).max(7), z.null()]).optional(),
});

export const BaseContestSchema = z.object({
  contestType: StringSchema,
  file: z.union([FileSchema, z.null()]).optional(),
  focusOfWork: StringSchema,
  industry: StringSchema,
  targetCustomer: StringSchema,
  title: StringSchema,
});

export const TaglineContestSchema = z.intersection(
  BaseContestSchema,
  z.object({
    contestType: TaglineContestTypeSchema,
    typeOfTagline: TypeOfTaglineSchema,
    nameVenture: z.string().min(3),
  }),
);

export const LogoContestSchema = z.intersection(
  BaseContestSchema,
  z.object({
    contestType: LogoContestTypeSchema,
    brandStyle: BrandStyleSchema,
    nameVenture: z.string().min(3),
  }),
);

export const NameContestSchema = z.intersection(
  BaseContestSchema,
  z.object({
    contestType: NameContestTypeSchema,
    styleName: StyleNameSchema,
    typeOfName: TypeOfNameSchema,
  }),
);

export const ContestSchema = z.union([
  TaglineContestSchema,
  LogoContestSchema,
  NameContestSchema,
]);

export const RegistrationSchema = z
  .object({
    agreeOfTerms: z.literal(true, {
      required_error: 'Must Accept Terms and Conditions',
      invalid_type_error: 'Must Accept Terms and Conditions',
    }),
    confirmPassword: z.string().min(6),
    displayName: StringSchema,
    email: z.string().email(),
    firstName: StringSchema,
    lastName: StringSchema,
    password: z.string().min(6),
    role: z.enum(['customer', 'creator']),
  })
  .superRefine(({ confirmPassword, password }, { addIssue }) => {
    if (confirmPassword !== password) {
      addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Confirmation password must match password',
      });
    }
  });

export const UsernameSchema = z.object({
  displayName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().min(6).email(),
  password: z.string().min(6),
});

export type Industry = z.infer<typeof IndustrySchema>;
export type StyleName = z.infer<typeof StyleNameSchema>;
export type TypeOfName = z.infer<typeof TypeOfNameSchema>;
export type BrandStyle = z.infer<typeof BrandStyleSchema>;
export type NameContestContestType = z.infer<typeof NameContestTypeSchema>;
export type LogoContestContestType = z.infer<typeof LogoContestTypeSchema>;
export type TaglineContestContestType = z.infer<
  typeof TaglineContestTypeSchema
>;
export type OrderBy = z.infer<typeof OrderBySchema>;
export type TypeOfTagline = z.infer<typeof TypeOfTaglineSchema>;
export type ContestContestType = z.infer<typeof ContestContestTypeSchema>;
export type Notify = z.infer<typeof NotifySchema>;
export type NewEvent = z.infer<typeof NewEventSchema>;
export type Catalog = z.infer<typeof CatalogSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type Cashout = z.infer<typeof CashoutSchema>;
export type Payment = z.infer<typeof PaymentSchema>;
export type TextOffer = z.infer<typeof TextOfferSchema>;
export type LogoOffer = z.infer<typeof LogoOfferSchema>;
export type Filter = z.infer<typeof FilterSchema>;
export type Contest = z.infer<typeof ContestSchema>;
export type TaglineContest = z.infer<typeof TaglineContestSchema>;
export type LogoContest = z.infer<typeof LogoContestSchema>;
export type NameContest = z.infer<typeof NameContestSchema>;
export type BaseContest = z.infer<typeof BaseContestSchema>;
export type Registration = z.infer<typeof RegistrationSchema>;
export type Username = z.infer<typeof UsernameSchema>;
export type Login = z.infer<typeof LoginSchema>;
