import { GraphQLClient } from "graphql-request";
import Helpers from "./helpers";

const client = new GraphQLClient(Helpers.getAPIEndpoint());

export default client;
