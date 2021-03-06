import passport, { AuthenticateOptions } from "passport";
import "@auth/strategies/local-strategy";
import "@auth/strategies/facebook-strategy";

export class StrategiesController {
  authenticateLocalLogin() {
    const options: AuthenticateOptions = {
      failWithError: true,
      session: false,
    };
    return passport.authenticate("login", options);
  }

  authenticateFacebookLogin() {
    return passport.authenticate("facebook", {
      scope: ["email", "public_profile"],
    });
  }

  authenticateFacebookLoginCallback() {
    return passport.authenticate("facebook", {
      failureRedirect: "/",
    });
  }
}
