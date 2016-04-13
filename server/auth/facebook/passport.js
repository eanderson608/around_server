import passport from 'passport';
import strategy from 'passport-facebook-token';

export function setup(User, config) {
  passport.use(new strategy({
      clientID: 453958574808328,
      clientSecret: process.env.FACEBOOK_SECRET 
    }, 
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({facebookId: profile.id}, function (error, user) {
        return done(error, user);
      });
    }
  ));
}

