import { z } from "zod";
export declare const signupInputs: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signinInputs: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type SignupInputs = z.infer<typeof signupInputs>;
export type SigninInputs = z.infer<typeof signinInputs>;
//# sourceMappingURL=index.d.ts.map