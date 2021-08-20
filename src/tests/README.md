# Testing scenarios

## while user is signed off

| request                          | description                                                                   | expected result                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `/`                              | open browser with root route                                                  | persisten auth dialog                                                                                  |
| `/protected`                     | open browser with protected route                                             | persisten auth dialog                                                                                  |
| `/public`                        | open browser with public route                                                | page render with no auth dialog                                                                        |
| `/public` -> `/` or `/protected` | open browser with public route and navigate to `/protected` or `/` root route | non persistent auth dialog pop up that can be closed, URL does not change - blocked for authentication |
| -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |

## while user is signed in with not confirmed email address

This scenario tests against required `verification=true` option.

| request                          | description                                                                   | expected result                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `/` or `/protected`              | open browser with any protected route                                         | auth dialog with email validation message                                                              |
| `/public`                        | open browser with public route                                                | page render with no auth dialog                                                                        |
| `/public` -> `/` or `/protected` | open browser with public route and navigate to `/protected` or `/` root route | non persistent auth dialog with email validation message                                               |
| -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |

## while user is signed in with not confirmed email address

This scenario tests against required `verification=["domain.com"]` option, which requires email validation for emails using `domain.com` domain only and no email validation for emails using other domains.

| request                          | description                                                                   | expected result                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `/` or `/protected`              | open browser with any protected route                                         | auth dialog with email validation message                                                              |
| `/public`                        | open browser with public route                                                | page render with no auth dialog                                                                        |
| `/public` -> `/` or `/protected` | open browser with public route and navigate to `/protected` or `/` root route | non persistent auth dialog with email validation message                                               |
| -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |

## while user is signed as anonymous

This scenario tests user authenticated as anonymous without email.

| request                          | description                                                                   | expected result                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `/` or `/protected`              | open browser with any protected route                                         | auth dialog with email validation message                                                              |
| `/public`                        | open browser with public route                                                | page render with no auth dialog                                                                        |
| `/public` -> `/` or `/protected` | open browser with public route and navigate to `/protected` or `/` root route | non persistent auth dialog with email validation message                                               |
| -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |

## forgot password

Test forgot password link if sends out the email and user is able to reset password.

## registration

Test if user is able to register.

## 3rd party authentication providers

- Gmail
- Facebook
- Phone
