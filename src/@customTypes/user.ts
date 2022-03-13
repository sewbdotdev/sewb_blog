export type User = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    bio?: string | null;
    twitterUrl: string | null;
    linkedinUrl: string | null;
  };
};
