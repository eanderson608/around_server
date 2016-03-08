import passport from 'passport';
import {Strategy as FacebookTokenStrategy} from 'passport-facebook-token';

export function setup(User, config) {
  passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneAsync({
      'facebook.id': profile.id
    })
      .then(user => {
        if (user) {
          return done(null, user);
        }

        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user',
          provider: 'facebook',
          facebook: profile._json
        });
        user.saveAsync()
          .then(user => done(null, user))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
}
