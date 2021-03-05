import { AuthService } from './shared/services/auth.service';

export function onStart(authService: AuthService) {
  return () =>
    new Promise((resolve) => {
      if (authService.isAuth()) {
        return resolve(true);
      }

      return authService.auth()
        .toPromise()
        .then(resolve);
    });
}
