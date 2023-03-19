//an interface defining the properties of a search query, including the search term, number of users, and number of repositories to return.
export interface QueryModel {
  search: string;
  numberOfUsers: number;
  numberOfRepos: number;
}


export interface ApiActionPayloadUsers {
  url?: string;
  method?: "get" | "post";
  data?: QueryModel;
  onStart?: string;
  onSuccess?: string;
  onError?: string;
}

//an interface defining the properties of an API action, including the action type and the payload.
export interface ApiAction {
  type: string;
  payload?: ApiActionPayloadUsers;
}

//an interface defining the properties of a main block component, which displays a list of user data.
export interface  MainBlockProps {
  users: UserModel[];
}

//an interface defining the properties of an accordion component, which displays repository data for a particular user.
export interface AccordionProps {
  repository: {
    name: string;
    description: string;
    stargazerCount: number;
  };
}

//an interface defining the properties of a user, including their name, login, avatar URL, bio, location, and repositories (which is an object containing an array of repository objects, each with a name, description, and stargazer count).
export interface UserModel {
  name: string;
  login: string;
  avatarUrl: string;
  bio: string;
  location: string;
  __typename: string;
  repositories: {
    nodes: [
      {
        name: string;
        description: string;
        stargazerCount: number;
      }
    ];
  };
}

//an interface defining the properties of a state object containing user data, including the array of users, a boolean indicating whether data is currently being loaded, and an optional error message.
export interface UsersState {
  users: UserModel[];
  loading: boolean;
  error: string | null;
}