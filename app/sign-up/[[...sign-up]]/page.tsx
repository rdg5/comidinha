import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return <SignUp afterSignUpUrl="/dashboard" redirectUrl="/dashboard"></SignUp>
}
export default SignUpPage
