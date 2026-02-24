// User & Authentication Types
export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  employeeId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  HR = 'HR',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

export interface AuthPayload {
  userId: string;
  email: string;
  role: UserRole;
  employeeId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface JWTPayload {
  sub: string;
  email: string;
  role: UserRole;
  employeeId?: string;
  iat?: number;
  exp?: number;
}

// Employee Types
export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: Gender;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
  designation: string;
  managerId?: string;
  dateOfJoining: Date;
  employmentType: EmploymentType;
  status: EmployeeStatus;
  salary: number;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERN = 'INTERN',
}

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  TERMINATED = 'TERMINATED',
  RESIGNED = 'RESIGNED',
}

export interface CreateEmployeeInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
  designation: string;
  managerId?: string;
  dateOfJoining: string;
  employmentType: EmploymentType;
  salary: number;
}

export interface UpdateEmployeeInput extends Partial<CreateEmployeeInput> {
  status?: EmployeeStatus;
}

// Attendance Types
export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  status: AttendanceStatus;
  workingHours?: number;
  overtimeHours?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  ON_TIME = 'ON_TIME',
  HALF_DAY = 'HALF_DAY',
  LEAVE = 'LEAVE',
}

export interface AttendanceRecord {
  id: string;
  employee: Employee;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  status: AttendanceStatus;
  workingHours?: number;
  overtimeHours?: number;
  notes?: string;
}

export interface MarkAttendanceInput {
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  notes?: string;
}

// Leave Types
export interface Leave {
  id: string;
  employeeId: string;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  approvedBy?: string;
  approvedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum LeaveType {
  SICK = 'SICK',
  CASUAL = 'CASUAL',
  ANNUAL = 'ANNUAL',
  MATERNITY = 'MATERNITY',
  PATERNITY = 'PATERNITY',
  BEREAVEMENT = 'BEREAVEMENT',
  UNPAID = 'UNPAID',
}

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export interface LeaveBalance {
  employeeId: string;
  leaveType: LeaveType;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
}

export interface LeaveRequestInput {
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  notes?: string;
}

// Salary Types
export interface Salary {
  id: string;
  employeeId: string;
  month: number;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  grossSalary: number;
  netSalary: number;
  status: SalaryStatus;
  paymentDate?: Date;
  paymentMethod?: PaymentMethod;
  bankName?: string;
  accountNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum SalaryStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH = 'CASH',
  CHECK = 'CHECK',
}

export interface SalarySlip {
  id: string;
  employee: Employee;
  salary: Salary;
  month: number;
  year: number;
  basicSalary: number;
  allowances: {
    hra: number;
    da: number;
    ta: number;
    other: number;
  };
  deductions: {
    pf: number;
    tax: number;
    insurance: number;
    other: number;
  };
  grossSalary: number;
  netSalary: number;
}

// Dashboard Types
export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  newEmployeesThisMonth: number;
  employeesOnLeave: number;
  totalDepartments: number;
  attendanceRate: number;
  pendingLeaveRequests: number;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  managerId?: string;
  employeeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecentActivity {
  id: string;
  type: ActivityType;
  description: string;
  userId: string;
  userName: string;
  createdAt: Date;
}

export enum ActivityType {
  EMPLOYEE_ADDED = 'EMPLOYEE_ADDED',
  EMPLOYEE_UPDATED = 'EMPLOYEE_UPDATED',
  LEAVE_APPROVED = 'LEAVE_APPROVED',
  LEAVE_REJECTED = 'LEAVE_REJECTED',
  ATTENDANCE_MARKED = 'ATTENDANCE_MARKED',
  SALARY_PROCESSED = 'SALARY_PROCESSED',
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

// Form Types
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Table Types
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, record: T) => React.ReactNode;
}

export interface TableSort {
  key: string;
  order: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: TableSort;
}
