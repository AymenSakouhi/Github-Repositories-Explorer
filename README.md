# GitoRepo (Github Repositories Explorer)

Well, besides the silly name of the app, let me explain what I did exactly via this section.

First of all, you may access it from here:
https://gentle-lebkuchen-8f9840.netlify.app/
I used mainly these packages in order to make things work:
GraphQl, React, Redux toolkit, Apollo/client, tailwind and more...

### Design:

![folders](https://i.imgur.com/4rKss0d.png)

### Explaining some parts of the code:

The app is made out of 4 main folders:
![folders](https://i.imgur.com/vSDMBZC.png)

1. Firstly, all the components are spread in the first folder by the name of `Components`.
2. Secondly, you may find the `Graphql` forlder where I sited a Schema for graphQl that I will be using to fetch data.
   Here is the example:

```javascript
export const graphqlQuery = gql`
  query ($username: String!, $number_of_users: Int!, $number_of_repos: Int!) {
    search(query: $username, type: USER, first: $number_of_users) {
      nodes {
        ... on User {
          name
          login
          avatarUrl
          bio
          location
          repositories(last: $number_of_repos) {
            nodes {
              name
              description
              stargazerCount
            }
          }
        }
      }
    }
  }
`;
```

The example above users 3 main variables that I will focus on for fetching data: `$username`, `$number_of_users` and `$number_of_repos`.
Obviously we need a client comprehensive state management library that communicates with Graphql so I used `@apollo/client`.

```javascript
import { ApolloClient, InMemoryCache } from "@apollo/client";
export const apolloClient = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});
```

Also to mention that you have to create your react_app_github_personal_access , in order to make the app work.
Please put it in an `.env` file and name it `REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN`.

3. Interfaces folder, where you will find some of the main Interfaces I use throught out the redux folder files.
   Here is a an example explanation about one of the interfaces:

| Parameter    | Type                                                                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `QueryModel` | an interface defining the properties of a search query, including the search term, number of users, and number of repositories to return. |

4. Redux Part:

```javascript
export const apiMiddleware: Middleware =
  ({ dispatch }: { dispatch: Dispatch }) =>
  (next: Function) =>
  async (action: ApiAction) => {
    if (action.type !== apiCallBeganUsers.type) return next(action);
    let {
      url,
      method,
      data: query,
      onStart,
      onSuccess,
      onError,
    } = action.payload!;
    console.log('query', query)
    if (onStart) dispatch({ type: onStart });
    try {
      const { loading, error, data } = await apolloClient.query({
        query: graphqlQuery,
        variables: { username: query ? query.search : "Brian", number_of_users: 5, number_of_repos: 5},
      });
      if (data) {
        dispatch({
          type: onSuccess,
          payload: data?.search.nodes || [],
        });
      }
    } catch (error: Error | any) {
      if (onError)
        dispatch({
          type: "users/getUsersFailure",
          payload: error.message,
        });
      dispatch({ type: "SHOW_ERROR", payload: { error: error.message } });
    }

    return next(action);
  };
```

Above is the middleware part, it queries using 3 variables. It also receive the data and dispatch the payload to the reducer. Another thing to mention,
I created the app this way so I can debugg it easily and here is a picture from the redux dev toolkit showing how messages are logged and tracked.
![folders](https://i.imgur.com/QJUjX3f.png)

I will stop here with explaining but you may actually take a look at the code for more in depth functionalities and I will be happy to receive your request via email [Aymen Sakouhi](mailto:@aymenmarketer@gmail.com) if you have any questions.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
