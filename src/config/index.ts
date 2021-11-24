
type Config = {
  endpoint: string;
};

if (process.env.REACT_APP_API_URL == null) {
    throw new Error(
      "You must set the environmental variable REACT_APP_API_URL in the form http://url.com/graphql"
    );
  }

const url: string = process.env.REACT_APP_API_URL;


const setup : Config = {
    endpoint: `${url}`
  };

export default setup;