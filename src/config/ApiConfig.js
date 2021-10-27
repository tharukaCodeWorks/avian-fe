const HOST = "https://avian-spring.herokuapp.com";

export default HOST;
export const LOGIN = `${HOST}/auth/sign-in`;
export const REGISTER = `${HOST}/auth/signup`;
export const VERIFY_EMAIL = `${HOST}/auth/email/verify`;
export const FORGOT_PASSWORD = `${HOST}/auth/password/forgot`;
export const PASSWORD_RESET_CODE_VERIFY = `${HOST}/auth/password/verify-code`;
export const RESET_PASSWORD = `${HOST}/auth/password/reset`;
export const RESEND_VERIFY_EMAIL = `${HOST}/user/resend-verification-email?email=`;

// Users
export const GET_USER_COUNT = `${HOST}/auth/user/count`

// Order Bills
export const GET_ALL_ORDERS = `${HOST}/order-bill`;
export const GET_ORDER_COUNT = `${HOST}/order-bill/count`

// Items
export const GET_ALL_ITEMS = `${HOST}/item`;
export const GET_ITEM_COUNT = `${HOST}/item/count`

// Reports
export const SALES_FETCH = `${HOST}/reports/sales/`