import { checkAdminExists } from "../actions"
import { LoginForm } from "./login-form"

export default async function LoginPage() {
  const adminExists = await checkAdminExists()
  
  return <LoginForm isSetup={!adminExists} />
}
