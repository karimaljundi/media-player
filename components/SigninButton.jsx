import { signOut } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';


function SigninButton() {
    
        const { data: session } = useSession()
        if (session){
            return (
                <button onClick={() => signOut()}>Sign out</button>
    
            );
        }else{
            return(
            <button onClick={() => signIn()}>Sign in</button>
            );
        }
    
}
export default SigninButton;