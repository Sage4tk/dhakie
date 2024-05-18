import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Separator } from "../ui/separator";
// import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleIcon from "@/assets/icons/google.svg";
import { Link } from "react-router-dom";


const login_form = z.object({
    email: z.string().min(1, { message: "Missing E-mail."}).email({message: "Must be an E-mail"}),
    password: z.string().min(1, { message: "Missing password."})
})

const LoginForm:React.FC = () => {

    /** STATES **/
    const [loading, setLoading] = useState<boolean>(false);

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
        // set loading to true to cover login button
        setLoading(true);

        try {
            // call login function built in with firebase
            await signInWithEmailAndPassword(auth,event.email, event.password);
        } catch (err) {
            if (err instanceof FirebaseError) {

            }
            
        }

        setLoading(false);
    }

    return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle className="font-bold tracking-tight">Sign In</CardTitle>
            </CardHeader> 
            <CardContent>

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
                    <Button className="w-full flex items-center" variant="outline">
                        <img src={GoogleIcon} className="h-auto w-4" />
                        <span className="flex-grow">Signin with Google</span>
                    </Button>
                </div>

                <div className="text-sm text-center">
                    <span>Are you new?  </span>
                    <Link className="underline font-semibold" to="Sign Up">Sign Up</Link>
                </div>

            </CardContent>
        </Card>
    )
}

export default LoginForm;