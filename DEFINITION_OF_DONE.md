# Definition of Done

Issues may enter the _needs review_ stage once their implementation conforms to our definition of done:

* signed-off by you from _user perspective_
    * usable
    * discoverable (if feature)
    * fits with regards to existing functionality
* signed-off by you from _maintainer perspective_
    * simple solution
    * understandable
    * sufficiently and well tested
    * code is _clean_
    * satisfies our code standards
* signed-off by CI
    * continuous integration passes
* available as feature branch on GitHub
    * contains the cleaned up commit history
    * commit messages satisfy our [commit message guidelines](https://www.conventionalcommits.org)
    * a single commit closes the issue via `Closes #issuenr`