import {
  CredentialsAndIdentityIdProvider,
  CredentialsAndIdentityId,
  GetCredentialsOptions
} from 'aws-amplify/auth';

// Note: The custom provider class must implement CredentialsAndIdentityIdProvider
class CustomCredentialsProvider implements CredentialsAndIdentityIdProvider {

  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  private readonly sessionToken?: string;
  private readonly expiration?: Date;

  constructor(accessKeyId: string, secretAccessKey: string, sessionToken?: string, expiration?: Date) {
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.sessionToken = sessionToken;
    this.expiration = expiration;
  }

  // Example class member that holds the login information
  federatedLogin?: {
    domain: string;
    token: string;
  };

  // Custom method to load the federated login information
  loadFederatedLogin(login?: typeof this.federatedLogin) {
    // You may also persist this by caching if needed
    this.federatedLogin = login;
  }

  async getCredentialsAndIdentityId(
    getCredentialsOptions: GetCredentialsOptions
  ): Promise<CredentialsAndIdentityId | undefined> {
    try {

      // You can add in some validation to check if the token is available before proceeding
      // You can also refresh the token if it's expired before proceeding
      const credentials: CredentialsAndIdentityId = {
        credentials: {
          accessKeyId: this.accessKeyId, 
          secretAccessKey: this.secretAccessKey, 
          sessionToken: this.sessionToken, 
          expiration: this.expiration,
        },
        // identityId: getIdResult.IdentityId,
      };
      return credentials;
    } catch (e) {
      console.log('Error getting credentials: ', e);
    }
  }
  // Implement this to clear any cached credentials and identityId. This can be called when signing out of the federation service.
  clearCredentialsAndIdentityId(): void { }
}


export default CustomCredentialsProvider