# README

Github actions for the github of life  

TODO:

* Use cache to pass values between steps
  * refactor build to make deployment a separate job.
* Reuse parts of build in ci and main.
* working-directory
* env
    ```yaml
    on:
      schedule:
      - cron: "21 4 * * *"
    ```

## Resources

* Awesome Actions [here](https://github.com/sdras/awesome-actions
* Contexts [here](https://docs.github.com/en/actions/learn-github-actions/contexts)
* GitHub Actions — How To Share Data Between Jobs [here](https://levelup.gitconnected.com/github-actions-how-to-share-data-between-jobs-fc1547defc3e)
* https://github.com/actions/example-services/blob/main/.github/workflows/redis-service.yml)