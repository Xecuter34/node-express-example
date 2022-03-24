# Node Express Example - Azure DevOps (Work Items)

## Overview

This is just a very simple service that utilizes AZure DevOps, specifically their Work Items to get and update items that are listed on there.

You can find docs for the API at the `/doc` route.

## How to run

### Intial Steps

You will need to set up some environment variables for it to run successfully, you can find examples below of what you need to run:

```
DATABASE_URL="postgresql://postgres:example@localhost:5432/express_example?schema=public"
AZURE_TOKEN=[AZURE_PERSONAL_ACCESS_TOKEN]
AZURE_ORGANISATION=[AZURE_ORGANISATION_NAME]
AZURE_PROJECT=[AZURE_PROJECT_NAME]
AZURE_API_VERSION=[DESIRED_AZURE_VERSION]
```

I would reccomend using version `7.0` for Azure, this is currently the latest version.

### Running the Project

- Clone repository to your local machine
- Run `yarn install` or `npm install` to add packages
- Run the project with `yarn start` or `npm start`
- The API will be running at `localhost:8080`
