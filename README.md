# Team 26 Final Project

Developer Journal

## Development Process
1. During team meetings, decide what needs to be worked on and add to team board, then create issues for all of these following step 2
2. To initiate a feature, first open an issue according to one of several provided templates. If applicable, we make sure to assign the person working on that feature in the issue itself
3. Create a feature branch for this feature
4. Develop the feature and test locally
5. Push the feature and submit a pull request
5. GitHub actions will ensure that nothing goes wrong in terms of linting and testing
7. Have a manual review by at least one other person
8. Merge into staging
9. Have two other people manually review the staging branch to ensure no unexpected merge conflicts
10-. Merge into main
11. GitHub actions will build the documentation and website
12. Repeat for next issue

## Branching
There is the main branch which contains the production code. There is also a staging branch, where we ensure that recent merges do not do anything unexpected. Apart from that, all features or other additions to the project are done in short lived feature branches. 

Development branches are to be named in the form of:
- 'feature/feature-name'
- 'bug/bug-name'
- 'documentation/documentation-name'
- 'devops/devops-name'
- 'testing/testing-name' 

## Coding and Documentation Conventions
- CSS: use rem as much as possible instead of px
- Tab size: 4 spaces
- Lines less than 100 characters
- pascalCase
- Same line curly braces
- Every function is documented, summary for complex files and funcctions with additional comments for complex logic, present tense
- Include examples in comments for complex functions
- Code is as self-documented as possible
- Avoid hard-coded values, use variables for constants

## Testing
Cypress will be used for unit testing, component testing, and end to end testing. Make sure to use the appropriate tests for each stage of development.

## Commit Messages
Make sure to use our git commit message template when possible

```
# Title: Type of commit (issue adressed), Summary, imperative, start upper case, don't end with a period
# No more than 50 chars. #### 50 chars is here:  #

# Remember blank line between title and body.

# Body: Explain *what* and *why* (not *how*).
# Wrap at 72 chars. ################################## which is here:  #
```

## Additional Notes
1. Make sure to follow our cipipeline when possible. I.e. create an issue and feature for each task. Once finished **submit a pull request to the staging branch NOT main**.
2. Source files are present in the `src` directory.
3. Test files are present under `cypress/{e2e,component,unit}`
4. Use `npm run docs` for generating documentation (locally) and `npm test` for running tests (in headless mode)
5. Use `npm run lint` to run linter

