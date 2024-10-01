import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return <SignIn signUpUrl="/sign-up" fallbackRedirectUrl="/dashboard" />
}
