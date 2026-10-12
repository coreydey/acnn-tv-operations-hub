import { z } from "zod";

export const employeeSchema = z.object({
  staffNumber: z.string().min(2).max(30),
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email(),
  phone: z.string().max(40).optional().nullable(),
  jobTitle: z.string().min(1).max(100),
  departmentId: z.string().min(1),
  employmentDate: z.string().datetime().optional().nullable()
});

export const assetSchema = z.object({
  assetCode: z.string().min(2).max(40),
  name: z.string().min(1).max(120),
  category: z.string().min(1).max(80),
  serialNumber: z.string().max(120).optional().nullable(),
  location: z.string().max(120).optional().nullable(),
  condition: z.string().max(80).default("Good")
});

export const scheduleSchema = z.object({
  title: z.string().min(1).max(160),
  channel: z.string().min(1).max(80),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  itemType: z.string().min(1).max(60),
  producer: z.string().max(120).optional().nullable(),
  operator: z.string().max(120).optional().nullable()
}).refine((v) => new Date(v.endAt) > new Date(v.startAt), {
  message: "End time must be after start time",
  path: ["endAt"]
});

export const officeRequestSchema = z.object({
  requestNumber: z.string().min(2).max(40),
  requesterName: z.string().min(1).max(120),
  department: z.string().min(1).max(100),
  requestType: z.string().min(1).max(80),
  title: z.string().min(1).max(160),
  description: z.string().min(1).max(4000),
  amount: z.number().nonnegative().optional()
});

export const financeEntrySchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1).max(80),
  description: z.string().min(1).max(240),
  amount: z.number().positive(),
  transactionAt: z.string().datetime(),
  createdBy: z.string().min(1).max(120),
  department: z.string().max(100).optional().nullable(),
  reference: z.string().max(120).optional().nullable()
});

export const newsRequestSchema = z.object({
  requestNumber: z.string().min(2).max(40),
  requesterName: z.string().min(1).max(120),
  organisation: z.string().max(160).optional().nullable(),
  phone: z.string().max(40).optional().nullable(),
  email: z.string().email().optional().nullable().or(z.literal("")),
  eventTitle: z.string().min(1).max(200),
  eventDate: z.string().datetime(),
  location: z.string().min(1).max(240),
  storyAngle: z.string().max(2000).optional().nullable(),
  requestedService: z.string().min(1).max(100)
});
