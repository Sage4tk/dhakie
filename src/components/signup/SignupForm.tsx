import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GOOGLE_PROVIDER, auth } from "@/lib/firebase";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import GoogleIcon from "@/assets/icons/google.svg";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

// FORM VALIDATOR
const signup_validation = z.object({
    email: z.string().min(1, { message: "Missing E-mail."}).email({message: "Must be an E-mail"}),
    password: z.string().min(8, { message: "Password must be 8 characters"}),
    confirm_password: z.string().min(1, {message: "Please confirm password"})
})
// refine to check if password contains the standard password rules
.superRefine(({
    password
}, ctx) => {
    const contains_uppercase = /[A-Z]/.test(password);
    const contains_lowercase = /[a-z]/.test(password);
    const contains_number = /\d/.test(password);
    const contains_specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!contains_uppercase || !contains_lowercase || !contains_number || !contains_specialChar) {
        ctx.addIssue({
            path: ["password"],
            message:"Password must include uppercase, lowercase, number, and special character",
            code: "custom"
        })
    }
})
// check if password matches
.superRefine(({password, confirm_password}, ctx) => {
    if (password !== confirm_password) {
        ctx.addIssue({
            code: "custom",
            path: ["confirm_password"],
            message: "Password does not match."
        })
    }
})

const SignupForm:React.FC = () => {

    /** STATE **/
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<{
        title: string,
        description: string
    } | null>(null);

    /** HOOKS **/
    const form = useForm<z.infer<typeof signup_validation>>({
        defaultValues: {
            email: "",
            password: "",
            confirm_password: ""
        },
        resolver: zodResolver(signup_validation)
    });

    // register in firebase authentication with email and password
    const register_email = async (event: z.infer<typeof signup_validation>):Promise<void> => {
        // block ui to prevent funny business
        setLoading(true);

        try {
            await createUserWithEmailAndPassword(auth, event.email, event.password);
        } catch (err) {

            console.log(err)
            if (err instanceof FirebaseError) {
                setErrorMessage({
                    title:"ERROR",
                    description: err.code
                })
            }
        }

        // after everything unblock the UI, will only be needed again if the user fails as it will redirect...
        setLoading(false);
    }

     // singin with google
    const google_auth = async ():Promise<void> => {

        // turn off ui to prevent bugs 
        setLoading(true);

        // clear error message if it exists
        if (errorMessage) setErrorMessage(null);

        try {

            // CALL THE GOOGLE AUTH PROVIDER TO open a window
            await signInWithPopup(auth, GOOGLE_PROVIDER);
        } catch (err) {

            // DISPLAY ON SCREEN THE ERROR
            if (err instanceof FirebaseError) {
                setErrorMessage({
                    title:"ERROR",
                    description: err.code
                })
            }
        }

        setLoading(false);
    }


    return (
        <Card className="w-full md:w-[360px]">
            <CardHeader>
                <CardTitle className="font-bold tracking-tight">Sign Up</CardTitle>
            </CardHeader>
            <CardContent>

                <Form {...form}>

                    {errorMessage && (
                        <Alert variant="destructive" className="mb-2">
                            <ExclamationTriangleIcon />
                            <AlertTitle>{errorMessage.title}</AlertTitle>
                            <AlertDescription>
                                {errorMessage.description}
                            </AlertDescription>
                        </Alert>
                    )}

                    <form className="space-y-8" onSubmit={form.handleSubmit(register_email)} >

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter email" {...field} disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter password" {...field} disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Confirm Password" {...field} disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-full" disabled={loading}>SIGN UP</Button>

                    </form>

                </Form>

                <div className="flex flex-row items-center space-x-4 my-4">
                    <Separator className="flex-grow w-1" />
                    <p className="text-sm">OR</p>
                    <Separator className="flex-grow w-1" />
                </div>

                <div className="mb-4">
                    <Button disabled={loading} onClick={google_auth} className="w-full flex items-center" variant="outline">
                        <img src={GoogleIcon} className="h-auto w-4" />
                        <span className="flex-grow">Signup with Google</span>
                    </Button>
                </div>

                <div className="text-sm text-center">
                    <span>Already have an account?  </span>
                    <Link className="underline font-semibold" to="/">Login here</Link>
                </div>

            </CardContent> 
        </Card>
    )
}

export default SignupForm;