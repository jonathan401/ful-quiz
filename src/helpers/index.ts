export const firebaseAuthErrorMap: { [key: string]: string } = {
  "auth/email-already-exists": "Email already in use",
  "auth/invalid-password":
    "password must be a string with at least six characters",
  "auth/too-many-requests": "Too many requests",
  "auth/user-not-found": "User not found",
  "auth/invalid-credential": "Invalid credentials",
};
