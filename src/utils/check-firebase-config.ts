// Utility to check Firebase configuration for phone auth
export function checkFirebasePhoneAuthConfig(auth: any) {
  const config = auth.app.options
  const issues: string[] = []

  // Check auth domain
  if (!config.authDomain) {
    issues.push("authDomain is not configured")
  } else if (!config.authDomain.includes('.firebaseapp.com') && !config.authDomain.includes('localhost')) {
    issues.push(`authDomain '${config.authDomain}' might not be valid`)
  }

  // Check project ID
  if (!config.projectId) {
    issues.push("projectId is not configured")
  }

  // Check API key
  if (!config.apiKey) {
    issues.push("apiKey is not configured")
  }

  // Get current domain
  const currentDomain = window.location.hostname
  const currentProtocol = window.location.protocol

  console.log("[Firebase Phone Auth Check]:")
  console.log("- Auth Domain:", config.authDomain)
  console.log("- Project ID:", config.projectId)
  console.log("- Current Domain:", currentDomain)
  console.log("- Current Protocol:", currentProtocol)
  
  if (issues.length > 0) {
    console.error("[Firebase Phone Auth Check] Configuration issues found:")
    issues.forEach(issue => console.error(`  - ${issue}`))
  }

  // Additional checks for phone auth
  if (currentProtocol !== 'https:' && currentDomain !== 'localhost' && currentDomain !== '127.0.0.1') {
    console.warn("[Firebase Phone Auth Check] Phone auth requires HTTPS (except for localhost)")
  }

  return issues
}