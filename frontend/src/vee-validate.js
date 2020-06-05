import {
  required, email, max, min, confirmed,
} from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('max', {
  ...max,
  message: 'This field must be {length} characters or less',
});

extend('min', {
  ...min,
  message: 'This field must have at least {length} characters',
});
extend('email', {
  ...email,
  message: 'This field must be a valid email',
});

extend('confirmed', {
  ...confirmed,
  message: 'The password must be same as confrim',
});
