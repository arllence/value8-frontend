
export class ValidationErrorMessages {
    static validationMessages =
    {
        'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'minlength', message: 'Invalid email' },
                { type: 'maxlength', message: 'Invalid email' },
            ],
        'password': [
            { type: 'required', message: 'Password is required.' },
            { type: 'minlength', message: 'Password minimum length is 4 characters' },
            { type: 'maxlength', message: 'Invalid Username' },
        ],
        'otpcode': [
            { type: 'required', message: 'Enter a valid OTP Code' },
            { type: 'minlength', message: 'Invalid OTP Code' },
            { type: 'maxlength', message: 'Invalid OTP Code' },
        ],
 };
}
