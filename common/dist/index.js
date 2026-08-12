import { z } from "zod";
export const signupInputs = z.object({
    email: z.email(),
    password: z.string().min(8).max(20)
});
export const signinInputs = z.object({
    email: z.email().trim(),
    password: z.string().min(8).max(20).trim()
});
//# sourceMappingURL=index.js.map