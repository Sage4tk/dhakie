import { z } from "zod";
import { IComponentBase } from "../components"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import {  LoaderCircle } from "lucide-react";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { useToast } from "../ui/use-toast";

interface ICreateDeckProps extends IComponentBase {
    open: boolean,
    setOpen: (arg:boolean) => void
}

const create_deck = z.object({
    title: z.string().min(1, {message: "Title needed."}).max(50, {message: "Title too long!"}),
    description: z.string().min(1, {message: "Description needed."}).max(255, {message: "Description is too long"})
});

const CreateDeck:React.FC<ICreateDeckProps> = ({
    open,
    setOpen,
    children
}) => {

    /** STATES **/
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useSelector((state:RootState) => state.user);

    /** HOOKS **/
    const { toast } = useToast();
    const form = useForm<z.infer<typeof create_deck>>({
        defaultValues: {
            title: "",
            description: ""
        },
        resolver: zodResolver(create_deck)
    });

    /** FUNCTIONS **/

    // submit deck to firestore after checking
    const submit_firestore = async (event:z.infer<typeof create_deck>):Promise<void> => {

        //block UI
        setLoading(true);

        try {

            // if somewhore user is not logged in then throw (an unauthenticated user cant see this screen)
            if (!user) throw null;

            await setDoc(doc(db, "decks", v4()), {
                title: event.title,
                description: event.description,
                createdAt: Timestamp.now(),
                userId: user.uid
            });
            
            toast({
                title: "Deck created!",
                description: `${event.title} has been created!`
            });
            
            setOpen(false);


        } catch (err) {

            toast({
                title: "Oops something went wrong!",
                description: "Please try again",
                variant: "destructive"
            })

        }

        // unblock UI AFTER
       setLoading(false);
    }

    // OVERRIDE OUTCLOSING of the dialouge box to prevent closing when loading is true
    const outside_click = (event:any):void => {
        event.preventDefault();

        // if loading then prevent closing
        if (loading) return;

        setOpen(false)
        // CLOSE THE DIALOUGE IF FALSE
        // setOpen(false)        

    }

    return (
        <Dialog open={open} onOpenChange={() => {if (loading) return; setOpen(!open)}}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent onInteractOutside={outside_click}>

                <DialogHeader>

                    <DialogTitle>Create Deck</DialogTitle>

                    <DialogDescription>Please enter deck name and description below.</DialogDescription>

                </DialogHeader>

                <Form {...form}>

                    <form className="space-y-4" onSubmit={form.handleSubmit(submit_firestore)}>

                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title:</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Enter title..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description:</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Enter description..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={loading} className="self-end">

                            {loading && <LoaderCircle className="animate-spin mr-2" />}
                            Create Deck
                        </Button>

                    </form>

                </Form>

            </DialogContent>

        </Dialog>        
    )
}

export default CreateDeck;