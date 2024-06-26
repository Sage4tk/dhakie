import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GOOGLE_PROVIDER, auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Separator } from "../ui/separator";
import GoogleIcon from "@/assets/icons/google.svg";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


const login_form = z.object({
    email: z.string().min(1, { message: "Missing E-mail."}).email({message: "Must be an E-mail"}),
    password: z.string().min(1, { message: "Missing password."})
})

const LoginForm:React.FC = () => {

    /** STATES **/
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<{
        title: string,
        description: string
    } | null>(null);

    // form resolver
    const form_checker = useForm<z.infer<typeof login_form>>({
        resolver: zodResolver(login_form),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // login with firebase email and password
    const login = async (event: z.infer<typeof login_form>):Promise<void> => {
        // clear error messag if any
        if (errorMessage) setErrorMessage(null);

        // set loading to true to cover login button
        setLoading(true);

        try {
            // call login function built in with firebase
            await signInWithEmailAndPassword(auth,event.email, event.password);
        } catch (err) {

            
            if (err instanceof FirebaseError) {
                setErrorMessage({
                    title:"ERROR",
                    description: err.code
                })
            }
            
        }

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
                <CardTitle className="font-bold tracking-tight">Sign In</CardTitle>
            </CardHeader> 
            <CardContent>

                {errorMessage && (
                    <Alert variant="destructive" className="mb-2">
                        <ExclamationTriangleIcon />
                        <AlertTitle>{errorMessage.title}</AlertTitle>
                        <AlertDescription>
                            {errorMessage.description}
                        </AlertDescription>
                    </Alert>
                )}

                <Form {...form_checker}>
                    <form className="space-y-8" onSubmit={form_checker.handleSubmit(login)}>

                        <FormField
                            control={form_checker.control}
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
                            control={form_checker.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter email" type="password" {...field} disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <Button className="w-full" disabled={loading}>
                            LOGIN
                        </Button>

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
                        <span className="flex-grow">Signin with Google</span>
                    </Button>
                </div>

                <div className="text-sm text-center">
                    <span>Are you new?  </span>
                    <Link className="underline font-semibold" to="/signup">Sign Up</Link>
                </div>

            </CardContent>
        </Card>
    )
}

export default LoginForm;