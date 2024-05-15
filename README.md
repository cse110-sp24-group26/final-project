# Team 26 Final Project

Developer Journal

## Conventions
- CSS: use rem as much as possible instead of px
- Tab size: 4 spaces
- Lines less than 100 characters
- pascalCase
- Same line curly braces
- Every function is documented, summary for complex files and funcctions with additional comments for complex logic, present tense
- Include examples in comments for complex functions
- Code is as self-documented as possible
- Avoid hard-coded values, use variables for constants

## Development Process
1. Make sure to use our git commit message template when possible

```
# Title: Type of commit (issue adressed), Summary, imperative, start upper case, don't end with a period
# No more than 50 chars. #### 50 chars is here:  #

# Remember blank line between title and body.

# Body: Explain *what* and *why* (not *how*).
# Wrap at 72 chars. ################################## which is here:  #
```

2. Make sure to follow our cipipeline when possible. I.e. create an issue and feature for each task. Once finished **submit a pull request to the staging branch NOT main**.
3. Source files are present in the `src` directory.
4. Test files are present under `cypress/{e2e,component,unit}`
5. Use `npm run docs` for generating documentation (locally) and `npm test` for running tests (in headless mode)
6. Use `npm run lint` to run linter

